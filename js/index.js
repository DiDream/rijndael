'use strict'
var ROUNDS = 10;
var rijndaelResults = $('#rijndael-results');
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
        $(this).text(values[i++]);

    })
}

//MODIFACION PRACTICA-------
var input1 = ['32','88','31','e0',
        '43','5a','31','37',
        'f6','30','98','07',
        'a8','8d','a2','34'];
var output = ['39','02','dc','19',
        '25','dc','11','6a',
        '84','09','85','0b',
        '1d','fb','97','32'];
var key = ['2b','28','ab','09',
        '7e','ae','f7','cf',
        '15','d2','15','4f',
        '16','a6','88','3c'];

    // ACTIVAR
// setInputValues(input1,key);
// setInputValues(output,input1);
//-------------------


$('#inputs-form').on('submit',function(e){
    e.preventDefault();
    var message = InputValues($('#inputs-message input'));
    var key = InputValues($('#inputs-key input'));
    // var rijndael = new Rijndael(message, key);
    // var message = ['39','02','dc','19',
    //         '25','dc','11','6a',
    //         'f6','30','98','07',
    //         'a8','8d','a2','34'];
    // var key = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];

    var rijndael = new Rijndael(message,key);


    //Mostrar Valores de entrada
    var input = rijndael.input;
    setMatrixElements($('#inputs .start-round'),input.message)
    setMatrixElements($('#inputs .round-key'),input.key)

    //rondas
    var rounds = ROUNDS -1;
    var log = rijndael.roundsLog;
    for(var i=0;i<rounds;i++){
        setMatrixElements($(`#round-${i+1} .start-round`),log[i].roundStart);
        setMatrixElements($(`#round-${i+1} .sub-bytes`),log[i].afterSubBytes);
        setMatrixElements($(`#round-${i+1} .shift-rows`),log[i].afterShiftRows);
        setMatrixElements($(`#round-${i+1} .mix-colums`),log[i].afterMixColumns);
        setMatrixElements($(`#round-${i+1} .round-key`),log[i].keyGenerated);
    }
    setMatrixElements($(`#round-${10} .start-round`),log[9].roundStart);
    setMatrixElements($(`#round-${10} .sub-bytes`),log[9].afterSubBytes);
    setMatrixElements($(`#round-${10} .shift-rows`),log[9].afterShiftRows);
    setMatrixElements($(`#round-${10} .round-key`),log[9].keyGenerated);

    setMatrixElements($(`#output`),rijndael.output);

});

function setInputValues(m,k){
    var values = m || Random();
    for(var i=0; i<values.length; i++){
        $(`#m-${i}`).val(values[i]);
    }
    values = k || Random();
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
