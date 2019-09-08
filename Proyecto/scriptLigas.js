function cargarPartidos(){
  extraerNombreLiga();
	var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
	targetUrl = 'https://livescore-api.com/api-client//fixtures//matches.json?key=Bd6byq8QvRvucMcd&secret=ceVZJzlkiUAL9mKKAQW8h4ZMWuh9htnt&league='+extraer()
  fetch(proxyUrl + targetUrl)
    	.then(response => response.json())
    	.then(data => {
    		var contenido = document.querySelector("#colocar")
    		contenido.innerHTML = ''
    		for (let valor of data.data.fixtures){
    			var jornada = "Round "+valor.round;
    			var partido = valor.home_name+" - "+valor.away_name;
    			contenido.innerHTML += `
					<div class="contenedor" >
						<div class="ab">${jornada}</div>
                  		<div class="ab">${valor.date}</div>
                  		<div class="ab">${valor.time}</div>
                  		<div class="ab">${partido}</div>
                	</div>
                	<p class="marca">${valor.location}</p>
            	  	<hr>	
    			`	
    		}
    		$(".loader").remove();		
    	});
}


function cargarTabla(){
	var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
	targetUrl = 'https://livescore-api.com/api-client/leagues/table.json?key=Bd6byq8QvRvucMcd&secret=ceVZJzlkiUAL9mKKAQW8h4ZMWuh9htnt&league='+extraer()+'&season=4'
	fetch(proxyUrl + targetUrl)
    	.then(response => response.json())
    	.then(data => {
    		var contenido = document.querySelector("#rata")
    		contenido.innerHTML = ''
    		for (let valor of data.data.table){
    			contenido.innerHTML += `
    				<tr>
      					<th scope="row">${valor.rank}</th>
      					<td>${valor.name}</td>
      					<td>${valor.matches}</td>
      					<td>${valor.won}</td>
      					<td>${valor.lost}</td>
      					<td>${valor.goal_diff}</td>
      					<td>${valor.points}</td>
    				</tr>
    			`
    		}
    		$("#loader").remove();	
    	});
    cargarPartidos();
}

function extraer(){
	var paramstr = window.location.search.substr(1);
	var paramarr = paramstr.split ("&");
	var params = {};
	for ( var i = 0; i < paramarr.length; i++) {
    	var tmparr = paramarr[i].split("=");
    	params[tmparr[0]] = tmparr[1];
	}
	return params['var'];
}

function extraerNombreLiga(){
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
  targetUrl = 'https://livescore-api.com/api-client/fixtures/leagues.json?key=Bd6byq8QvRvucMcd&secret=ceVZJzlkiUAL9mKKAQW8h4ZMWuh9htnt'
  fetch(proxyUrl + targetUrl)
      .then(response => response.json())
      .then(data => {
        for (let valor of data.data.leagues){
          console.log(valor.league_id+"=="+extraer())
          if (valor.league_id==extraer()){
            var leaga = valor.league_name+" - "+valor.country_name;
            var contenido = document.querySelector("#Liga")
            contenido.innerHTML = `
            <h3 class="subTitulo">${leaga}</h3>
            `
            $("#loader3").remove();  
            break;
          }
        }
      });
}