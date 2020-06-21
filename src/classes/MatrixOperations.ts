interface MatrixOperations {
  rows: number;
  columns: number;
  data: number[][];
}

class MatrixOperations {
  public execute(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;

    this.data = [];

    for (let i = 0; i < this.rows; i++) {
      const array = [];
      for (let j = 0; j < this.columns; j++) {
        array.push((Math.random() * 2) - 1);
      }
      this.data.push(array);
    }

    return this;
  }

  static arrayToMatrix(array: number[]) {
    const operator = new MatrixOperations();
    const newMatrix = operator.execute(array.length, 1);

    array.map((item, i) => newMatrix.data[i] = [item]);

    return newMatrix.data;
  }

  static matrixToArray(data: number[][]) {
    const newArray: number[] = [];

    data.map(array => newArray.push(array[0]))

    return newArray;
  }

  static numberMultiply(data: number[][], multiplyer: number) {
    const newData = data.map(array => (array.map(item => item * multiplyer)))

    return newData;
  }

  static transpose(data: number[][]) {
    const newData = data[0].map((_, colIndex) => data.map(row => row[colIndex]));

    return newData;
  }

  static sum(dataA: number[][], dataB: number[][]) {
    const operator = new MatrixOperations();
    const newMatrix = operator.execute(dataA.length, dataB[0].length);

    for (let i = 0; i < newMatrix.rows; i++) {
      for (let j = 0; j < newMatrix.columns; j++) {
        newMatrix.data[i][j] = dataA[i][j] + dataB[i][j];
      }
    }

    return newMatrix.data;
  }

  static subtract(dataA: number[][], dataB: number[][]) {
    const operator = new MatrixOperations();
    const newMatrix = operator.execute(dataA.length, dataA[0].length);

    for (let i = 0; i < newMatrix.rows; i++) {
      for (let j = 0; j < newMatrix.columns; j++) {
        newMatrix.data[i][j] = dataA[i][j] - dataB[i][j];
      }
    }

    return newMatrix.data;
  }

  static hadamard(dataA: number[][], dataB: number[][]) {
    const operator = new MatrixOperations();
    const newMatrix = operator.execute(dataA.length, dataA[0].length);

    for (let i = 0; i < newMatrix.rows; i++) {
      for (let j = 0; j < newMatrix.columns; j++) {
        newMatrix.data[i][j] = dataA[i][j] * dataB[i][j];
      }
    }

    return newMatrix.data;
  }

  static matrixMultiply(dataA: number[][], dataB: number[][]) {
    const operator = new MatrixOperations();
    const newMatrix = operator.execute(dataA.length, dataB[0].length);

    for (let i = 0; i < dataA.length; i++) {
      for (let j = 0; j < dataB[0].length; j++) {

        newMatrix.data[i][j] = 0;

        for (let k = 0; k < dataA[0].length; k++) {

          newMatrix.data[i][j] += dataA[i][k] * dataB[k][j];
      }
    }
  }

    return newMatrix.data;
  }
}

export default MatrixOperations;
