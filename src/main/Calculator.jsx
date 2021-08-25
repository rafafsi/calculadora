import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = { //clearMemory() vai restaurar esse estado
    displayValue: '0', // valor inicial do display
    clearDisplay: false, //vai ser true quando tiver q limpar
    operation: null, //vai armazenar a operação quando esta for digitada 
    values: [0, 0], //cada 0 representa um operando
    current: 0 //diz se no momento vc está manipulando o índice 0 ou 1 da array value
}

export default class Calculator extends Component {

    state = { ...initialState } //state agora é uma cópia do objeto initialState que está fora da função

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }


    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.current === 0) {   //se eu estiver manipulando o primeiro valor ainda e o setOperation for clicado
            this.setState({ operation, current: 1, clearDisplay: true }) //limpo o display e coloco o operation e o current pra trabalhar agora com segundo valor
        } else { //agora as regras pra quando eu já tiver mexendo no segundo valor (current=1)
            const equals = operation === '=' //defino o = pra ser equals
            const currentOperation = this.state.operation //defino a variável pra essa operação atual q está sendo executada. tem q fazer numa nova operação pq se rodar operation novamente, vai cair no primeiro if

            const values = [...this.state.operation] //spread pra armazenar em values tudo o que for colocado nessa currentOperation
            let result = ''
            try {
                result = parseInt(`${values[0]} ${currentOperation} ${values[1]}`) //sempre que uma operação for realizada, o valor vai ser armazenado no primeiro item
            } catch (e) {
                result = this.state.values[0]
            }
            values[0] = isNaN(result) ? values[0] : result
            values[1] = 0 //e o valor dois será liberado pra uma nova operação
            console.log(result) // Not a Number 

            this.setState({ //agora de fato mudando o estado do display
                displayValue: values[0], //vai aparecer o resultado da primeira operação
                operation: equals ? null : operation, //se o = for clicado, nenhuma outra operaçao vai ser feita; else: operation
                current: equals ? 0 : 1, //se o = for clicado, o valor a ser mexido vai ser o primeiro; else: vai ser o segundo valor
                clearDisplay: !equals, //limpar o display se for clicado algo diferente do =
                values 
            })
        }
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.toString().includes('.')) {
            return
        }
        //impede que haja mais de um ponto no número dado. o return é só para validação de que não vai acontecer nada qnd isso for acionado

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay //evita o zero à esquerda 
            || this.state.clearDisplay      //duas situações de display zerado: quando o número na tela for 0 ou quando o this.state.clearDisplay for true
        const currentValue = clearDisplay ? '' : this.state.displayValue //se o clearDisplay for true, nada acontece. else: pega o valor q tá atualmente no display
        const displayValue = currentValue + n //valor atual + o número acrescentado
        this.setState({ displayValue, clearDisplay: false }) // aqui de fato muto o state: colocando pra false quando um número for digitado

        if (n !== '.') { //agora trabalhando com os números de 0 a 9
            const i = this.state.current //pego o primeiro elemento da array values (o primeiro é o 0, o segundo é 1)
            const newValue = parseFloat(displayValue) //converte pra float o displayValue (currentValue + n)
            const values = [...this.state.values] //clonei o estado para que cada número seja adc ao mesmo número armazenado numa array values
            values[i] = newValue //se eu tiver no índice da array 0, coloco o newValue em 0. se no 1, newValue=array[1]
            this.setState({ values }) //values agora representa o valor de um índice da array
            console.log(values)
        }
    }



    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}></Display>
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}

/* -  será preciso fazer três funções/comportamentos:
    1) clearMemory() pro botão AC conseguir zerar a calculadora (apagar os números)
    2) addDigit() pra adicionar um dígito
    3) setOperation() definir qual operação deseja fazer

    - o this. dentro do render garante que o que será renderizado vai ser o que estiver dentro da função
    - o nome da variável pode ser o mesmo da função-comportamento, e serve para q a variável receba esse valor para ser
    utilizado posteriormente:
        const addDigit = n => this.addDigit(n)
        const setOperation = op => this.setOperation(op)
 ^ o trecho acima foi trocado pelo constructor
*/