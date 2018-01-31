

import React, { Component } from 'react';

import './pokecard.css'

class Pokecard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hovering: false
        }
        
        this.hovering = this.hovering.bind(this)
    }
    hovering(){
        this.setState({hovering: !this.state.hovering})
    }


    render(){

        return(
            <div className='pokeCard'>
                <div onMouseEnter={this.hovering} onMouseLeave={this.hovering}>
                    {this.state.hovering === false &&
                        <img src={require(`../../pokemon/${this.props.pokenum}.png`)}/>
                    }
                    {this.state.hovering === true && this.props.pokenum >= 650 &&
                        <img src={require(`../../pokemon/${this.props.pokenum}.png`)}/>
                    }
                    {this.state.hovering === true && this.props.pokenum < 650 &&
                        <img src={require(`../../pokemon/back/${this.props.pokenum}.png`)}/>
                    }
                </div>
                <h3>{this.props.name}</h3>
            </div>
        )
    }
}

export default Pokecard