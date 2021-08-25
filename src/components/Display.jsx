/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import './Display.css'

export default props => {
    return (
        <div className="display"> {props.value} </div> //props.value é o que vai ser exibido no display
    )
}