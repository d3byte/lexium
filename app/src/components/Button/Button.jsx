import React from 'react'
import './style.css'

export const Button = ({ classNameProp, clickHandler, text }) => (
    <button className={classNameProp} onClick={clickHandler}>
        { text }
    </button>
)
