'use strict'
var BYTE_LENGTH = 8;
var SBOX = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22];
var MIXCOLUM_MATRIX = new Matrix(4,4,[2,3,1,1,
                                    1,2,3,1,
                                    1,1,2,3,
                                    3,1,1,2])
var M = {rows: 4, cols: 4};
var K = {rows: 4, cols: 4};
function xorOperation(a, b){
    var result = '';
    for(var i=0; i<BYTE_LENGTH; i++){
        result += a[i] == b[i]? '0': '1';
    }
    return result;
}

function addZeros(a){
    while(a.length<BYTE_LENGTH){
        a = '0' + a;
    }
    return a;
}
Matrix.prototype.shiftRow = function(row, times){
    for(var i=0; i<times; i++){
        this._elements[row].push(this._elements[row].shift() );

    }
    console.log(this._elements[row]);

}
class Rijndael{
    constructor(m, k){
        this.originalMessage = new Matrix(M.rows,M.cols,m);
        this.key = new Matrix(K.rows,K.cols,k);
        this.rounds = [];

        this._m = new Matrix(M.rows,M.cols,m); //Copiando array
        this._k = new Matrix(M.rows,M.cols,k);


    }
    addRoungKey(){
        var m = this._m;
        var k = this._k;
        for(var i=0; i<m.rows; i++){
            for(var j=0; j<m.cols; j++){
                var a = addZeros(m.getElement(i,j).toString(2));
                var b = addZeros(k.getElement(i,j).toString(2));
                this._m.setElement(i,j,parseInt(xorOperation(a, b),  2));
            }
        }
        return this._m;
    }
    subBytes(){
        var m = this._m;

        // for(var i=0; i<m.length; i++){
        //     this._m[i] = SBOX[m[i]];
        // }
        for(var i=0; i<m.rows; i++){
            for(var j=0; j<m.cols; j++){
                var index = m.getElement(i,j);
                m.setElement(i,j, SBOX[index]);
            }
        }
        console.log(this._m);
    }
    shiftRows(){
        var m = this._m;

        // for(var i=4,j=1; i<m.length; i+=4){
        //     var tmp = m.splice(i,j);
        //     m.splice((i+4)-tmp.length,0,...tmp);
        //     j++;
        // }
        for(var i=1; i<M.rows; i++){
            m.shiftRow(i,i);
        }
        // console.log(m);
        console.log(this._m);

    }
    mixColumns(){
        MIXCOLUM_MATRIX.multiply(this._m, function(i,j){
            var xorResult = xorOperation(addZeros(i.toString(2)),addZeros(j.toString(2)));
             return parseInt(xorResult, 2);
        });
    }
}
var a = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var b = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var r = new Rijndael(a,b);
// var z = xorOperation(addZeros((4).toString(2)),addZeros((16).toString(2)));
// console.log(xorOperation(z,addZeros((36).toString(2 ) )) )
