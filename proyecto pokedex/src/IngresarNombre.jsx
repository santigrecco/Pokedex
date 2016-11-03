import React,{ Component } from 'react';
import {searchPokemonById} from './PokemonView';


export default class IngresarNombre extends Component{
	constructor(props) {
		super(props);
		this.state= {
			"pokemonABuscar": ""
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

	onBuscar(props){
      let {pokemonABuscar} = this.state;
      this.props.handleStateCargando(true);
      searchPokemonById(pokemonABuscar)
      .then( (pokemonData) => {
        if(pokemonData[0].detail != "Not found." ){
        	this.props.handleStateMensajeResultado("Mostrando datos de "+ pokemonData[0].name);
         	//pokemons.push(pokemonData);

        this.props.handleStatePokemons(pokemonData);
        

      }else{
      	this.props.handleStateMensajeResultado("No se ha encontrado un pokemon con ese nomnbre/id");
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
          this.props.handleStateMensajeResultado("Mostrando datos de "+ pokemonData[0].name);
        this.props.handleStatePokemons(pokemonData);

      	}else{
      		this.props.handleStateMensajeResultado("No se ha encontrado un pokemon con ese nomnbre/id");
       	 	console.log("No se encontro el pokemon");
     	}
     	this.props.handleStateCargando(false);
      });
    }

	render(){
		const{pokemonABuscar} = this.state;
		const {onBuscar, onBuscarAlAzar, actualizarPokemonABuscar} = this;
		const estadoCargando = this.props.getStateCargando();
		let habilitarBusqueda = true;
		console.log("esta renderaizanodo");
		if(pokemonABuscar==="" || estadoCargando){
			habilitarBusqueda=false;
		}
		return (
			 <div className="formularioDeBusqueda">
				<form>
					<input
					className="inputId"
					type="text"
					placeholder="Nombre / ID Pokemon"
					onChange={actualizarPokemonABuscar}
					/>
					<input
					type="submit"
					disabled={!habilitarBusqueda}
					onClick={ () => onBuscar()}
					value="Buscar"
					/>
					<button disabled={estadoCargando}  onClick={ () => onBuscarAlAzar()}>Random</button><br/>
				</form>
			</div>
		)
	}
}