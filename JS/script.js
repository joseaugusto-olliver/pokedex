
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonImageBalao = document.querySelector('.pokemon__image_balao');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

const pokemonNameinfo = document.querySelector('.pokemon__status_name');
const pokemonNumberinfo = document.querySelector('.pokemon__status_number');
const types = document.querySelector('.pokemon__status_types');
const hability = document.querySelector('.pokemon__status_hability');

let searchPokemon = 0;

const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (apiResponse.status == 200) {
        const data = await apiResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '00';

    const data = await fetchPokemon(pokemon);    

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        pokemonImageBalao.src = data['sprites']['versions']['generation-vi']['omegaruby-alphasapphire']['front_default'];

        pokemonNameinfo.innerHTML = data.name;
        pokemonNumberinfo.innerHTML = data.id;
        types.innerHTML = data['types']['0']['type']['name'];
        hability.innerHTML = data['abilities']['1']['ability']['name'];

        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonNumber.innerHTML = '00';
        pokemonName.innerHTML = 'Not Found :(';
        pokemonImage.src = 'https://imagensemoldes.com.br/wp-content/uploads/2020/04/Equipe-Rocket-com-Fundo-Transparente.png';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    renderPokemon(input.value.toLowerCase());
    
});

buttonPrev.addEventListener('click', (event) => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    if (searchPokemon < 151) {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }
});

pokemonImage.src = 'https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif';
pokemonImageBalao.src = 'https://3.bp.blogspot.com/-bNbqH1Ll5BY/XD97Ife_ioI/AAAAAAAA9Mk/ipwUBBWtGgoEUNu7m7AaYGyvw1DxBR97QCLcBGAs/s1600/Fundo%2Btransparente%2B1900x1900.png';
