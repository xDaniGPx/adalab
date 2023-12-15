function BuscaPokemons(pokemon)
{
    $.ajax({
        url: 'https://pokeapi.co/api/v2/pokemon/'+pokemon,

    }).done(function( datos ) {
		//TODOS
		if(pokemon.length==0)
		{
			$( "#divpokemons" ).empty();  
			$.each(datos['results'], function (index,value) {
				
				$.ajax({
					url: value['url'],
			
				}).done(function( element ) {
					tipo1=element['types'][0]['type']['name']
					if(element['types'].length>1) {
						tipo2=element['types'][1]['type']['name']
						$("#divpokemons").append(
							'<div class="col-lg-4 elemento"><div class="contenido"><div class="foto"><img width="80"src="'+element['sprites']['front_default']+'"><div class="idpok">ID / '+element['id']+'</div></div><div class="props">'+element['name']+'<div id="tipos"><div class="tipo">'+tipo1+'</div>'+'<div class="tipo">'+tipo2+'</div></div><div id="evo'+element['id']+'" class="evo">'
						)
					} else {
						
						$("#divpokemons").append(
							'<div class="col-lg-4 elemento"><div class="contenido"><div class="foto"><img width="80"src="'+element['sprites']['front_default']+'"><div class="idpok">ID / '+element['id']+'</div></div><div class="props">'+element['name']+'<div id="tipos"><div class="tipo">'+tipo1+'</div></div><div id="evo'+element['id']+'" class="evo">'
						)
					}
					//Evolucion
					$.ajax({
						url: 'https://pokeapi.co/api/v2/pokemon-species/'+element['id'],
				
					}).done(function( evo ) {
						$("#evo"+ element['id'] ).append(
							'<div class="divevo">Evoluciona de <br><label class="lblevo">'+evo['evolves_from_species']['name']+'</label></div>'
						)  
					});    
					
					$("#divpokemons").append(
						'</div></div></div></div>'
					);  
				});   				
			});
		}
		else 
		{
			//FILTRO
			$( "#divpokemons" ).empty();  
			tipo1=datos['types'][0]['type']['name']
			if(datos['types'].length>1) {
				tipo2=datos['types'][1]['type']['name']
				$("#divpokemons").append(
					'<div class="col-lg-4 elemento"><div class="contenido"><div class="foto"><img width="80"src="'+datos['sprites']['front_default']+'"><div class="idpok">ID / '+datos['id']+'</div></div><div class="props">'+datos['name']+'<div id="tipos"><div class="tipo">'+tipo1+'</div>'+'<div class="tipo">'+tipo2+'</div></div><div class="evo">'
				)
			} else {
				
				$("#divpokemons").append(
					'<div class="col-lg-4 elemento"><div class="contenido"><div class="foto"><img width="80"src="'+datos['sprites']['front_default']+'"><div class="idpok">ID / '+datos['id']+'</div></div><div class="props">'+datos['name']+'<div id="tipos"><div class="tipo">'+tipo1+'</div></div><div class="evo">'
				)
			}
			//Evolucion
			$.ajax({
				url: 'https://pokeapi.co/api/v2/pokemon-species/'+datos['id'],
		
			}).done(function( evo ) {
				$(".evo").append(
					'<div class="divevo">Evoluciona de <br><label class="lblevo">'+evo['evolves_from_species']['name']+'</label></div>'
				)  
			});    
			
			$("#divpokemons").append(
				'</div></div></div></div>'
			);
		}
	});    
}