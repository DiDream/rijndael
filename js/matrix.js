'use strict'
//m numero de filas
//n numero de columnas
class Matrix {
    constructor(m,n, data){
        this.resize(m,n,data);
    }
    resize(m,n, data){
        this._m = m;
        this._n = n;
        this._elements = new Array(m);
        for(var i=0; i<m; i++){
            this._elements[i] = new Array(n);
        }

        if (data) this.elements = data;
    }
    get rows(){
        return this._m;
    }
    get cols(){
        return this._n;
    }
    get length(){
        return this._m*this._n;
    }
    set elements(data){
        var m = this._m;
        var n = this._n;
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
            throw 'Multiplcacion incompatible';
        operation = operation || function(x,y){
            return x+y;
        }
        var result=0;
        var matrixResult = new Matrix(this.rows, matrix.cols);
        for (var i=0; i<this.rows; i++){
            for (var j=0; j<matrix.cols; j++){
                for(var k=0; k<n;k++){

                    // result += this.getElement(i,k) * matrix.getElement(k,j)
                    result = operation(this.getElement(i,k) * matrix.getElement(k,j),result);

                }
                if(j==0)
                    console.log(result.toString(2), result);

                matrixResult.setElement(i,j,result);
                result=0;
            }
        }
        console.log(matrixResult);
        return matrixResult;

    }
}
// operation(i,j){
//
//     xorOperation(addZeros(i.toString(2)),addZeros(j.toString(2)));
// }
