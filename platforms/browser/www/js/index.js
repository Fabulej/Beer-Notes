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
            var newBeer = '<li data-key="' + beerList[i].key + '">' + beerList[i].beer + beerList[i].ibu + '</li>';
            $beerList.append(newBeer);
        }
    } else  {
        beerList = new Array();
    }
    
    $('#addNewBeer').on('click', function(){
       var key = Date.now();
       var newBeer = '<li data-key="' + key + '">' + $newBeerInput.val() +'</li>';
        $beerList.append(newBeer);
        beerList.push({key:key, beer:$newBeerInput.val(), ibu:$ibu.val()});
        if (window.localStorage){
            window.localStorage.setItem('beerList', JSON.stringify(beerList));
        }
        $newBeerInput.val('');
    });
});