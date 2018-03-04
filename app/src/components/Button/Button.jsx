import React from 'react'
import './style.css'

const Button = ({ classNameProp, clickHandler, text }) => (
    <button className={classNameProp} onClick={clickHandler}>
        { text }
    </button>
)

export default Button