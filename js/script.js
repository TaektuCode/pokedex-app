// SCRIPT //

// Global variables
let offset = 0; // offset as a counter which can be increment
const initialLimit = 16; // initialLimit for page load (only load 16 pokemons!)
const loadMoreLimit = 25; // to load 25 more pokemons on "load more" button

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

    // Render the Pokemon cards when the data are fetched
    renderPokemonCards(pokemonDetails);
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
};

// Render Pokemon Cards
const renderPokemonCards = (pokemonDetails) => {
  const container = document.getElementById("content"); // Corrected here
  let pokemonHTML = container.innerHTML;

  // forEach to loop through each Pokémon and add it to the HTML
  pokemonDetails.forEach((pokemon) => {
    pokemonHTML += getPokemonCard(pokemon);
  });

  container.innerHTML = pokemonHTML;
};

// Wait for the DOM content to load and then fetch the data
document.addEventListener("DOMContentLoaded", () => {
  getPokemonData(initialLimit, offset); // Call this only after the DOM is loaded, fetch the first 16 pokemons

  // Event listener for "Load More" button to fetch the next 25 pokemons
  const loadMoreButton = document.getElementById("loadMore");
  loadMoreButton.addEventListener("click", () => {
    offset += loadMoreLimit; // Increment the offset by 25
    getPokemonData(loadMoreLimit, offset); // Fetch the next 25 of pokemons
  });
});
