'use strict'
var ROUNDS = 10;
var rijndaelResults = $('#rijndael-results');
var message = [];
(function(){
    rijndaelResults.append(Input());
    for(var i=1; i<=ROUNDS; i++){
        rijndaelResults.append(Round(`Ronda ${i}`, `round-${i}`));
    }
    rijndaelResults.append(Output());
})()
function InputValues(inputs){
    var result = [];
    inputs.each(function(){
        result.push(parseInt($(this).val(), 16))
    })
    return result;
}
function setMatrixElements(matrix, values){
    var i=0;
    matrix.find('.matrix-element').each(function(){
        $(this).text(values[i++].toString(16).toUpperCase());

    })
}
$('#inputs-form').on('submit',function(e){
    e.preventDefault();
    message = InputValues($('#inputs-message input'));
    var key = InputValues($('#inputs-key input'));
    var rijndael = new Rijndael(message, key);


    //Mostrar Valores de entrada
    setMatrixElements($('#inputs .start-round'),message)
    setMatrixElements($('#inputs .round-key'),key)

    //rondas
    
});

function RandomValues(){
    var values = Random();
    for(var i=0; i<values.length; i++){
        $(`#m-${i}`).val(values[i]);
    }
    values = Random();
    for(var i=0; i<values.length; i++){
        $(`#k-${i}`).val(values[i]);
    }
}
function Random(length=16){
    var result = [];
    for(var i=0; i<length; i++){
        result.push(Math.floor(Math.random()*256).toString(16).toUpperCase());
    }
    return result;
}
