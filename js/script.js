// Global variables
let offset = 0; // offset as a counter which can be increment
const maxPokemonID = 151; // limit for just the first 151 pokemons of gen1
const initialLimit = 16; // initialLimit for page load (only load 16 pokemons!)
const loadMoreLimit = 25; // to load 25 more pokemons on "load more" button
let allPokemons = []; // Array to store the complete dataset of 151 pokemons
let allRenderedPokemons = []; // Array to store the currently rendered pokemons

// Fetch All pokemon Data for Search
const fetchAllPokemonData = async () => {
  try {
    // Fetch the names and URLs of all gen 1 pokemons from the API
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${maxPokemonID}&offset=0`,
    );
    const { results } = await response.json();
    await fetchPokemonDetails(results);
  } catch (error) {
    console.error("Error fetching all pokemon data:", error);
  }
};

const fetchPokemonDetails = async (results) => {
  const pokemonDetails = [];
  // Fetch pokemon details
  for (const pokemon of results) {
    const details = await fetchPokemonDetailsByUrl(pokemon.url);
    pokemonDetails.push(details);
  }

  allPokemons = pokemonDetails;
};

const fetchPokemonDetailsByUrl = async (url) => {
  const response = await fetch(url);
  const details = await response.json();

  return {
    name: details.name,
    id: details.id,
    types: details.types.map((typeInfo) => typeInfo.type.name),
    picture: details.sprites.front_default,
    weight: details.weight / 10, // convert weight to kg
    height: details.height * 100, // height in cm
    abilities: details.abilities.map((abilityInfo) => abilityInfo.ability.name),
    stats: {
      hp: details.stats.find((stat) => stat.stat.name === "hp").base_stat,
      attack: details.stats.find((stat) => stat.stat.name === "attack")
        .base_stat,
      defense: details.stats.find((stat) => stat.stat.name === "defense")
        .base_stat,
    },
  };
};

// Fetch pokemon Data for rendering
const getPokemonData = async function (limit, offset) {
  try {
    // Show loading screen
    showLoadingScreen(true);
    if (offset >= maxPokemonID) {
      return;
    }

    const pokemonLimit = Math.min(limit, maxPokemonID - offset); // f.e. (100, 90 - 50) -> pokemonLimit = 40
    const response = await fetchPokemonData(pokemonLimit, offset);
    const pokemonDetails = await processPokemonData(response.results);
    //allRenderedPokemons = allRenderedPokemons.concat(pokemonDetails);
    allRenderedPokemons = [...allRenderedPokemons, ...pokemonDetails];
    renderPokemonCards(pokemonDetails, offset === 0);
  } catch (error) {
    console.error("Error fetching pokemon data:", error);
  }

  // Hide loading screen after fetch completes (also hide when error)
  showLoadingScreen(false);
};

const fetchPokemonData = async (pokemonLimit, offset) => {
  return await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pokemonLimit}&offset=${offset}`,
  ).then((res) => res.json());
};

const processPokemonData = async (results) => {
  const pokemonDetails = [];
  for (const pokemon of results) {
    const details = await fetchPokemonDetailsByUrl(pokemon.url);
    pokemonDetails.push(details);
  }
  return pokemonDetails;
};

// Show or hide the loading screen
const showLoadingScreen = (show) => {
  const loadingScreen = document.getElementById("loadingScreen");
  if (loadingScreen) {
    loadingScreen.style.display = show ? "flex" : "none";
  } else {
    // If the loading screen is not in the DOM, add it
    document.body.insertAdjacentHTML("beforeend", getLoadingScreen());
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.style.display = show ? "flex" : "none";
  }
};

// Render pokemon Cards
const renderPokemonCards = (pokemonDetails, clearContainer = false) => {
  const container = document.getElementById("content");

  if (clearContainer) {
    container.innerHTML = "";
  }

  let pokemonHTML = "";
  pokemonDetails.forEach((pokemon) => {
    // Generate HTML for each pokemon card
    pokemonHTML += getPokemonCard(pokemon);
  });

  container.innerHTML += pokemonHTML; // Add pokemon cards to container
  addCardEventListeners(); // Add click event listeners to cards
};

const addCardEventListeners = () => {
  const cards = document.querySelectorAll(".poke_card");
  cards.forEach((card) => {
    // Add click event to each card to show pokemon details
    card.addEventListener("click", () => {
      const pokemonId = getPokemonIdFromCard(card.id);
      showPokemonDetails(pokemonId);
    });
  });
};

