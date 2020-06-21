import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FiCpu } from 'react-icons/fi';
import * as Yup from 'yup';
import { uuid } from 'uuidv4';

import NeuralNetwork from './classes/NeuralNet';

import Input from './components/Input';
import Button from './components/Button';
import Toast from './components/Toast';

import GlobalStyle from './global/globalStyles';
import { Header, Container, FormContainer, Form, ResultsTable, Background } from './styles';

interface ToastMessageProps {
  message: string;
  type: 'positive' | 'negative';
}

interface FormDataProps {
  numberOfInputs: number;
  numberOfNeurons: number;
  numberOfOutputs: number;
  iterations: number;
}

interface TrainingDataProps {
  inputs: number[][];
  outputs: number[][];
}

interface TrainChangeProps {
  input: number[];
  output: number[];
}

interface RunningDataProps {
  input: number[];
}

const App = () => {
  const [toastMessage, setToastMessage] = useState<ToastMessageProps>({} as ToastMessageProps);

  const [formData, setFormData] = useState<FormDataProps>({} as FormDataProps);
  const [trainChange, setTrainChange] = useState<TrainChangeProps>({} as TrainChangeProps);
  const [trainingData, setTrainingData] = useState<TrainingDataProps>({
    inputs: [],
    outputs: [],
  });
  const [trainedNet, setTrainedNet] = useState<NeuralNetwork>();

  const [runData, setRunData] = useState<RunningDataProps>({} as RunningDataProps);
  const [results, setResults] = useState<number[][]>([]);


  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: Number(value) })
  }

  function handleTrainChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const splittedValues = value.split(',')
    const splittedValuesAsNumbers = splittedValues.map(item => Number(item));

    setTrainChange({ ...trainChange, [name]: splittedValuesAsNumbers })
  }

  async function handlePushTrainingData(event: FormEvent) {
    try {
      event.preventDefault();

      const schema = Yup.object().shape({
        input: Yup.number().required('Required'),
        output: Yup.number().required('Required'),
      });

      await schema.validate(trainChange,{
        abortEarly: false,
      });

      const { input, output } = trainChange;

      const inputsArray = trainingData.inputs
      inputsArray.push(input);
      const outputsArray = trainingData.outputs
      outputsArray.push(output);

      setTrainingData({ inputs: inputsArray, outputs: outputsArray });
    } catch {
      alert('Erro')
    }
  }

  function clearTainData() {
    console.log(trainingData);
    setTrainingData({
      inputs: [],
      outputs: [],
    });
    console.log(trainingData);

  }

  async function handleTrain(event: FormEvent) {
    try {
      event.preventDefault();

      const schema = Yup.object().shape({
        numberOfInputs: Yup.number().required('Required'),
        numberOfNeurons: Yup.number().required('Required'),
        numberOfOutputs: Yup.number().required('Required'),
        iterations: Yup.number().required('Max 20000 iterations').max(20000),
      });

      await schema.validate(formData);

      const {
        numberOfInputs,
        numberOfNeurons,
        numberOfOutputs,
        iterations,
      } = formData;

      const neuralNet = new NeuralNetwork(numberOfInputs, numberOfNeurons, numberOfOutputs);

      for (let i = 0; i < iterations; i++) {
        let index = Math.floor(Math.random() * 4);
        neuralNet.train(trainingData.inputs[index], trainingData.outputs[index])
      }

      setToastMessage({ type: 'positive', message: 'Trained!' })
      setTimeout(() => {setToastMessage({ type: 'positive', message: '' })}, 4000);

      setTrainedNet(neuralNet);
    } catch {
      alert('Erro')
    }
  }

  function handleRunChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    const splittedValues = value.split(',')
    const splittedValuesAsNumbers = splittedValues.map(item => Number(item));

    setRunData({ ...runData, [name]: splittedValuesAsNumbers });
  }

  function handleRun(event: FormEvent) {
    event.preventDefault();

    if (!trainedNet) {
      setToastMessage({ type: 'negative', message: 'Train the net first!' })
      return setTimeout(() => {setToastMessage({ type: 'negative', message: '' })}, 4000);
    };

    const results = [
      trainedNet.run(runData.input),
    ]
    setResults(results);
  }

  return (
    <>
      <Header>
        <FiCpu size={30} color='#eee' />
        <h1>Neural Network Generator</h1>
      </Header>

      <Container>

        <FormContainer>
          <Form onSubmit={handlePushTrainingData} >
            <h2>Training Data</h2>

            <h3>Inputs</h3>
            <Input name="input" onChange={handleTrainChange} type="text"/>

            <h3>Outputs</h3>
            <Input name="output" onChange={handleTrainChange} type="text"/>

            <Button type='submit' classType='info' >Push</Button>
            <Button type='button' onClick={clearTainData} classType='delete' >Clear</Button>
          </Form>

          <div>
            <h4>Inputs</h4>
              {trainingData.inputs.map(item => (
                <p key={uuid()}>{item}</p>
              ))}
            <h4>Outputs</h4>
              {trainingData.outputs.map(item => (
                <p key={uuid()}>{item}</p>
              ))}
          </div>
        </FormContainer>

        <FormContainer>
          <Form onSubmit={handleTrain}>
            <div id='basic-info'>
              <h2>Paramters</h2>

              <h3>Number de inputs</h3>
              <Input name='numberOfInputs' onChange={handleInputChange} type="number"/>

              <h3>Hidden Layer Neurons</h3>
              <Input name='numberOfNeurons' onChange={handleInputChange} type="number"/>

              <h3>Number de outputs</h3>
              <Input name='numberOfOutputs' onChange={handleInputChange} type="number"/>

              <h3>Iterações</h3>
              <Input name='iterations' onChange={handleInputChange} type="number"/>
            </div>

            <Button type="submit" classType='info' >Train</Button>
          </Form>
        </FormContainer>

        <FormContainer>
          <Form onSubmit={handleRun} >
            <h2>Running Data</h2>

            <h3>Inputs</h3>
            <Input name="input" onChange={handleRunChange} type="text"/>

            <Button type='submit' classType='run' >Run</Button>
          </Form>

          <ResultsTable>
            <h2>Resultados:</h2>
            {results.map(result => (
              <h3 key={uuid()} >{result}</h3>
            ))}
          </ResultsTable>
        </FormContainer>

      </Container>

      {toastMessage.message && (
        < Toast message={toastMessage.message} type={toastMessage.type} />
      )}

      < Background />
      < GlobalStyle />
    </>
  );
}

export default App;
