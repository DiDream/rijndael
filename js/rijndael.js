'use strict'
var BYTE_LENGTH = 8;
var SBOX = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22];
var MIXCOLUM_MATRIX = new Matrix(4,4,[2,3,1,1,
                                    1,2,3,1,
                                    1,1,2,3,
                                    3,1,1,2])
var RCON = new Matrix(4,10,
    [1,2,4,8,16,32,64,128,27,54,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0]);

var M = {rows: 4, cols: 4};
var K = {rows: 4, cols: 4};
var ROUNDS = 10;
function xor(){
    var result = '00000000';
    for(var i=0; i<arguments.length; i++){
        var op = '';
        if ( typeof arguments[i] == 'number' ) {
            op = arguments[i].toByte();

        }
        else if(typeof arguments[i] == 'string')
            op = arguments[i];
        else
            throw 'Parametro no valido para operacion xor';
        var tmp = '';
        for(var j=0; j<BYTE_LENGTH; j++){
            tmp += result[j] == op[j]? '0': '1';
        }

        result = tmp;
    }
    return parseInt(result,2);
}

Number.prototype.toByte = function(){
    if (this.valueOf()>=256)
        throw 'Numero mayor que 255';
    var byte = this.valueOf().toString(2);
    while(byte.length<BYTE_LENGTH){
        byte = '0' + byte;
    }
    return byte;
}
Array.prototype.rotate = function(times){
    this.push(this.shift());
}
Matrix.prototype.shiftRow = function(row, times){
    times = times || 1;
    for(var i=0; i<times; i++){
        this._elements[row].rotate(times);

    }

}
Matrix.prototype.pushColumn = function(newColumn){
    if (!newColumn instanceof Array && typeof newColumn != 'string')
        throw 'Variable no válida';
    if (newColumn.length != this.rows && this.rows != 0)
        throw 'La nueva columna tiene longitud incorrecta';


    for(var i=0; i<this.rows; i++){
        this._elements[i].push(newColumn[i]);
    }
    this._cols++;
}
Matrix.prototype.setColum = function(j,col){
    for(var i=0; i<this.rows; i++){
        this.setElement(i,j,col[i]);
    }
}
Matrix.prototype.toHex = function(){
    var res = new Array();
    for(var i=0; i<this.rows; i++){
        for(var j=0; j<this.cols; j++){
            res.push(this.getElement(i,j).toString(16).toUpperCase());
        }
    }
    return res;
}
class Rijndael{
    constructor(m, k){
        this.message = new Matrix(M.rows,M.cols,m);
        this.key = new Matrix(K.rows,K.cols,k);
        this.roundsLog = [];
        this.roundKey = 0;

        //Inicializacion
        this._m = new Matrix(M.rows,M.cols,m); //Copiando array
        this._k = new Matrix(M.rows,M.cols,k);

        //algoritmo


        var rondas = ROUNDS-1;

        for(var i=0; i<rondas;i++){
            console.log("RONDA:",i+1)
            var log = new Object();
            log.roundStart = this.addRoundKey();
            log.afterSubBytes = this.subBytes();
            log.afterShiftRows = this.shiftRows();
            log.afterMixColumns = this.mixColumns();
            log.keyGenerated = this.generateKey();
            this.roundsLog.push(log);

        }
        console.log("RONDA: 10")
        this.roundsLog.push({
            roundStart: this.addRoundKey(),
            afterSubBytes: this.subBytes(),
            afterShiftRows: this.shiftRows(),
            keyGenerated: this.generateKey()
        });
        console.log("INPUT")
        this.addRoundKey();

    }
    get input(){
        return {
            message: this.message.toHex(),
            key: this.key.toHex()
        }
    }
    get output(){
        return this._m.toHex();
    }
    generateKey(){
        var k = this._k;
        var col = k.getColumn(3);

    //OBTENER PRIMERA COLUMNA
        //RotWord
        col.rotate(1);

        //subBytes
        for(var i=0; i<K.rows; i++){
            col[i] = SBOX[col[i]];
        }
        //Rcon
        var minusFour = k.getColumn(0);
        var rcon = RCON.getColumn(this.roundKey++);
        for(var i=0; i<K.rows; i++){
            k.setElement(i,0 , xor(minusFour[i],col[i],rcon[i]) );
        }

    //OBTENER RESTO DE COLUMNAS
        for(var i=1; i<K.cols;i++){
            for(var j=0; j<k.rows; j++){

                k.setElement(j,i, xor(
                                    k.getElement(j,i),
                                    k.getElement(j,i-1)
                                    )
                );
            }
        }
        console.log(k.toHex());
        return k.toHex();

    }
    addRoundKey(){
        var m = this._m;
        var k = this._k;
        for(var i=0; i<m.rows; i++){
            for(var j=0; j<m.cols; j++){
                var a = m.getElement(i,j);
                var b = k.getElement(i,j);
                this._m.setElement(i,j,xor(a, b) );
            }
        }
        console.log(m.toHex());
        return m.toHex();
    }
    subBytes(){
        var m = this._m;
        for(var i=0; i<m.rows; i++){
            for(var j=0; j<m.cols; j++){
                var index = m.getElement(i,j);
                m.setElement(i,j, SBOX[index]);
            }
        }
        console.log(m.toHex());
        return m.toHex();
    }
    shiftRows(){
        var m = this._m;
        for(var i=1; i<M.rows; i++){
            m.shiftRow(i,i);
        }
        console.log(m.toHex());
        return m.toHex();

    }
    mixColumns(){
        var m = this._m;
        this._m = MIXCOLUM_MATRIX.multiply(this._m, function(a,b,previusResult){
            var a = a.toByte();
            var b = b.toByte();
            if (a.charNumber('1')<b.charNumber('1'));{ // a * b => b ha de tener menos unos
                var tmp = b;
                b=a;
                a=tmp;
            }
            var shiftsResult = [];
            var shiftIndices = b.split('').reverse().join('').charIndices('1');

            shiftsResult.push(a);
            for(var shifts=1; shifts<8; shifts++){
                a = a.rijndaelShift();
                shiftsResult.push(a)
            }

            for(var l=0; l<shiftIndices.length; l++){
                previusResult = xor(shiftsResult[ shiftIndices[l]], previusResult)
            }
            return previusResult;
        });

        console.log(this._m.toHex());
        return this._m.toHex();
    }
}
Array.prototype.hexToDecimal = function(){
    var res = []
    for(var i=0; i<this.length; i++){
        res.push(parseInt(this[i],16));
    }
    return res;
}
// var a = ['32','88','31','e0',
//         '43','5a','31','37',
//         'f6','30','98','07',
//         'a8','8d','a2','34'];
// var b = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
// var r = new Rijndael(a.hexToDecimal(),b.hexToDecimal());
// r.addRoundKey();
// r.subBytes();
// r.shiftRows();
// r.mixColumns();
// r.generateKey();
// r.addRoundKey();
// r.subBytes();
// r.shiftRows();
// r.mixColumns();
// r.generateKey();
// r.addRoundKey();
