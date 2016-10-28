import React,{ Component } from 'react';
import {searchPokemonByType} from './PokemonView';


export default class IngresarTipos extends Component{


	constructor(props) {
		super(props);
		this.state ={
			"tipo1": "tipo1",
			"tipo2": "tipo2",
		}

		this.handleTipo1 = this.handleTipo1.bind(this);
		this.handleTipo2 = this.handleTipo2.bind(this);
		this.onBuscarPorTipo = this.onBuscarPorTipo.bind(this);
	}



	onBuscarPorTipo(){
      let {pokemons, tipo1,cargando} = this.state;
      this.props.handleStateCargando(true);
      let tipoBuscado = tipo1;
      if (tipoBuscado==='tipo1') {
      	console.log("entro al if");
      	let tipos = [
      		'Fire',
			'Water',
			'Grass',
			'Electric',
			'Bug',
			'Dark',
			'Dragon',
			'Fairy',
			'Fighting',
			'Flying',
			'Ghost',
			'Ground',
			'Ice',
			'Normal',
			'Poison',
			'Psychic',
			'Rock',
			'Steel'
		];
      	let random = Math.floor(Math.random() * (17));
      	tipoBuscado = tipos[random];
      }
      searchPokemonByType(tipoBuscado.toLowerCase())
      .then( (pokemonData) => {
      if(pokemonData.detail != "Not found." ){
          //pokemons.push(pokemonData);
        this.props.handleStatePokemons(pokemonData);
      }else{
        console.log("No se encontro el pokemon");
      }
      this.props.handleStateCargando(false);

      });
    }

    handleTipo1(event){
    	const {value} = event.target;
    	this.setState({
    		tipo1: value
    	});
    }
    handleTipo2(event){
    	const {value} = event.target;
    	this.setState({
    		tipo2: value
    	});
    }
	render(props){
		const {onBuscarPorTipo, handleTipo1,handleTipo2} = this;
		const {tipo1} = this.state;
		var mostrarTipo2;
		if (tipo1!='tipo1'){
			mostrarTipo2=false;
		}else{
			mostrarTipo2=true;
		}
		return (
			<div className="divTipos">
				<select className="seleccTipo1" onChange={handleTipo1}>
					<option value="tipo1">Tipo 1</option>
		            <option value="Fire">Fire</option>
		            <option value="Water">Water</option>
		            <option value="Grass">Grass</option>
		            <option value="Electric">Electric</option>
		            <option value="Bug">Bug</option>
		            <option value="Dark">Dark</option>
		            <option value="Dragon">Dragon</option>
		            <option value="Fairy">Fairy</option>
		            <option value="Fighting">Fighting</option>
		            <option value="Flying">Flying</option>
		            <option value="Ghost">Ghost</option>
		            <option value="Ground">Ground</option>
		            <option value="Ice">Ice</option>
		            <option value="Normal">Normal</option>
		            <option value="Poison">Poison</option>
		            <option value="Psychic">Psychic</option>
		            <option value="Rock">Rock</option>
		            <option value="Steel">Steel</option>
				</select>
				<select disabled={mostrarTipo2} className="seleccTipo2" onChange={handleTipo2}>
					<option value="tipo2">Tipo 2</option>
		            <option value="Fire">Fire</option>
		            <option value="Water">Water</option>
		            <option value="Grass">Grass</option>
		            <option value="Electric">Electric</option>
		            <option value="Bug">Bug</option>
		            <option value="Dark">Dark</option>
		            <option value="Dragon">Dragon</option>
		            <option value="Fairy">Fairy</option>
		            <option value="Fighting">Fighting</option>
		            <option value="Flying">Flying</option>
		            <option value="Ghost">Ghost</option>
		            <option value="Ground">Ground</option>
		            <option value="Ice">Ice</option>
		            <option value="Normal">Normal</option>
		            <option value="Poison">Poison</option>
		            <option value="Psychic">Psychic</option>
		            <option value="Rock">Rock</option>
		            <option value="Steel">Steel</option>
				</select>
				<button onClick={() => onBuscarPorTipo()}>Buscar</button>
			</div>
		)
	}
}