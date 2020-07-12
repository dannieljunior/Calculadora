import React, { Component } from 'react';
import './Calculadora.css'

import Button from '../components/Button'
import Display from '../components/Display'


const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculadora extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.setDigit = this.setDigit.bind(this)
        this.setOperator = this.setOperator.bind(this)
        this.clear = this.clear.bind(this)
    }

    clear() {
        this.setState({ ...initialState })
    }

    setDigit(d) {

        if (d === '.' && this.state.displayValue === '0') {
            this.setState({ displayValue: '0.' })
            return
        }

        if (d === '.' && this.state.displayValue.includes(d)) {
            return
        }

        const clearDisplay = this.state.displayValue === '0' ||
            this.state.clearDisplay

        const currrentValue = clearDisplay ? '' : this.state.displayValue

        const displayValue = currrentValue + d

        this.setState({ displayValue: displayValue, clearDisplay: false })

        if (d !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }

    }

    setOperator(operation) {
        if(this.state.current === 0){
            this.setState({operation, current: 1, clearDisplay: true})
        } else{
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]

            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            }catch(e){
                values[0] = this.state.values[0]
            }

            values [1] = 0

            this.setState({
                displayValue: values[0], operation
                : equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals
            })
        }
    }

    render() {

        return (
            <div className="calculadora">
                <Display value={this.state.displayValue}></Display>
                <Button label="AC" click={this.clear} triple></Button>
                <Button label="/" click={this.setOperator} operation></Button>
                <Button label="7" click={this.setDigit}></Button>
                <Button label="8" click={this.setDigit}></Button>
                <Button label="9" click={this.setDigit}></Button>
                <Button label="*" click={this.setOperator} operation></Button>
                <Button label="4" click={this.setDigit}></Button>
                <Button label="5" click={this.setDigit}></Button>
                <Button label="6" click={this.setDigit}></Button>
                <Button label="-" click={this.setOperator} operation></Button>
                <Button label="1" click={this.setDigit}></Button>
                <Button label="2" click={this.setDigit}></Button>
                <Button label="3" click={this.setDigit}></Button>
                <Button label="+" click={this.setOperator} operation></Button>
                <Button label="0" click={this.setDigit} double></Button>
                <Button label="." click={this.setDigit}></Button>
                <Button label="=" click={this.setOperator} operation></Button>
            </div>
        )
    }
};

