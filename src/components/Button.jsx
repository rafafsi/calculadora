/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import './Button.css'

export default props =>
    <button className={`
        button
        ${props.operation ? 'operation' : ' '} 
        ${props.double ? 'double' : ' '}
        ${props.triple ? 'triple' : ' '}
    `}
        onClick={e => props.click && props.click(props.label)}>
        {props.label}
    </button>

/* - quanto mais criar componente sem estado, melhor vai ser a aplicação.
   - TEMPLATE STRING: são strings que permitem expressões embutidas. { `template string em js` }
   - sempre que tem uma expressão chave dentro de um jsx, dentro dela eu consigo colocar PURE JS CODE.
   - em js, ${ interpolação de alguma variável }
   - é uma exibição condicional de classe que condiciona funcionalidades à classe 
   - pode ser feito dentro do corpo da função => {
       let classes = 'button '
       classes += props.operation ? 'operation' : ' '
       classes += props.double ? 'double' : ' '
       classes += props.triple ? 'triple' : ' '
   }
    return (
        <button className={classes}>
            {props.value}
        </button>
    )
   

    - o onClick recebeu o e.target.innerHTML porque eu quero que o clique no botão retorne seu valor
    - props.click(e.target.innerHTML) === props.click(props.label)
    - props.click foi duplicado para garantir que a função só seja chamada quando a primeira for verdadeira
   */