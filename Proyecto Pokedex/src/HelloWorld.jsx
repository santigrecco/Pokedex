import React,{ Component } from 'react';
import {PokemonView} from './PokemonView';
import IngresarNombre from './IngresarNombre.jsx';
import IngresarTipos from './IngresarTipos.jsx';

export class Principal extends Component{
    constructor(props){
        super(props);
        this.state = {
        	"pokemons":[],
          "cargando": false,
          "mensajeResultado": "",
          "criterioDeBusqueda": "id"
        };
       	// searchPokemonById = searchPokemonById.bind(this);
       	
       	this.drawView = this.drawView.bind(this);
        this.actualizarCriterio = this.actualizarCriterio.bind(this);
        this.drawOpcionesBusqueda = this.drawOpcionesBusqueda.bind(this);
        this.handleStateCargando = this.handleStateCargando.bind(this);
        this.handleStatePokemons = this.handleStatePokemons.bind(this);
        this.getStateCargando = this.getStateCargando.bind(this);
    }

    handleStateCargando(cargando){
      this.setState({
        cargando: cargando
      });
    }

    handleStatePokemons(pokemons){
      this.setState({
        pokemons: pokemons
      });
    }

    getStateCargando(){
      return this.state.cargando;
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

    actualizarCriterio(nuevoCriterio){
      console.log("nuevo criterio = "+nuevoCriterio)
      this.setState({
        criterioDeBusqueda: nuevoCriterio
      });
    }

    drawOpcionesBusqueda(){
      let {criterioDeBusqueda, cargando, pokemons} = this.state;
      const{handleStatePokemons, handleStateCargando, getStateCargando}=this;
      
      if (criterioDeBusqueda=='id'){
        console.log("entro a ID");
        return(
            <IngresarNombre
              handleStateCargando = {handleStateCargando}
              handleStatePokemons = {handleStatePokemons}
              getStateCargando = {getStateCargando}
            />
          );
      }else if(criterioDeBusqueda=='tipo'){
        return (<IngresarTipos
          handleStateCargando = {handleStateCargando}
          handleStatePokemons = {handleStatePokemons}
          getStateCargando = {getStateCargando}
        />);
      }
      console.log('entro a opbusq');
    }


    render(){
        const {name} = this.props;
        const {pokemons, pokemonABuscar,cargando} = this.state;
        const {drawView,drawOpcionesBusqueda,onBuscarAlAzar,actualizarPokemonABuscar,onBuscar,onBuscarPorTipo,elegirBusqueda,actualizarCriterio} = this;
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
            <div>
              <span>Criterio busqueda</span>
              <button onClick={() => actualizarCriterio('id')}>Buscar por Nombre</button>
              <button onClick={() => actualizarCriterio('tipo')}>Buscar por Tipo</button>
            </div>
            <img src="http://66.media.tumblr.com/74da2c5713f820807e9aaceb44923bcb/tumblr_oaocdr1gOk1rymyweo1_500.gif" style={style}/>
            <br/>
      			<div>
      				{
                 drawOpcionesBusqueda()				 		     
      				}
      			</div>
            <div>
              {
                 drawView(pokemons)
              }
            </div>
      		</div>
      	);
    }
}