const getPokemonIdFromCard = (cardId) => {
  // Get pokemon ID from card ID
  const pokemonIdStr = cardId.replace("pokemon-", "");
  const pokemonId = parseInt(pokemonIdStr, 10);
  return pokemonId;
};

// Handle Search (Search All pokemons)
const handleSearch = (event) => {
  // Get input value
  const searchInput = event.target.value.toLowerCase();
  // If input is less than 3 characters, show all rendered Pokémon
  if (searchInput.length < 3) {
    renderPokemonCards(allRenderedPokemons, true);
    return;
  }

  // Filter pokemons based on search input
  const filteredPokemon = allPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(searchInput),
  );
  // Render filtered pokemons
  renderPokemonCards(filteredPokemon, true);
};

// Show pokemon details in overlay
const showPokemonDetails = (pokemonId) => {
  // Find pokemon by ID
  const pokemon = allPokemons.find((poke) => poke.id === pokemonId);

  // Remove existing overlays before adding the new one
  const existingOverlay = document.getElementById("overlay");
  if (existingOverlay) {
    existingOverlay.remove();
  }

  const overlayHtml = getPokemonOverlay(pokemon, pokemonId);
  document.body.insertAdjacentHTML("beforeend", overlayHtml); // Add overlay to DOM
  document.body.style.overflow = "hidden"; // Disable scrolling

  // Set up event listeners for the NEW overlay
  setupOverlayEventListeners(pokemonId);
};

const setupOverlayEventListeners = (pokemonId) => {
  const overlay = document.getElementById("overlay");
  setupNextPreviousButtons(overlay, pokemonId); // Next/Previous buttons
  setupOverlayClickToClose(overlay); // Close overlay on click outside card
  setupTabSwitching(); // Add event listener for tabs
};

const setupTabSwitching = () => {
  // Tabs for pokemon details
  const aboutTab = document.getElementById("aboutTab");
  const baseStatsTab = document.getElementById("baseStatsTab");

  const aboutTabContent = document.getElementById("aboutTabContent");
  const baseStatsTabContent = document.getElementById("baseStatsTabContent");

  aboutTab.addEventListener("click", () => {
    // Switch to "About" tab
    switchTab(aboutTab, baseStatsTab, aboutTabContent, baseStatsTabContent);
  });

  baseStatsTab.addEventListener("click", () => {
    // Switch to "Base Stats" tab
    switchTab(baseStatsTab, aboutTab, baseStatsTabContent, aboutTabContent);
  });
};

const switchTab = (activeTab, inactiveTab, activeContent, inactiveContent) => {
  // Switch active/inactive tabs
  activeTab.classList.add("active");
  inactiveTab.classList.remove("active");
  activeContent.classList.add("active");
  inactiveContent.classList.remove("active");
};

const setupNextPreviousButtons = (overlay, pokemonId) => {
  const nextButton = overlay.querySelector("#nextPokemon");
  const prevButton = overlay.querySelector("#prevPokemon");

  nextButton.addEventListener("click", () => {
    // Show details for the next pokemon in overlay, and if it is on the last (151) , go to the first (1)
    const nextPokemonId = pokemonId >= maxPokemonID ? 1 : pokemonId + 1;
    showPokemonDetails(nextPokemonId);
  });

  // vice versa
  prevButton.addEventListener("click", () => {
    const prevPokemonId = pokemonId <= 1 ? maxPokemonID : pokemonId - 1;
    showPokemonDetails(prevPokemonId);
  });
};

const setupOverlayClickToClose = (overlay) => {
  // Close overlay when clicking outside of the card
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.remove();
      document.body.style.overflow = ""; //enable scrolling
    }
  });

  const overlayContent = document.getElementById("overlayContent");
  if (overlayContent) {
    overlayContent.addEventListener("click", (e) => {
      e.stopPropagation(); // Dont close the overlay when clicking inside content
    });
  }
};

// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", async () => {
  showLoadingScreen(true);

  await fetchAllPokemonData();
  getPokemonData(initialLimit, offset);
  offset = initialLimit;

  const loadMoreButton = document.getElementById("loadMore");
  loadMoreButton.addEventListener("click", () => {
    if (offset >= maxPokemonID) {
      loadMoreButton.disabled = true;
      loadMoreButton.textContent = "All pokemon Loaded!";
      return;
    }
    getPokemonData(loadMoreLimit, offset);
    offset += loadMoreLimit;

    if (offset > maxPokemonID) offset = maxPokemonID;
  });

  const searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("keyup", handleSearch);
});
