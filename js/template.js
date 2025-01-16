// Template

const getPokemonCard = (pokemon) => {
  const typeClasses = {
    fire: "fire-bg",
    water: "water-bg",
    grass: "grass-bg",
    electric: "electric-bg",
    psychic: "psychic-bg",
    ice: "ice-bg",
    dragon: "dragon-bg",
    dark: "dark-bg",
    fairy: "fairy-bg",
    normal: "normal-bg",
    bug: "bug-bg",
    ghost: "ghost-bg",
    fighting: "fighting-bg",
    poison: "poison-bg",
    rock: "rock-bg",
    ground: "ground-bg",
    steel: "steel-bg",
    flying: "flying-bg",
  };

  // Get the first type for background color
  const backgroundClass = typeClasses[pokemon.types[0]];

  return `
    <div class="poke_card ${backgroundClass}" id="pokemon-${pokemon.id}">
      <img src="${pokemon.picture}" alt="${pokemon.name}" />
      <h3>${pokemon.name}</h3>
      <p>ID: ${pokemon.id}</p>
      <p>Types: ${pokemon.types.join(", ")}</p>
    </div>
  `;
};

const getPokemonOverlay = (pokemon, pokemonId) => {
  // Define type-to-class mapping (CSS class names for types)
  const typeClasses = {
    fire: "fire-bg",
    water: "water-bg",
    grass: "grass-bg",
    electric: "electric-bg",
    psychic: "psychic-bg",
    ice: "ice-bg",
    dragon: "dragon-bg",
    dark: "dark-bg",
    fairy: "fairy-bg",
    normal: "normal-bg",
    bug: "bug-bg",
    ghost: "ghost-bg",
    fighting: "fighting-bg",
    poison: "poison-bg",
    rock: "rock-bg",
    ground: "ground-bg",
    steel: "steel-bg",
    flying: "flying-bg",
  };

  // Get the first type for background color
  const backgroundClass = typeClasses[pokemon.types[0]];

  return `
    <div id="overlay" class="overlay">
      <div id="overlay-content" class="overlay-content ${backgroundClass}">
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.picture}" alt="${pokemon.name}">
        <p>ID: ${pokemon.id}</p>
        <p>Types: ${pokemon.types.join(", ")}</p>

        <!-- Tabs -->
        <div class="tabs">
          <button class="tab-button active" id="aboutTab">About</button>
          <button class="tab-button" id="baseStatsTab">Base Stats</button>
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
          <div id="aboutTabContent" class="tab-pane active">
            <p><strong>Weight:</strong> ${pokemon.weight} kg</p>
            <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
            <p><strong>Abilities:</strong> ${pokemon.abilities.join(", ")}</p>
          </div>
          <div id="baseStatsTabContent" class="tab-pane">
            <p><strong>HP:</strong> ${pokemon.stats.hp}</p>
            <p><strong>Attack:</strong> ${pokemon.stats.attack}</p>
            <p><strong>Defense:</strong> ${pokemon.stats.defense}</p>
          </div>
        </div>

        <button id="prevPokemon">Previous</button>
        <button id="nextPokemon">Next</button>
        <button id="closeOverlay">Close</button>
      </div>
    </div>
  `;
};
