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
    this.choosePage = this.choosePage.bind(this)

    this.getSessionPokemon = this.getSessionPokemon.bind(this)
  }
 
  componentDidMount() {

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
    if(this.state.pages[this.state.pageNum + 1]){
      this.setState({pageNum: this.state.pageNum += 1 , page: this.state.pages[this.state.pageNum]})
      console.log(this.state.pages[this.state.pageNum + 1], this.state.pageNum + 1)
    }
    
  }
  previousPage(){
    if(this.state.pages[this.state.pageNum - 1]){
      this.setState({pageNum: this.state.pageNum -= 1 , page: this.state.pages[this.state.pageNum]})
      console.log(this.state.pages[this.state.pageNum - 1], this.state.pageNum -1)
    }
  }
  choosePage(index){
    if(this.state.pages[index]){
      this.setState({pageNum: index , page: this.state.pages[index]})
      console.log(index, 'chose page')
    }
  }

  render() {
    console.log(this.state.index)
    let style = {'backgroundColor': this.state.color}

    let typeList = this.state.types.length > 0 ? (
      
        this.state.types.map(type => {
          return <h3>{type}</h3>
        })
      
    ) : <h1>Loading...</h1>

    let pageLinks = this.state.pages.length > 0 ? (
      this.state.pages.map((page, index) => {
        return <button style={index === this.state.pageNum ? {backgroundColor: 'blue'} : {backgroundColor: 'red'}} onClick={() => this.choosePage(index)}>{index + 1}</button>
      })
    ) : <h3>Grabbin guys</h3>
  
    let pokelist = this.state.page.length > 0 ? (
      
        this.state.page.map(guy => {
          let pokestr = guy.url
          let pokenum = 0
          function getPokenum(str){
            let splitstr = str.split('/')
            pokenum = splitstr[6]
            if(pokenum > 10090) {
              pokenum = 0
            }
            console.log('stuff', guy.url, pokenum)
          }
          getPokenum(pokestr)
          
          return (
            
          <div className='pokeCard'>
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
        <div className='pokemonDisplay'>
          {pokelist}
        </div>
        <button onClick={this.previousPage}>PREVIOUS</button>
        <button onClick={this.nextPage}>NEXT</button>
        <div>{pageLinks}</div>
      </div>
    );
  }
}

export default App;
