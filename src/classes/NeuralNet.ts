import MatrixOperations from './MatrixOperations';

interface NeuralNetwork {
  inputNodes: number;
  hiddenNodes: number;
  outputNodes: number;
  learningRate: number;
  biasInputHidden: number[][];
  biasHiddenOutput: number[][];
  inputWeigths: number[][];
  hiddenWeigths: number[][];
}

function sigmoid(data: number[][]) {
  const operator = new MatrixOperations();
  const newMatrix = operator.execute(data.length, 1);

  for (let i = 0; i < data.length; i++) {
    newMatrix.data[i] = [( 1 / ( 1 + Math.exp(-data[i][0])))];
  }

  return newMatrix.data;
}

function derivateSigmoid(data: number[][]) {
  const operator = new MatrixOperations();
  const newMatrix = operator.execute(data.length, 1);

  for (let i = 0; i < data.length; i++) {
    newMatrix.data[i] = [( data[i][0] * (1 - data[i][0]))];
  }

  return newMatrix.data;
}

class NeuralNetwork {
  constructor(inputNodes: number, hiddenNodes: number, outputNodes: number) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;
    this.learningRate = 0.1;

    const operator = new MatrixOperations();

    this.biasInputHidden = (operator.execute(this.hiddenNodes, 1)).data;
    this.biasHiddenOutput = (operator.execute(this.outputNodes, 1)).data;

    this.inputWeigths = (operator.execute(this.hiddenNodes, this.inputNodes)).data;
    this.hiddenWeigths = (operator.execute(this.outputNodes, this.hiddenNodes)).data;
  }

  run(inputArray: number[]) {
    // input to hidden layer
    const inputMatrix = MatrixOperations.arrayToMatrix(inputArray);

    const firstMultiply = MatrixOperations.matrixMultiply(this.inputWeigths, inputMatrix);
    const hiddenLayer = sigmoid(MatrixOperations.sum(firstMultiply, this.biasInputHidden));

    // hidden to output
    const seccondMultiply = MatrixOperations.matrixMultiply(this.hiddenWeigths, hiddenLayer);
    const output = sigmoid(MatrixOperations.sum(seccondMultiply, this.biasHiddenOutput));

    const outputArray = MatrixOperations.matrixToArray(output);

    return outputArray;
  }

  train(input: number[], expected: number[]) {
    // feedforward
    // input to hidden layer
    const inputMatrix = MatrixOperations.arrayToMatrix(input);

    const firstMultiply = MatrixOperations.matrixMultiply(this.inputWeigths, inputMatrix);
    const hiddenLayer = sigmoid(MatrixOperations.sum(firstMultiply, this.biasInputHidden));

    // hidden to output
    const seccondMultiply = MatrixOperations.matrixMultiply(this.hiddenWeigths, hiddenLayer);
    const output = sigmoid(MatrixOperations.sum(seccondMultiply, this.biasHiddenOutput));

    // backpropagation
    // output to hidden
    const expectedMatrix = MatrixOperations.arrayToMatrix(expected);
    const absoluteError = MatrixOperations.subtract(expectedMatrix, output);
    const outputDerivate = derivateSigmoid(output);
    const transposedHiddenLayer = MatrixOperations.transpose(hiddenLayer);

    let hiddenGradient = MatrixOperations.hadamard(absoluteError, outputDerivate);
    hiddenGradient = MatrixOperations.numberMultiply(hiddenGradient, this.learningRate);

    // adjust bias
    this.biasHiddenOutput = MatrixOperations.sum(this.biasHiddenOutput, hiddenGradient);

    // adjust weigths
    const deltaHiddenWeigths = MatrixOperations.matrixMultiply(hiddenGradient, transposedHiddenLayer);
    this.hiddenWeigths = MatrixOperations.sum(this.hiddenWeigths, deltaHiddenWeigths);

    // hidden to input
    const transposedHiddenWeigths = MatrixOperations.transpose(this.hiddenWeigths);
    const hiddenError = MatrixOperations.matrixMultiply(transposedHiddenWeigths, absoluteError);
    const hiddenDerivate = derivateSigmoid(hiddenLayer);
    const transposedInputLayer = MatrixOperations.transpose(inputMatrix);

    let inputGradient = MatrixOperations.hadamard(hiddenError, hiddenDerivate);
    inputGradient = MatrixOperations.numberMultiply(inputGradient, this.learningRate);

    // adjust bias
    this.biasInputHidden = MatrixOperations.sum(this.biasInputHidden, inputGradient);

    // adjust weigths
    const deltaInputWeigths = MatrixOperations.matrixMultiply(inputGradient, transposedInputLayer);
    this.inputWeigths = MatrixOperations.sum(this.inputWeigths, deltaInputWeigths);
  }
}

export default NeuralNetwork;
