const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector(".btn-search");
const pokeContainer = document.querySelector(".poke-container");

const pokeCount = 151;

const initPokemon = async () => {
  for (let i = 1; i <= pokeCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let res = await fetch(url);
  let data = await res.json();
  createPokemonData(data);
};

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#d6b3ff",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
  ice: "#e0f5ff ",
};

const createPokemonData = (poke) => {
  //   console.log(poke.types[0].type.name);
  const { name, base_experience, height, id, weight } = poke;
  const color = colors[poke.types[0].type.name];
  pokeContainer.innerHTML += `
        <div class="poke-box" style="background-color:${color};">
          <img
            src= https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png 
            alt=""
          />
          <h4 class="poke-name">${name[0].toUpperCase() + name.slice(1)}</h4>
          <p >Base Experience: ${base_experience}</p>
          <p >Height: ${height * 10}cm </p>
          <p >Weight: ${weight / 10}kg</p>
          <p >Type: ${poke.types.map(
            (x) => x.type.name[0].toUpperCase() + x.type.name.slice(1) + ""
          )}</p>
          

        </div>
  `;
};
initPokemon();

searchInput.addEventListener("input", () => {
  //   console.log(searchInput.value);
  const pokeNames = document.querySelectorAll(".poke-name");
  const search = searchInput.value.toLowerCase();

  pokeNames.forEach((e) => {
    console.log(e.innerText);
    e.parentElement.style.display = "block";

    if (!e.innerText.toLowerCase().includes(search)) {
      e.parentElement.style.display = "none";
    }
  });
});
