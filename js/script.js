// SCRIPT //

// Global variables
let offset = 0; // offset as a counter which can be increment
const maxPokemonID = 151; // limit for just the first 151 pokemons of gen1
const initialLimit = 16; // initialLimit for page load (only load 16 pokemons!)
const loadMoreLimit = 25; // to load 25 more pokemons on "load more" button
let allPokemons = []; // Array to store the complete dataset of 151 pokemons
let allRenderedPokemons = []; // Array to store the currently rendered pokemons

// Fetch All Pokémon Data for Search
const fetchAllPokemonData = async () => {
  try {
    let response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${maxPokemonID}&offset=0`,
    );
    const { results } = await response.json();

    const pokemonDetails = [];

    // Fetch details for each pokemon
    for (const pokemon of results) {
      const detailsResponse = await fetch(pokemon.url);
      const details = await detailsResponse.json();

      const pokemonWithInfos = {
        name: details.name,
        id: details.id,
        types: details.types.map((typeInfo) => typeInfo.type.name),
        picture: details.sprites.front_default,
      };

      pokemonDetails.push(pokemonWithInfos);
    }

    allPokemons = pokemonDetails; // Store all pokemon data for searching
    console.log("All pokemon data fetched for search:", allPokemons);
  } catch (error) {
    console.error("Error fetching all pokemon data:", error);
  }
};

// Fetch pokemon Data for Rendering
const getPokemonData = async function (limit, offset) {
  try {
    if (offset >= maxPokemonID) {
      console.log("No more pokemon to fetch.");
      return;
    }

    const pokemonLimit = Math.min(limit, maxPokemonID - offset);

    let response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${pokemonLimit}&offset=${offset}`,
    );
    const { results } = await response.json();

    const pokemonDetails = [];

    for (const pokemon of results) {
      const detailsResponse = await fetch(pokemon.url);
      const details = await detailsResponse.json();

      const pokemonWithInfos = {
        name: details.name,
        id: details.id,
        types: details.types.map((typeInfo) => typeInfo.type.name),
        picture: details.sprites.front_default,
      };

      pokemonDetails.push(pokemonWithInfos);
    }

    allRenderedPokemons = [...allRenderedPokemons, ...pokemonDetails];
    console.log("Rendered pokemon:", allRenderedPokemons);

    renderPokemonCards(pokemonDetails, offset === 0);
  } catch (error) {
    console.error("Error fetching pokemon data:", error);
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
    pokemonHTML += getPokemonCard(pokemon);
  });

  container.innerHTML += pokemonHTML;
};

// Handle Search (Search All pokemon)
const handleSearch = (event) => {
  const searchInput = event.target.value.toLowerCase();

  // Check if input has fewer than 3 characters
  if (searchInput.length < 3) {
    // Re-render currently displayed pokemon if search is too short
    renderPokemonCards(allRenderedPokemons, true);
    return;
  }

  const filteredPokemon = allPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(searchInput),
  );
  console.log("Search Results:", filteredPokemon);

  renderPokemonCards(filteredPokemon, true); // Clear container and render search results
};

// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", async () => {
  await fetchAllPokemonData(); // Fetch all 151 pokemon for searching
  getPokemonData(initialLimit, offset); // Fetch the first 16 pokemon for rendering
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
