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
      page: [],
      index: 20
    }
    this.changeColor = this.changeColor.bind(this)
    this.getPokemon = this.getPokemon.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
  }

  componentDidMount() {
    // axios.get("https://pokeapi.co/api/v2/type/").then( response => {
    //   let types = []
    //   response.data.results.map(type => types.push(type.name))
    //   this.setState({types})
    // })
    this.getPokemon('https://pokeapi.co/api/v2/pokemon/', [])
  }

  changeColor(color){
    this.setState({color})
  }

  getPokemon(url, creatures){
    let pokemon = creatures
    let next = ''
    let previous = ''

    axios.get(url).then( response => {
      response.data.results.map(item => {
        pokemon.push(item.name)
      })
      next = response.data.next
      previous = response.data.previous
      console.log(pokemon, next, previous)
      if(next !== null) {
        this.getPokemon(next, pokemon)
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
    let newPage = []
    let currIndex = this.state.index
    if(currIndex === 0){
      currIndex += 20
    }
    this.state.pokemon.map((guy, index) => {
      if(index > currIndex){
        
        
          if(newPage.length < 20) 
            newPage.push(guy)
      }
    })
    let newIndex = currIndex + 20
    this.setState({page: newPage, index: newIndex})
  }
  previousPage(){
    let newPage = []
    let prevIndex = this.state.index - 20
    if (prevIndex >= 0) {
      this.state.pokemon.map((guy, index) => {
        if(index > prevIndex - 1){
          if(newPage.length < 20) 
            newPage.push(guy)
        }
      })
      let newIndex = prevIndex
      this.setState({page: newPage, index: newIndex})
    }
    else {alert('this is the begining')}
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
          return <h3>{guy}</h3>
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
        <button onClick={this.nextPage}>NEXT</button>
        <button onClick={this.previousPage}>PREVIOUS</button>
      </div>
    );
  }
}

export default App;
