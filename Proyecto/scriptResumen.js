function cargarApi(){
	var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
	targetUrl = 'http://livescore-api.com/api-client/scores/live.json?key=Bd6byq8QvRvucMcd&secret=ceVZJzlkiUAL9mKKAQW8h4ZMWuh9htnt'
	fetch(proxyUrl + targetUrl)
    	.then(response => response.json())
    	.then(data => {
        	var contenido=document.getElementById("marcador");
        	var contenido2 = document.getElementById('competencia')
        	var contenido3 = document.getElementById('divPadre')
        	for (let valor of data.data.match){
        		if (extraerID()==valor.id){
        			var ide =valor.home_name+" - "+valor.away_name
            		contenido.innerHTML = `
            		<div class="contenedor" >
                		<div class="ab">${valor.score}</div>
                		<div class="ab">${ide}</div>
            		</div>
            			<p class="marca">${valor.status}</p>
            		`
            		contenido2.innerHTML =`
            			<h3 class="subTitulo">${valor.competition_name}</h3>
            		`
            		contenido3.innerHTML =`
            			<h3 class="subTitulo">Details</h3>
        				<div id="divHijo"></div>
        				<h4>${valor.location?valor.location:"No name"}</h4>
        				<hr>
            		`
            		$("#loader1").remove();
            		cargarApiVideo(ide);
            		cargarResumen(valor.id,valor.status);
            		//cargarVideo(ide);
            		/*if (valor.events!=false){
            			cargarResumen();
            		}*/
            		break;
        		}
        	}
    	});
}

function cargarResumen(ide,estado){
	var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
	targetUrl = 'http://livescore-api.com/api-client/scores/events.json?key=Bd6byq8QvRvucMcd&secret=ceVZJzlkiUAL9mKKAQW8h4ZMWuh9htnt&id='+ide
	fetch(proxyUrl + targetUrl)
    	.then(response => response.json())
    	.then(data => {
    		var times = 0;
    		var contenido = document.getElementById('eventos')
    		for (let valor of data.data.event){
    			var local = "Home";
    			if (valor.home_away=="a")
    				local = "Away"
    			var comentario = valor.time+"'  "+valor.event+" - "+valor.player+"  ("+local+")"
    			contenido.innerHTML += `
    				<h4 class="subTitulo">${comentario}</h4>
    			`
    			times=valor.time;
    		}
    		$("#loader2").remove();
    		if (estado=="IN PLAY"){
				carga(times,16);
				$("#loader3").remove();
    		}
			else{
				tiempo=document.getElementById("time");
    			tiempo.innerHTML = estado;
    			$("#loader3").remove();
			}
    	});	
}


function extraerID(){
	var paramstr = window.location.search.substr(1);
	var paramarr = paramstr.split ("&");
	var params = {};
	for ( var i = 0; i < paramarr.length; i++) {
    	var tmparr = paramarr[i].split("=");
    	params[tmparr[0]] = tmparr[1];
	}
	return params['var'];
}

function cargarApiVideo(ide){
	var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
	targetUrl = 'https://www.scorebat.com/video-api/v1/'
	var bandera = true
	var contenido = document.querySelector('#video')
	fetch(proxyUrl+targetUrl)
    	.then(response => response.json())
    	.then(data => {
    		for (var valor of data){
    			if (valor.title==ide){
        			contenido.innerHTML = `${valor.videos[0].embed}`
        			bandera = false;
    			}
    		}
    	});
    if (bandera==true){
    	contenido.innerHTML = `
    		<img src="imagenes/error.png" style="width:20%">
        	`
    }
}

function carga(m,s){
	contador_s =s;
	contador_m =m;
	tiempo=document.getElementById("time");
	cronometro = setInterval(function(){
        if(contador_s==60){
			contador_s=0;
			contador_m++;
			tiempo.innerHTML = contador_m+":"+contador_s;
			if(contador_m==60){
				contador_m=0;
			}
    	}
		tiempo.innerHTML = contador_m+":"+contador_s;
    	contador_s++;
    },1000);
}
