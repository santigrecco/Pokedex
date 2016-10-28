import React,{ Component } from 'react';
import {PokemonView,searchPokemonById, searchPokemonByType,funcionDelMap} from './PokemonView';



export class Principal extends Component{
    constructor(props){
        super(props);
        this.state = {
        	"pokemons":[],
        	"pokemonABuscar": "pikachu",
          "cargando": false,
          "mensajeResultado": "",
          "criterioDeBusqueda": "id"
        };
       	// searchPokemonById = searchPokemonById.bind(this);
       	this.actualizarPokemonABuscar = this.actualizarPokemonABuscar.bind(this);
       	this.drawView = this.drawView.bind(this);
        this.onBuscar = this.onBuscar.bind(this);
        this.onBuscarPorTipo = this.onBuscarPorTipo.bind(this);
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

    drawView(pokemons){
      if (pokemons.length > 0) {
     		return (
     			pokemons.map( (pokemon,index) => {
  				   			return (
  				   				<div key={index}>
  				   					<PokemonView name={pokemon.name} 
  											 exp={pokemon.base_experience} 
  											 image={pokemon.image}
                         weight={pokemon.weight}
                         height={pokemon.height} 
                         types={pokemon.types}
                         />
  							 	</div>
  							 )
  					   	})
     		)
      }else{
        return (
                <div className='error'>
                  <p>Por favor ingrese un pokemon o tipo</p>
                </div>
              )
        }
    }

    onBuscar(){
      let {pokemons,pokemonABuscar,cargando} = this.state;
      this.setState({
        cargando: true
      })
      searchPokemonById(pokemonABuscar)
      .then( (pokemonData) => {
        if(pokemonData[0].detail != "Not found." ){
          //pokemons.push(pokemonData);
        this.setState({
          pokemons: pokemonData
        });
      }else{
        console.log("No se encontro el pokemon");
      }
      this.setState({
        cargando: false
      })
      });


   
    }

    onBuscarPorTipo(){
      let {pokemons,pokemonABuscar,cargando} = this.state;
      this.setState({
        cargando: true
      })
      searchPokemonByType(pokemonABuscar)
      .then( (pokemonData) => {

      if(pokemonData.detail != "Not found." ){
          //pokemons.push(pokemonData);
        this.setState({
          pokemons: pokemonData
        });
      }else{
        console.log("No se encontro el pokemon");
      }
      this.setState({
          cargando: false
        });

      });
    }
    onBuscarAlAzar(){
      let {pokemons,cargando} = this.state;
      let random = Math.floor(Math.random() * (720 ) + 1.99);
      this.setState({
        cargando: true
      })
      searchPokemonById(random)
      .then( (pokemonData) => {
        if(pokemonData[0].detail != "Not found." ){
          //pokemons.push(pokemonData);
        this.setState({
          pokemons: pokemonData
        });
      }else{
        console.log("No se encontro el pokemon");
      }
      this.setState({
        cargando: false
      })
      });
    }

    elegirBusqueda(){
      let {criterioDeBusqueda} = this.state;
      let {onBuscar,onBuscarPorTipo,onBuscarAlAzar} = this;
      if (criterioDeBusqueda=='id'){
        onBuscar();
      }else if(criterioDeBusqueda=='tipo'){
        onBuscarPorTipo();
      }else if (criterioDeBusqueda=='alAzar'){
        onBuscarAlAzar();
      }
    }
    //bas exp nombre y peso
    render(){
        const {name} = this.props;
        const {pokemons, pokemonABuscar,cargando} = this.state;
        const {drawView,onBuscarAlAzar,actualizarPokemonABuscar,onBuscar,onBuscarPorTipo} = this;
        let style = {};
        if (!cargando) {
          style = {
            height:'0px',
          }
        }else{
          style = {
            height:'30px',
          }
        }
      	
      	return(

      		<div>

      			<input type="text" onChange={actualizarPokemonABuscar} />
            <img src="http://66.media.tumblr.com/74da2c5713f820807e9aaceb44923bcb/tumblr_oaocdr1gOk1rymyweo1_500.gif" style={style}/>
            <br/>
            <select className="">
              <option value="nombre">Nombre</option>
              <option value="tipo">Tipo</option>
              <option value="alAzar">¡Al azar!</option>
            </select>
            <select className="Lista">
              <option value="cualquiera">Cualquiera</option>
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
             <select>
              <option value="cualquiera">Cualquiera</option>
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
            <button onClick={() => elegirBusqueda()}>Buscar</button>
      			<button onClick={ () => onBuscar()}>Buscar por Nombre </button>
            <button onClick={ () => onBuscarPorTipo()}>Buscar por Tipo </button>
            <button onClick={ () => onBuscarAlAzar()}>Random</button><br/>
      			<div>
      				{
				 		     drawView(pokemons)
      				}
      			</div>
      		</div>
      	);
    }
}

