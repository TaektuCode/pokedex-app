// SCRIPT //

// Fetch Pokemon Data
const getPokemonData = async function (limit) {
  try {
    let response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`,
    );
    const { results } = await response.json();
    console.log(results);

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

      // Push the Pokemon details to the array
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
  let pokemonHTML = "";

  // forEach to loop through each Pokémon and add it to the HTML
  pokemonDetails.forEach((pokemon) => {
    pokemonHTML += getPokemonCard(pokemon);
  });

  container.innerHTML = pokemonHTML;
};

// Wait for the DOM content to load and then fetch the data
document.addEventListener("DOMContentLoaded", () => {
  getPokemonData(16); // Call this only after the DOM is loaded
});
