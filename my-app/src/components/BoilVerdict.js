import React from 'react'

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

const toCelsius = fahrenheit => (fahrenheit - 32) * 5 / 9
const toFahrenheit = celsius => (celsius * 9 / 5) + 32

const tryConvert = (temperature, convert) => {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

const BoilingVerdict = (props) => {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {

  handleChange = (e) => {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature; // celsius or fahrenheit
    const scale = this.props.scale; //c or f
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
          onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: '',
      scale: 'c'
    }
  }

  handleCelsiusChange = (temperature) => {
    this.setState({ scale: 'c', temperature });
  }

  handleFahrenheitChange = (temperature) => {
    this.setState({ scale: 'f', temperature });
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

export default Calculator
