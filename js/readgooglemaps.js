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
        //Començam a construir un string amb els valors per defecte que generaren el div que conte la taula amb la primera fila que es la capçalera.
        var str ='<br><div class="container" align="center" style="background-color:white;"><br><!-- Definim taula en format de  "Hoverable rows" de Bootstrap --><table class="table table-hover" style="width:auto"><thead><tr><th>#</th><th>Nom</th><th>Adreça</th><th>Latitud</th><th>Longitud</th><th>Tipus establiment</th><th>Icona</th></th></tr></thead>';
        
        //Feim un recorregut per el nombre total de resultats, en aquest cas 20 pero podria variar.
        for (var i=0; i<response.results.length;i++){
            //Cream una nova fila, anam afegint cada un dels valors segons l'ordre que hem definit a la capçalera, fixam el nombre de decimals a 6 per la latidud i longitud perque totes es veguin igual a la taula i obrim una lista.
            str+='<tr><td>'+(i+1)+'.</td><td>'+response.results[i].name+'</td><td>'+response.results[i].vicinity+'</td><td>'+response.results[i].geometry.location.lat.toFixed(6)+'</td><td>'+response.results[i].geometry.location.lng.toFixed(6)+'</td><td><ul>';
            //Cridam una funció que ens construirà i retornarà una llista independentment del nombre de valors d'aquesta, també afegim l'icona i tancam fila.
            str=listTypes(response, str, i)+'</ul></td><td><img src='+response.results[i].icon+'></td></tr>';
            
        }
        //Fi de la taula i del div.
        str+='</table></div>';
        console.log(str);
        //Per finalitzar introduim l'string creat al div de l'index amb id="results".
        document.getElementById("results").innerHTML =str;
    });
}

function listTypes(response, str, x){
    //Feim un recorregut tantes vegades com "types" tenim al "response.results" actual per poder generar una lista independentmene del nombre de "types" de cada un.
    for (var j in response.results[x].types){
        str+='<li>'+response.results[x].types[j]+'</li>';
    }
    return str;
}

function webConstructor(){
    //Selector que simula l'obertura o tancament que mostrar els resultats de la taula, si encara no l'hem generat el "value" es "Veure Restaurants", així sabem si l'hem de crear.
    if (document.getElementById('viewBtn').getAttribute("value")=="Veure Restaurants"){
        //Antes de generar l'string cambiam "value" per mostrar "No veure Restaurants" i si tornam a pitjar el botó ja no entri a l'"if".
        document.getElementById('viewBtn').value='No veure Restaurants';
        //Cridam a la funció que genera l'string amb el contigut html per a l'index a partir de l'arxiu JSON.
        viewJSON();
    }else {
        //Si ja hem generat l'string cridam la funció que ens elimina la taula creada.
        webClear();
    }
}

function webClear(){
    //Tornam a deixar el "value" del botó amb "Veure Restaurants" i el contingut del div "results" el sustituim per un string buit per no mostrar res i donar l'efecte de tancar-lo.
    document.getElementById('viewBtn').value='Veure Restaurants';
    document.getElementById("results").innerHTML ="";
}