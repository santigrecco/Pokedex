import React,{ Component } from 'react';
import {PokemonView,searchPokemonById, searchPokemonByType,funcionDelMap} from './PokemonView';



export class Principal extends Component{
    constructor(props){
        super(props);
        this.state = {
        	"pokemons":[],
        	"pokemonABuscar": "pikachu",
          "cargando": false
        };
       	// searchPokemonById = searchPokemonById.bind(this);
       	this.actualizarPokemonABuscar = this.actualizarPokemonABuscar.bind(this);
       	this.drawView = this.drawView.bind(this);
        this.onBuscar = this.onBuscar.bind(this);
        this.onBuscarPorTipo = this.onBuscarPorTipo.bind(this);
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

    //bas exp nombre y peso
    render(){
        const {name} = this.props;
        const {pokemons, pokemonABuscar,cargando} = this.state;
        const {drawView,actualizarPokemonABuscar,onBuscar,onBuscarPorTipo} = this;
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
            <img src="http://66.media.tumblr.com/74da2c5713f820807e9aaceb44923bcb/tumblr_oaocdr1gOk1rymyweo1_500.gif" style={style}/><br/>
      			<button onClick={ () => onBuscar()}>Buscar por Nombre </button>
            <button onClick={ () => onBuscarPorTipo()}>Buscar por Tipo </button>
            <button onClick={ () => onBuscarPorTipo()}>Random</button>
      			<div>
      				{
				 		     drawView(pokemons)
      				}
      			</div>
      		</div>
      	);
    }
}

