import React,{ Component } from 'react';


export default class PokemonSeleccionadoView extends Component{
	constructor(props) {
		super(props);
	}

	render(props){
		let {name,base_experience,weight,image,types,height} = this.props.pokemon;
		console.log("Creando PokemonSeleccionadoView con: ");
		console.log(this.props.pokemon);
		if(image===null){
			image = 'http://orig13.deviantart.net/2ed2/f/2011/123/8/e/who__s_that_pokemon_by_kevintut-d3fhm23.gif';
		}
		let tipos = types[0].type.name;
		if (types.length>1)
		if (types[1].slot==2)
			tipos += " / " + types[1].type.name;
		else
			tipos = types[1].type.name + " / " + tipos;
		return (
			<div className="resultado-pokedex-izquierda-datos">
				<div className="sprite-div"><img className="sprite-grande" src={image} alt="no hay nada pibe kb"/></div>
				<div className="statsBox">
				<p className="nombre">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
				<p className="tipos">Tipos: {tipos}</p>
				<p className="exp">Base Exp: {base_experience} </p>
				<p className="peso">Peso: {weight/10} kg</p>
				<p className="altura">Altura: {height} ft</p>
				</div>
			</div>
		)
	}
}