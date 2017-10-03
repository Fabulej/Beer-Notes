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
    
    
    
    if( window.localStorage ){
        beerList = JSON.parse(window.localStorage.getItem('beerList'));
    }
    
    
    if(null != beerList){
        for(i=0;i<beerList.length;i++){
            var newBeer = '<div data-role="collapsible" data-key="' + validateForm(beerList[i].key) + '"><h4>' + beerList[i].beer + '</h4><p>IBU: ' + validateForm(beerList[i].ibu) + '</p><p>ABV: ' + validateForm(beerList[i].abv) + '</p><p>Browar: ' + validateForm(beerList[i].brewery) + '</p><p>Styl: ' + validateForm(beerList[i].style) + '</p></div>';
            $beerList.append(newBeer);
        }
    } else  {
        beerList = new Array();
    }
    
    $('#addNewBeer').on('click', function(){
       var key = Date.now();
       var newBeer = '<div data-role="collapsible" data-key="' + key +'"><h4>' + $newBeerInput.val() + '</h4><p>IBU: ' + validateForm($ibu.val()) + '</p><p>ABV: ' + validateForm($abv.val()) + '</p><p>Browar: ' + validateForm($brewery.val()) + '<p>Styl: ' + validateForm($style.val()) + '</p></div>';
        $beerList.append(newBeer);
        beerList.push({key:key, beer:$newBeerInput.val(), ibu:$ibu.val(), abv:$abv.val(), brewery:$brewery.val(), style:$style.val()});
        if (window.localStorage){
            window.localStorage.setItem('beerList', JSON.stringify(beerList));
        }
        $newBeerInput.val('');
    });
});
