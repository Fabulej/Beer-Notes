  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBlYUp0sHQdMbFf_6w-zjOoSqkkd7LRgaY",
    authDomain: "beernotes-f9c96.firebaseapp.com",
    databaseURL: "https://beernotes-f9c96.firebaseio.com",
    projectId: "beernotes-f9c96",
    storageBucket: "beernotes-f9c96.appspot.com",
    messagingSenderId: "1071730273019"
  };
  firebase.initializeApp(config);

var beerList = new Array();

function validateForm(toValidate){
    if (toValidate != ''){
        return toValidate;
    } else {
        return 'brak informacji';
    }
}

$(document).ready(function(){
    var $newBeerInput = $('#newBeerInput');
    var $ibu = $('#ibu');
    var $beerList = $('#beerList');
    var $abv = $('#abv');
    var $brewery = $('#brewery');
    var $style = $('#style');
    var $plato = $('#plato');
    var $rate = $('#rate');
    var ref = firebase.database().ref('beers');
    ref.on('value', gotData, errData);
    
    $('input').on('focus', function(e) {
    e.preventDefault(); e.stopPropagation();
    window.scrollTo(0,0); //the second 0 marks the Y scroll pos. Setting this to i.e. 100 will push the screen up by 100px. 
});
    
    function gotData(data) {
    beerList = null;
        var beers = data.val();
        var keys = Object.keys(beers);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
           var newBeer = '<ul class="beerInfo" data-key="' + beers[k].key + '"><li class="name"><h4>' + beers[k].beer + '</h4></li><li>IBU: ' + validateForm(beers[k].ibu) + '</li><li>ABV: ' + validateForm(beers[k].abv) + '</li><li>Browar: ' + validateForm(beers[k].brewery) + '</li><li>Styl: ' + validateForm(beers[k].style) + '</li><li>Plato: ' + validateForm(beers[k].plato) + '</li><li>Ocena: ' + validateForm(beers[k].rate) + '</li></ul>';
           $beerList.append(newBeer);   
            
        }  
    }
    
    
    function errData(err) {
    console.log(err);
    }
        
    
    $('#addNewBeer').on('click', function(){
       var key = Date.now();
        if ($newBeerInput.val() == "" || ($abv.val() != "" && ($abv.val() < 0.1 || $abv.val() > 70)) || ($ibu.val() != "" && ($ibu.val() < 1 || $ibu.val() > 120)) || ($plato.val() != "" && ($plato.val() < 1 || $plato.val() > 50)) || ($rate.val() != "" && ($rate.val() < 0.5 || $rate.val() > 10))){
            console.log('błąd danych');
        } else {
            ref.push({key:key, beer:$newBeerInput.val(), ibu:$ibu.val(), abv:$abv.val(), brewery:$brewery.val(), style:$style.val(), plato:$plato.val(), rate:$rate.val()});
            $newBeerInput.val('');
            $('#closeForm').click();
            $("ul").last().get(0).scrollIntoView();
        }
    });
});