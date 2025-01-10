// Template

let getPokemonCard = (pokemon) => {
  return `
      <div class="poke_card">
        <img src="${pokemon.picture}" alt="${pokemon.name}" />
        <h3>${pokemon.name}</h3>
        <p>ID: ${pokemon.id}</p>
        <p>Types: ${pokemon.types.join(", ")}</p>
      </div>
    `;
};
