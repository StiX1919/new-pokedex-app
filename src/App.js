import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'

import { connect } from 'react-redux'

import { getSessionPokemon, getPokemon2 } from './ducks/pokeReducer'

import Pokecard from './components/pokecard/pokecard'

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
      pokemon: [],
      filteredPokemon: []
    }
    this.changeColor = this.changeColor.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.choosePage = this.choosePage.bind(this)

    this.searchPokemon = this.searchPokemon.bind(this)
    this.sortByName = this.sortByName.bind(this)
    this.sortByNumber = this.sortByNumber.bind(this)
  }
 
  componentDidMount() {

    // this.props.getSessionPokemon([])
    this.props.getPokemon2(this.state.pokemon, 0).then(() => {
      if(this.props.next !== null){
        this.props.getPokemon2(this.props.gettingPokemon, this.props.newOffset)
      }
    })
  }

  changeColor(color){
    this.setState({color})
  }


  nextPage(){
    if(this.state.pages[this.state.pageNum + 1]){
      this.setState({pageNum: this.state.pageNum += 1 , page: this.state.pages[this.state.pageNum]})
    }
    
  }
  previousPage(){
    if(this.state.pages[this.state.pageNum - 1]){
      this.setState({pageNum: this.state.pageNum -= 1 , page: this.state.pages[this.state.pageNum]})
    }
  }
  choosePage(index){
    if(this.state.pages[index]){
      this.setState({pageNum: index , page: this.state.pages[index]})
    }
  }

  searchPokemon(e){
    let newList = this.state.pokemon.filter(guy => {
      return guy.name.includes(e.target.value)
    })
    if(newList){
      let newPages = []
      let newPage = []
      
      for(let i=0; i < newList.length; i++) {
        if(!newList[i + 1]) {
          newPage.push(newList[i])
          newPages.push(newPage)
        }
        else if(newPage.length < 20) {
          newPage.push(newList[i])
        }
        else if(newPage.length === 20){
          newPages.push(newPage)
          newPage = []
          newPage.push(newList[i])
        }
      }
      this.setState({ pages: newPages, page: newPages[0], pageNum: 0, filteredPokemon: newList })
    }
    
  }

  sortByName(){
    let sortedPokemon = this.state.filteredPokemon.sort((a, b) => {
      var nameA = a.name.toUpperCase(); 
      var nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      // names must be equal
      return 0
    })

    if(sortedPokemon){
      let newPages = []
      let newPage = []
      
      for(let i=0; i < sortedPokemon.length; i++) {
        if(!sortedPokemon[i + 1]) {
          newPage.push(sortedPokemon[i])
          newPages.push(newPage)
        }
        else if(newPage.length < 20) {
          newPage.push(sortedPokemon[i])
        }
        else if(newPage.length === 20){
          newPages.push(newPage)
          newPage = []
          newPage.push(sortedPokemon[i])
        }
      }
      this.setState({ pages: newPages, page: newPages[0], pageNum: 0, filteredPokemon: sortedPokemon })
    }
  }

  sortByNumber(){
    let sortedPokemon = this.state.filteredPokemon.sort((a, b) => {

      let arrA = a.url.split('/')
      let arrB = b.url.split('/')
      
      let numA = arrA[6]
      let numB = arrB[6]

      return numA - numB
    })

    if(sortedPokemon){
      let newPages = []
      let newPage = []
      
      for(let i=0; i < sortedPokemon.length; i++) {
        if(!sortedPokemon[i + 1]) {
          newPage.push(sortedPokemon[i])
          newPages.push(newPage)
        }
        else if(newPage.length < 20) {
          newPage.push(sortedPokemon[i])
        }
        else if(newPage.length === 20){
          newPages.push(newPage)
          newPage = []
          newPage.push(sortedPokemon[i])
        }
      }
      this.setState({ pages: newPages, page: newPages[0], pageNum: 0, filteredPokemon: sortedPokemon })
    }
  }

  render() {
    let style = {'backgroundColor': this.state.color}

    let typeList = this.props.types.length > 0 ? (
      
        this.props.types.map(type => {
          return <h3>{type}</h3>
        })
      
    ) : <h1>Loading...</h1>

    let pageLinks = this.props.pages.length > 0 ? (
      this.props.pages.map((page, index) => {
        return <button style={index === this.props.pageNum ? {backgroundColor: 'blue'} : {backgroundColor: 'red'}} onClick={() => this.choosePage(index)}>{index + 1}</button>
      })
    ) : <h3>Grabbin guys</h3>
  
    let pokelist = this.props.page.length > 0 ? (
      
        this.props.page.map(guy => {
          let pokestr = guy.url
          let pokenum = 0
          function getPokenum(str){
            let splitstr = str.split('/')
            pokenum = splitstr[6]
            if(pokenum > 10090) {
              pokenum = 0
            }
          }
          getPokenum(pokestr)
          return (
            <Pokecard pokenum={pokenum} name={guy.name}/>
          )
        })
      
    ) : <h1>Loading...</h1>
    
    return (
      <div className="App">
        <header style={style} className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* {typeList} */}
        <input onChange={e => this.searchPokemon(e)}></input>
        <div>
          <h3>Sort by:</h3>
          <h3 onClick={this.sortByName}>Name</h3>
          <h3 onClick={this.sortByNumber}>Number</h3>
        </div>
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

const mapStateToProps = state => state

export default connect(mapStateToProps, { getSessionPokemon, getPokemon2 })(App);
