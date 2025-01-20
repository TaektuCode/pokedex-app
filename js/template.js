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
      <h3 class="poke_card--name">${pokemon.name}</h3>
      <img class="poke_card--img" src="${pokemon.picture}" alt="${
    pokemon.name
  }" />
      <p class="poke_card--id">#${pokemon.id}</p>
      <div class="poke_card--types-section">
      <div class="poke_card--types-box">${getPokemonTypeIcons(
        pokemon.types,
      )}</div>
      </div>
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
      <div id="overlayContent" class="overlay_content ${backgroundClass}">
        <div class="overlay_content--header">
        <h2 class="overlay_content--heading">${pokemon.name}</h2>
        <p class="overlay_content--id">#${pokemon.id}</p>
        </div>
        <img class="overlay_content--img" src="${pokemon.picture}" alt="${
    pokemon.name
  }">

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
        <div class="btn_box">
        <button id="prevPokemon" class="btn_change" >
        <img src="./assets/img/circle-left.svg" alt="button arrow left">
        </button>
        <button id="nextPokemon" class="btn_change">
        <img src="./assets/img/circle-right.svg" alt="button arrow right">
        </button>
        </div>
      </div>
    </div>
  `;
};

const getPokemonTypeIcons = (types) => {
  const typeIcons = {
    fire: "./assets/type_icons/fire.svg",
    water: "./assets/type_icons/water.svg",
    grass: "./assets/type_icons/grass.svg",
    electric: "./assets/type_icons/electric.svg",
    psychic: "./assets/type_icons/psychic.svg",
    ice: "./assets/type_icons/ice.svg",
    dragon: "./assets/type_icons/dragon.svg",
    dark: "./assets/type_icons/dark.svg",
    fairy: "./assets/type_icons/fairy.svg",
    normal: "./assets/type_icons/normal.svg",
    bug: "./assets/type_icons/bug.svg",
    ghost: "./assets/type_icons/ghost.svg",
    fighting: "./assets/type_icons/fighting.svg",
    poison: "./assets/type_icons/poison.svg",
    rock: "./assets/type_icons/rock.svg",
    ground: "./assets/type_icons/ground.svg",
    steel: "./assets/type_icons/steel.svg",
    flying: "./assets/type_icons/flying.svg",
  };

  // Generate HTML for icons
  return types
    .map(
      (type) =>
        `<img src="${typeIcons[type]}" alt="${type}" class="poke_card--type-icon" />`,
    )
    .join("");
};

// Add loading screen HTML to the template
const getLoadingScreen = () => {
  return `
    <div id="loadingScreen" class="loading-screen">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
  `;
};
