import axios from 'axios';

const initialState = {
    types: [],
    pages: [],
    page: [],
    index: 20,
    pokemon: [],
    filteredPokemon: []
};
// give me some new projects

const GET_ALL_POKEMON = 'GET_ALL_POKEMON';

const GETTING_GUYS = 'GETTING_GUYS'

export function getSessionPokemon(creatures){
    axios.post(`/api/getPokemon/`, {creatures}).then( response => {
        console.log(response)
        if(response){
            return {
                type: GET_ALL_POKEMON,
                payload: response
            }
        }
        
    })

    // let pokeData = {}
    // function getGuys(number, otherGuys){
    //     let offset = num
    //     axios.post(`http://localhost:3000/api/getPokemon/${offset}/`, {creatures}).then(response => {
    //       if(response.data.next !== null){
    //         offset += 60
    //         this.getguys(offset, response.data.pokemon)
    //       } else { 
    //           let pages = []
    //           let page = []
              
    //           for(let i=0; i < response.data.pokemon.length; i++) {
    //             if(!response.data.pokemon[i + 1]) {
    //               page.push(response.data.pokemon[i])
    //               pages.push(page)
    //             }
    //             else if(page.length < 20) {
    //               page.push(response.data.pokemon[i])
    //             }
    //             else if(page.length === 20){
    //               pages.push(page)
    //               page = []
    //               page.push(response.data.pokemon[i])
    //             }
    //           }
    //           console.log(response.data)
    //         pokeData = { pokemon: response.data.pokemon, pages: pages , page: pages[0], pageNum: 0, filteredPokemon: response.data.pokemon}
    //         return pokeData
    //       }
    //     })
    // }
    // getGuys(num, creatures)
    // console.log(pokeData)
    // return {
    //     
    // }
}

export function getPokemon2(guys, num) {
    let pokemon = guys
    let offset = num

    axios.post(`/api/getPokemon2/${offset}`, pokemon).then( response => {
        return {
            type: GETTING_GUYS,
            payload: response.data
        }
        
    })

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
    case GETTING_GUYS + 'PENDING':
      return Object.assign({}, state, {
          isLoading: true
      })
    case GETTING_GUYS + 'FULFILLED':
      return Object.assign({}, state, {
          gettingPokemon: action.payload.pokemon,
          next: action.payload.next,
            newOffset: action.payload.newOffset,
            isLoading: false
      })
    
    default:
      return state;
  }
}