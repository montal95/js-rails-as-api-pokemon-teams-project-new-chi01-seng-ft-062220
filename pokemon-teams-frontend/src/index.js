const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

const main = () => {
  getTrainers();
};

const getTrainers = async () => {
  const res = await fetch(TRAINERS_URL);
  const trainers = await res.json();
  renderAllTrainers(trainers);
};

const renderAllTrainers = (trainers) => {
  const main = document.querySelector("main");
  trainers.forEach((trainer) => {
    main.innerHTML += `
        <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
        <button class="catch" data-trainer-id="${
          trainer.id
        }">Add Pokemon</button>
        <ul id='trainer-list-${trainer.id}'>
            ${renderTrainersPokemon(trainer.pokemon)}
        </ul>
        </div>
    `;
  });
  handleClicks(main);
};

const renderTrainersPokemon = (pokemons) => {
  let listHTML = "";
  pokemons.forEach((pokemon) => {
    listHTML += `
        <li id='pokemon-${pokemon.id}'>
            ${pokemon.nickname} (${pokemon.species}) 
            <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
        </li>
    `;
  });
  return listHTML;
};

const handleClicks = (div) => {
  div.addEventListener("click", (event) => {
    const target = event.target;
    if (target.className === "catch") {
      checkPokemonLimit(target.dataset.trainerId);
    } else if (target.className === "release") {
      releasePokemon(target.dataset.pokemonId);
    }
  });
};

const checkPokemonLimit = (id) => {
  const pokemonList = document.querySelector(`#trainer-list-${id}`);
  pokemonList.childElementCount < 6
    ? catchPokemon(id, pokemonList)
    : console.log("You can't add anymore");
};

const catchPokemon = async (trainerId, container) => {
  const res = await fetch(`${TRAINERS_URL}/${trainerId}/new-pokemon`, {
    method: "POST",
  });
  const new_pokemon = await res.json();
  container.innerHTML += `
    <li id='pokemon-${new_pokemon.id}'>
        ${new_pokemon.nickname} (${new_pokemon.species}) 
        <button class="release" data-pokemon-id="${new_pokemon.id}">Release</button>
    </li>
    `;
  console.log(new_pokemon);
};

const releasePokemon = async (id) => {
  const res = await fetch(`${POKEMONS_URL}/${id}`, { method: "DELETE" });
  const output = await res.json();
  const li = document.getElementById(`pokemon-${id}`);
  if (output.status === 200) {
    li.remove();
  }
};

main();
