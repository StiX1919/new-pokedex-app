import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'black',
      types: [],
      pages: [],
      page: [],
      index: 20,
      pokemon: []
    }
    this.changeColor = this.changeColor.bind(this)
    this.getPokemon = this.getPokemon.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)

    this.getSessionPokemon = this.getSessionPokemon.bind(this)
  }

  componentDidMount() {
    // axios.get("https://pokeapi.co/api/v2/type/").then( response => {
    //   let types = []
    //   response.data.results.map(type => types.push(type.name))
    //   this.setState({types})
    // })
    // this.getPokemon('https://pokeapi.co/api/v2/pokemon/?limit=60', [], 0)
    this.getSessionPokemon(0, [])
  }

  changeColor(color){
    this.setState({color})
  }

  getSessionPokemon(num, creatures){
    let offset = num
    axios.post(`http://localhost:3000/api/getPokemon/${offset}/`, {creatures}).then(response => {
      console.log('pokemon response', response)
      if(response.data.next !== null){
        offset += 60
        this.getSessionPokemon(offset, response.data.pokemon)
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
          console.log(pages)


        this.setState({ pokemon: response.data.pokemon, pages, page: pages[0], pageNum: 0 })
      }
    })
  }

  getPokemon(url, creatures, num){
    let pokemon = creatures
    let offset = num
    let next = ''
    axios.get(url+`&offset=${offset}`).then( response => {
      response.data.results.map(item => {
        pokemon.push(item)
      })
      next = response.data.next
      console.log(pokemon)
      if(next !== null) {
        offset += 60
        this.getPokemon('https://pokeapi.co/api/v2/pokemon/?limit=60', pokemon, offset)
      }
      let page = []

      pokemon.map(guy => {
        if(page.length < 20) 
          page.push(guy)
      })
      this.setState({pokemon, page})
    })
  }

  nextPage(){
    this.setState({pageNum: this.state.pageNum += 1 , page: this.state.pages[this.state.pageNum]})
  }
  previousPage(){
    this.setState({pageNum: this.state.pageNum -= 1 , page: this.state.pages[this.state.pageNum]})
  }

  render() {
    console.log(this.state.index)
    let style = {'backgroundColor': this.state.color}

    let typeList = this.state.types.length > 0 ? (
      
        this.state.types.map(type => {
          return <h3>{type}</h3>
        })
      
    ) : <h1>Loading...</h1>
  
    let pokelist = this.state.page.length > 0 ? (
      
        this.state.page.map(guy => {
          let pokestr = guy.url
          let pokenum = 0
          function getPokenum(str){
            let splitstr = str.split('/')
            pokenum = splitstr[6]
            console.log('stuff', guy.url, pokenum)
          }
          getPokenum(pokestr)
          
          return (
            
          <div>
            <img src={require(`./pokemon/${pokenum}.png`)}/>
            <h3>{guy.name}</h3>
          </div>
          )
        })
      
    ) : <h1>Loading...</h1>
    
    console.log(this.state.types)
    return (
      <div className="App">
        <header style={style} className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* {typeList} */}
        {pokelist}
        <button onClick={this.previousPage}>PREVIOUS</button>
        <button onClick={this.nextPage}>NEXT</button>
        
      </div>
    );
  }
}

export default App;
