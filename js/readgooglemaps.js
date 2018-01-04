function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'google_maps.json', true); 
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            var responseText = xobj.responseText;
            // Parse JSON string into object
            var actual_JSON = JSON.parse(responseText);
            callback(actual_JSON);
        }
    };
    xobj.send(null);  
}

function viewJSON() {
    loadJSON(function(response) {
        /* Aqui l'objecte response representa l'objecte JSON que ens 
           ha retornat el servidor */
        document.getElementById("results").innerHTML = response.results[0].name;
    });
}

function listTypes(response, str, x){
    for (var j in response.results[x].types){
        str+='<li>'+response.results[x].types[j]+'</li>';
    }
    return str;
}

function webConstructor(){
    loadJSON(function(response) {
    var str ='<div class="container" align="center"><br><!-- Definim taula en format de  "Hoverable rows" de Bootstrap --><table class="table table-hover" style="width:auto"><thead><tr><th>#</th><th>Nom</th><th>Adreça</th><th>Latitud</th><th>Longitud</th><th>Tipus establiment</th><th>Icona</th></th></tr></thead>';
    for (var i=0; i<response.results.length;i++){
        
        str+='<tr><td>'+(i+1)+'.</td><td>'+response.results[i].name+'</td><td>'+response.results[i].vicinity+'</td><td>'+response.results[i].geometry.location.lat.toFixed(6)+'</td><td>'+response.results[i].geometry.location.lng.toFixed(6)+'</td><td><ul>';
        str=listTypes(response, str, i)+'</ul></td><td><img src='+response.results[i].icon+'></td></tr>';
          
    }
    str+='</table></div>';
    console.log(str);
    document.getElementById("results").innerHTML =str;
});
}