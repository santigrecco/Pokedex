import React from 'react';


export const PokemonView = ({name,exp,weight,image,types,height}) => {
	let tipos = types[0].type.name;
	if (types.length>1)
		if (types[1].slot==2)
			tipos += " / " + types[1].type.name;
		else
			tipos = types[1].type.name + " / " + tipos;

	return (
			<div>
				<div className="sprite-div"><img className="sprite" src={image} alt="no hay nada pibe kb"/></div>
				<p className="nombre">Nombre: {name}</p>
				<p className="tipos">Tipos: {tipos}</p>
				<p className="exp">Base Exp: {exp} </p>
				<p className="peso">Peso: {weight/10} kg</p>
				<p className="altura">Altura: {height} ft</p>
			</div>
		);
}

export const  searchPokemonById = (idPokemon) => {
		let api_base_url = "http://pokeapi.co/api/v2/pokemon/";

		return new Promise( (resolve,reject) => {
    		fetch(`${api_base_url}${idPokemon}`)
			    .then( (data) => {
			       	return data.json();
			    }).then( (data) => {
			    	let pokemonEncontrado = [];
			    	let{detail} = data;

	    			
			    	if(detail != "Not found." ){
			    		let { base_experience, name, weight, height, types , sprites: {front_default} } = data;
				    		pokemonEncontrado.push({
		   					name: name,
		   					weight: weight,
		   					height: height,
		   					types: types,
		   					image: front_default,
		   					base_experience: base_experience
	   					});
				      }else{
				        pokemonEncontrado.push({
				        	detail: detail
				        });
				      };
			    	console.log(pokemonEncontrado);
			    	resolve(pokemonEncontrado);
			    })
			    .catch( (err) => {
			    	reject(err);
			    })

		});
    }  

export const  searchPokemonByType = (idType) => {
	let api_base_url = "http://pokeapi.co/api/v2/type/";
	let pokemons = [];
	return new Promise( (resolve,reject) => {
		
		fetch(`${api_base_url}${idType}`)
		    .then( (data) => {
		       	return data.json();
		    }).then( (data) => 
		       {

		       	let promisesArray = [];

		       	data.pokemon.forEach( (pokemon) => {
		       		let promise = new Promise ((resolve, reject) => {
		       			fetch(pokemon.pokemon.url)
		       			.then( (data) => {
		       				return data.json();
		    			}).then((data) => {
		       				let { base_experience, name, weight, height, types , sprites: {front_default} } = data;

		       				resolve({
		       					name: name,
		       					weight: weight,
		       					height: height,
		       					types: types,
		       					image: front_default,
		       					base_experience: base_experience
		       				});

		       			}, (err) => {
		       				reject(err);
		       			});
		       		});

		       		promisesArray.push(promise);
		       	});


	       		Promise.all(promisesArray).then( (results) => {
	       			//Ahora discriminamos segun tipo secundario

	       			resolve(results);
	       			console.log("termine guacho");
	       		}, (errs) => {
	       			reject(errs);
	       		});
		    	
			 }).catch((err) => {
			 	reject(err);
			 });
	})
};




