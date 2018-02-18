import axios from 'axios';

const initialState = {
    types: [],
    pages: [],
    page: [],
    index: 20,
    pokemon: [],
    filteredPokemon: []
};
//still coding
const GET_ALL_POKEMON = 'GET_ALL_POKEMON';

export function getSessionPokemon(num, creatures){
    let pokeData = {}
    function getGuys(number, otherGuys){
        let offset = num
        axios.post(`http://localhost:3000/api/getPokemon/${offset}/`, {creatures}).then(response => {
          if(response.data.next !== null){
            offset += 60
            this.getguys(offset, response.data.pokemon)
          } else { 
              let pages = []
              let page = []
              
              for(let i=0; i < response.data.pokemon.length; i++) {
                if(!response.data.pokemon[i + 1]) {
                  page.push(response.data.pokemon[i])
                  pages.push(page)
                }
                else if(page.length < 20) {
                  page.push(response.data.pokemon[i])
                }
                else if(page.length === 20){
                  pages.push(page)
                  page = []
                  page.push(response.data.pokemon[i])
                }
              }
              console.log(response.data)
            pokeData = { pokemon: response.data.pokemon, pages: pages , page: pages[0], pageNum: 0, filteredPokemon: response.data.pokemon}
            return pokeData
          }
        })
    }
    getGuys(num, creatures)
    console.log(pokeData)
    return {
        type: GET_ALL_POKEMON,
        payload: pokeData
    }
  }


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMON:
      return Object.assign({}, state, {
        pokemon: action.payload.pokemon,
        pages: action.payload.pages,
        page: action.payload.page,
        pageNum: action.payload.pageNum,
        filteredPokemon: action.payload.pageNum
      });
    
    default:
      return state;
  }
}