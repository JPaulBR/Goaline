function init(){
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://livescore-api.com/api-client/scores/live.json?key=Bd6byq8QvRvucMcd&secret=ceVZJzlkiUAL9mKKAQW8h4ZMWuh9htnt'
    fetch(proxyUrl + targetUrl)
        .then(response => response.json())
        .then(data => {
            var contenido = document.querySelector('#marcadorA')
            contenido.innerHTML = ''
            var cont = 0;
            for (let valor of data.data.match){
                var ide =valor.home_name+" - "+valor.away_name
                contenido.innerHTML += `
                    <div id="marcador" href="Resultados.html?var=${valor.id}" onclick="redireccionar(${valor.id})">
                        <div class="contenedor" >
                            <div class="ab">${valor.score}</div>
                            <div class="ab">${ide}</div>
                        </div>
                        <p class="marca">${valor.status}</p>
                    </div>
                    `
                cont+=1;
            }
            if (cont==0){
                contenido.innerHTML =`
                <div class="alert alert-info">
                    <strong>Info!</strong> No matches right now :(
                </div>
                `
            }
            $(".loader").remove();
        });
}

function redireccionar(ide){
    window.location.href = "Resultados.html?var="+ide;
}

function funcionExtraerInput(){
    var valor = document.getElementById("texto").value;
    if (valor==""){
        alert("No se ha encontrado información respecto al dato ingresado");
    }
    else{
        verificarPais(valor);
    }
}

function verificarPais(pais){
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://livescore-api.com/api-client/countries/list.json?key=Bd6byq8QvRvucMcd&secret=ceVZJzlkiUAL9mKKAQW8h4ZMWuh9htnt'
    var ide = 0;
    fetch(proxyUrl + targetUrl)
        .then(response => response.json())
        .then(data => {
            for (let valor of data.data.country){
                if (valor.name==pais){
                    ide = valor.id;
                    break;
                }
            }
            if (ide!=0){
                extraerLiga(ide);
            }
            else{
                alert("No se ha encontrado información respecto al dato ingresado");
            }
        });
}


function extraerLiga(ident){
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://livescore-api.com//api-client//leagues//list.json?key=Bd6byq8QvRvucMcd&secret=ceVZJzlkiUAL9mKKAQW8h4ZMWuh9htnt&country='+ident
    var ide=0;  
    fetch(proxyUrl + targetUrl)
        .then(response => response.json())
        .then(data => {
            window.location.href = "Ligas.html?var="+data.data.league[0].id
        });
}

function goLiga(num){
    window.location.href = "Ligas.html?var="+num;
}