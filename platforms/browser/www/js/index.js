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
    
    
    
    if( window.localStorage ){
        beerList = JSON.parse(window.localStorage.getItem('beerList'));
    }
    
    
    if(null != beerList){
        for(i=0;i<beerList.length;i++){
            var newBeer = '<div data-role="collapsible" data-collapsed-icon="arrow-d" data-key="' + beerList[i].key + '"><h4>' + beerList[i].beer + '</h4><p>IBU: ' + validateForm(beerList[i].ibu) + '</p><p>ABV: ' + validateForm(beerList[i].abv) + '</p><p>Browar: ' + validateForm(beerList[i].brewery) + '</p><p>Styl: ' + validateForm(beerList[i].style) + '</p><p>Plato: ' + validateForm(beerList[i].plato) + '</p><p>Ocena: ' + validateForm(beerList[i].rate) + '</p></div>';
            $beerList.append(newBeer);
        }
    } else  {
        beerList = new Array();
    }
    
    $('#addNewBeer').on('click', function(){
       var key = Date.now();
        if ($newBeerInput.val() == "" || ($abv.val() < 0.1 || $abv.val() > 70) || ($ibu.val() < 1 || $ibu.val() > 120) || ($plato.val() < 1 || $plato.val() > 50) || ($rate.val() < 0.5 || $rate.val() > 10)){
            console.log('błąd danych');
        } else {
           var newBeer = '<div data-role="collapsible" data-collapsed-icon="arrow-d" data-key="' + key +'"><h4>' + $newBeerInput.val() + '</h4><p>IBU: ' + validateForm($ibu.val()) + '</p><p>ABV: ' + validateForm($abv.val()) + '</p><p>Browar: ' + validateForm($brewery.val()) + '</p><p>Styl: ' + validateForm($style.val()) + '</p><p>Plato: ' + validateForm($plato.val()) + '</p><p>Ocena: ' + validateForm($rate.val()) + '</p></div>';
            $beerList.append(newBeer);
            beerList.push({key:key, beer:$newBeerInput.val(), ibu:$ibu.val(), abv:$abv.val(), brewery:$brewery.val(), style:$style.val(), plato:$plato.val(), rate:$rate.val()});
            if (window.localStorage){
                window.localStorage.setItem('beerList', JSON.stringify(beerList));
            }
            $newBeerInput.val('');
            location.reload();
        }

    });
});
