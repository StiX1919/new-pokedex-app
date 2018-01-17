import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'black',
      types: []
    }
    this.changeColor = this.changeColor.bind(this)
  }

  componentDidMount() {
    axios.get("https://pokeapi.co/api/v2/type/").then( response => {
      let types = []
      response.data.results.map(type => types.push(type.name))
      this.setState({types})
    })
  }

  changeColor(color){
    this.setState({color})
  }
  render() {

    let style = {'backgroundColor': this.state.color}
    let typeList = this.state.types.length > 0 ? (
      
        this.state.types.map(type => {
          return <h3>{type}</h3>
        })
      
    ) : <h1>Loading...</h1>
    console.log(this.state.types)
    return (
      <div className="App">
        <header style={style} className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {typeList}
      </div>
    );
  }
}

export default App;
