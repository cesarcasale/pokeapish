let main$$ = document.querySelector('main')
console.log(main$$);


const getPokemons = async () => {
    let allPokemons =[];
    for (let i = 1; i <= 150; i++){
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + i )
    const res = await response.json();
    allPokemons.push(res)
}
//console.log(allPokemons)
return allPokemons;

};

const getPokemon = async (i = 1) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}` )
    const res = await response.json();
    console.log(res)
    return res
};

const mapCharacters = (charactersWithMappe) => {
    return charactersWithMappe.map((character) => ({
    nombre: character.name,
    id: character.id,
    foto: character.sprites.front_default,
    type: character.types[0].type.name,
    }));
};

const drawCharacters = (mappedCharacters) => {
    main$$.innerHTML=""
  for (const character of mappedCharacters) {
    const characterDiv$$ = document.createElement("div");
    characterDiv$$.className = 'pokedex'
    characterDiv$$.innerHTML = `
        <h2 class="ache2">${character.nombre}</h2>
        <img class = "pokeImg ${character.type}" src="${character.foto}" alt="${character.nombre}">
        <div class="idType">
        <p class = "typePoke">Type:  ${character.type}</p>
        <h3>id#${character.id}</h3>
        </div>
    `;
    main$$.appendChild(characterDiv$$);
  }
};

const drawpokemon = (mappedCharacters) => {
    main$$.innerHTML=""
        const characterDiv$$ = document.createElement("div");
        characterDiv$$.className = 'pokedex'
        characterDiv$$.innerHTML = `
            <h2 class="ache2">${mappedCharacters.name}</h2>
            <img class = "pokeImg ${mappedCharacters.type}" src="${mappedCharacters.sprites.front_default}" alt="${mappedCharacters.name}">
            <div class="idType">
            <p class = "typePoke">Type:  ${mappedCharacters.types[0].type.name}</p>
            <h3>id#${mappedCharacters.id}</h3>
            </div>
        `;
        main$$.appendChild(characterDiv$$);

}

const drawInput = (mappedCharacters) => {
    // console.log(mappedCharacters);
    const input$$ = document.querySelector("input")
    // console.log(input$$);
    input$$.addEventListener("input", ()=> searchCharacters(input$$.value,mappedCharacters))
    };
    
const searchCharacters = (filtro, characters)=> {
        // console.log(filtro);
        // console.log(characters);
        let filteredCharacters = characters.filter((character)=>character.nombre.toLowerCase().includes(filtro.toLowerCase()))
        //  console.log(filteredCharacters);
        drawCharacters(filteredCharacters)
        };
    const pokemath = ()=> {
        return Math.floor(Math.random() * 150);
    }
    const pokecall = () => {
        const pokeball$$ = document.querySelector('.pokeball');
        pokeball$$.addEventListener('click', async()=>{
        const pokemonCatched = await getPokemon(pokemath())
        drawpokemon(pokemonCatched)
        })
    }
        const init = async () => {
            const characters = await getPokemons();
            const mappedCharacters = mapCharacters(characters);
            drawCharacters(mappedCharacters);
            drawInput(mappedCharacters)
            pokecall()
        
};
    init();
