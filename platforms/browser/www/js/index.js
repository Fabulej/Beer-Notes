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
    
    function gotData(data) {
        var beers = data.val();
        var keys = Object.keys(beers);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
           var newBeer = '<div data-role="collapsible" data-collapsed-icon="arrow-d" data-key="' + beers[k].key + '"><h4>' + beers[k].beer + '</h4><p>IBU: ' + validateForm(beers[k].ibu) + '</p><p>ABV: ' + validateForm(beers[k].abv) + '</p><p>Browar: ' + validateForm(beers[k].brewery) + '</p><p>Styl: ' + validateForm(beers[k].style) + '</p><p>Plato: ' + validateForm(beers[k].plato) + '</p><p>Ocena: ' + validateForm(beers[k].rate) + '</p></div>';
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
           var newBeer = '<div data-role="collapsible" data-collapsed-icon="arrow-d" data-key="' + key +'"><h4>' + $newBeerInput.val() + '</h4><p>IBU: ' + validateForm($ibu.val()) + '</p><p>ABV: ' + validateForm($abv.val()) + '</p><p>Browar: ' + validateForm($brewery.val()) + '</p><p>Styl: ' + validateForm($style.val()) + '</p><p>Plato: ' + validateForm($plato.val()) + '</p><p>Ocena: ' + validateForm($rate.val()) + '</p></div>';
            $beerList.append(newBeer);
            ref.push({key:key, beer:$newBeerInput.val(), ibu:$ibu.val(), abv:$abv.val(), brewery:$brewery.val(), style:$style.val(), plato:$plato.val(), rate:$rate.val()});
            $newBeerInput.val('');
            location.reload();
        }

    });
});