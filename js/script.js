// SCRIPT //

// Global variables
let offset = 0; // offset as a counter which can be increment
const initialLimit = 16; // initialLimit for page load (only load 16 pokemons!)
const loadMoreLimit = 25; // to load 25 more pokemons on "load more" button
let allRenderedPokemons = []; // Array to store the rendered pokemons for filtering (search bar)

// Fetch Pokemon Data
const getPokemonData = async function (limit, offset) {
  try {
    let response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    );
    const { results } = await response.json();
    // console.log(results);

    // Array to store the details of each Pokemon
    const pokemonDetails = [];

    // Fetch details for each pokemon
    for (const pokemon of results) {
      const detailsResponse = await fetch(pokemon.url);
      const details = await detailsResponse.json();

      // Create an object with the needed information (name, id, types and picture)
      const pokemonWithInfos = {
        name: details.name,
        id: details.id,
        types: details.types.map((typeInfo) => typeInfo.type.name),
        picture: details.sprites.front_default,
      };

      // Push the pokemonWithInfos-object to the pokemonDetails array
      pokemonDetails.push(pokemonWithInfos);
      //   console.log(pokemonWithInfos);
    }

    // Update the global array with all rendered pokemon, merge two arrays into one
    // allRenderedPokemons = allRenderedPokemons.concat(pokemonDetails);
    allRenderedPokemons = [...allRenderedPokemons, ...pokemonDetails];

    // Render the pokemon cards
    renderPokemonCards(pokemonDetails, offset === 0); // Clear container only if its the first render (page Load)
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
};

// Render Pokemon Cards
const renderPokemonCards = (pokemonDetails, clearContainer = false) => {
  const container = document.getElementById("content");

  // Clear existing content if NEEDED
  if (clearContainer) {
    container.innerHTML = "";
  }

  // Add new pokemons cards to the container
  let pokemonHTML = "";
  pokemonDetails.forEach((pokemon) => {
    pokemonHTML += getPokemonCard(pokemon);
  });

  container.innerHTML += pokemonHTML;
};

// Handle Search
const handleSearch = (event) => {
  const searchTerm = event.target.value.toLowerCase(); // Get the search input and set it to lower case
  const filteredPokemon = allRenderedPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(searchTerm),
  ); // Filter pokemon by name
  renderPokemonCards(filteredPokemon, true); // Clear container and rerender ONLY filtered pokemons
};

// Wait for the DOM content to load and then fetch the data
document.addEventListener("DOMContentLoaded", () => {
  getPokemonData(initialLimit, offset); // Call this only after the DOM is loaded, fetch the first 16 pokemons
  offset = initialLimit; // Set offset to 16 after page load

  // Event listener for "Load More" button to fetch the next 25 pokemons
  const loadMoreButton = document.getElementById("loadMore");
  loadMoreButton.addEventListener("click", () => {
    getPokemonData(loadMoreLimit, offset); // Fetch the next 25 of pokemons
    offset += loadMoreLimit; // Increment the offset by 25
  });

  // Event listener for the search bar
  const searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("keyup", handleSearch); // Filter pokemon on keyup
});
