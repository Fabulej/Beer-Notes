var beerList = new Array();

$ (document).ready(function(){
    var $newBeerInput = $('#newBeerInput');
    var $ibu = $('#ibu');
    var $beerList = $('#beerList');
    
    if( window.localStorage ){
        beerList = JSON.parse(window.localStorage.getItem('beerList'));
    }
    
    
    if(null != beerList){
        for(i=0;i<beerList.length;i++){
            var newBeer = '<div data-role="collapsible" data-key="' + beerList[i].key + '"><h4>' + beerList[i].beer  + '</h4><p>' + beerList[i].ibu + '</p></div>';
            $beerList.append(newBeer);
        }
    } else  {
        beerList = new Array();
    }
    
    $('#addNewBeer').on('click', function(){
       var key = Date.now();
       var newBeer = '<div data-role="collapsible" data-key="' + key +'"><h4>' + $newBeerInput.val() + '</h4><p>' + $ibu.val() + '</p></div>';
        $beerList.append(newBeer);
        beerList.push({key:key, beer:$newBeerInput.val(), ibu:$ibu.val()});
        if (window.localStorage){
            window.localStorage.setItem('beerList', JSON.stringify(beerList));
        }
        $newBeerInput.val('');
    });
});
