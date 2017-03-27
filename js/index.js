'use strict'
var ROUNDS = 10;


(function(){
    $('#rijndael-results').append(Input());
    for(var i=1; i<=ROUNDS; i++){
        $('#rijndael-results').append(Round(`Ronda ${i}`, `round-${i}`));
    }
    $('#rijndael-results').append(Output());
})()
