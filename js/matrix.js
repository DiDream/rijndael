'use strict'
//m numero de filas
//n numero de columnas
String.prototype.charNumber = function(c){
    var count = 0;
    for(var i=0; i<this.length; i++){
        if(this[i]===c) count++;
    }
    return count;
}
String.prototype.charIndices = function(c){
    var indices = [];
    for(var i=0; i<this.length; i++){
        if(this[i]===c)
            indices.push(i);
    }
    return indices;
}
String.prototype.rijndaelShift = function(){
    var str = this.slice(1) + '0';
    return this[0]==1? xor(str,'00011011').toByte() : str;
}
class Matrix {
    constructor(m,n, data){
        this.resize(m,n,data);
    }
    resize(m,n, data){
        this._rows = m;
        this._cols = n;
        this._elements = new Array(m);
        for(var i=0; i<m; i++){
            this._elements[i] = new Array(n);
        }

        if (data) this.elements = data;
    }
    get rows(){
        return this._rows;
    }
    get cols(){
        return this._cols;
    }
    get length(){
        return this._rows*this._cols;
    }
    set elements(data){
        var m = this._rows;
        var n = this._cols;
        if (!data instanceof Array && typeof data != 'string')
            throw  'Variable no válida';
        if (data.length != this.length)
            throw 'Longitud de cadena no válida';

        for(var i=0; i<m; i++){
            for(var j=0; j<n; j++){
                this._elements[i][j] = data[i*n+j];
            }

        }

    }
    setElement(i,j,data){
        this._elements[i][j]=data;
    }
    getElement(i,j){
        return this._elements[i][j];
    }
    getColumn(j){
        return this._elements.map(function(value, index){
            return value[j];
        })
    }
    getRow(i){
        return this._elements[i];
    }
    multiply(matrix, operation){
        var n = this.cols;
        var m = matrix.rows;
        if(n != m)
            throw 'Multiplicacion incompatible';
        operation = operation || function(x,y,previusResult){ //Multiplicacion normal
            return x*y+previusResult;
        }

        var matrixResult = new Matrix(this.rows, matrix.cols);
        for (var i=0; i<this.rows; i++){
            for (var j=0; j<matrix.cols; j++){
                var result=0;
                for(var k=0; k<n;k++){
                    result = operation(this.getElement(i,k),matrix.getElement(k,j), result);

                }
                matrixResult.setElement(i,j,result);
            }
        }
        console.log(matrixResult);
        return matrixResult;

    }
}
