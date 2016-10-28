import React,{ Component } from 'react';
import {searchPokemonById} from './PokemonView';


export default class IngresarNombre extends Component{
	constructor(props) {
		super(props);
		this.state= {
			"pokemonABuscar": "pikachu"
		};
		this.actualizarPokemonABuscar = this.actualizarPokemonABuscar.bind(this);
		this.onBuscar = this.onBuscar.bind(this);
		this.onBuscarAlAzar = this.onBuscarAlAzar.bind(this);
	}

	componentWillMount() {
        const {pokemonABuscar} = this.state;
        const {onBuscar} = this;


        // onBuscar(pokemonABuscar);
    }


    actualizarPokemonABuscar(event){
    const {value} = event.target;
    const {pokemonABuscar} = this.state;
    	this.setState(
    		{pokemonABuscar: value.toLowerCase()}
    	);
    }   

	onBuscar(){
      let {pokemonABuscar} = this.state;
      this.props.handleStateCargando(true);
      searchPokemonById(pokemonABuscar)
      .then( (pokemonData) => {
        if(pokemonData[0].detail != "Not found." ){
          //pokemons.push(pokemonData);
        this.props.handleStatePokemons(pokemonData)
      }else{
        console.log("No se encontro el pokemon");
      }
      this.props.handleStateCargando(false);
      });
    }

    onBuscarAlAzar(props){
      let {pokemons,cargando} = this.state;
      let random = Math.floor(Math.random() * (720+0.9999999) + 1);
      this.props.handleStateCargando(true);
      searchPokemonById(random)
      .then( (pokemonData) => {
        if(pokemonData[0].detail != "Not found." ){
          //pokemons.push(pokemonData);
        this.props.handleStatePokemons(pokemonData);
      	}else{
       	 	console.log("No se encontro el pokemon");
     	}
     	this.props.handleStateCargando(false);
      });
    }



	render(){
		const{pokemonABuscar} = this.state;
		const {onBuscar, onBuscarAlAzar, actualizarPokemonABuscar} = this;
		console.log("esta renderaizanodo");
		return (
			<div className="divInputId">
				<input className="inputId" type="text" placeholder="nombre Pokemon o nro Pokedex" 
				 onChange={actualizarPokemonABuscar} />
				<button onClick={ () => onBuscar()}>Buscar</button>
				<button onClick={ () => onBuscarAlAzar()}>Random</button><br/>

			</div>
		)
	}
}