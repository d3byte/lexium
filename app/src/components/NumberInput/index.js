import React from 'react'

import './style.css'

export const NumberInput = ({ value, field, handler }) => (
    <div className="number-input">
        <div className="controller" onClick={() => handler(value - 1, field)}>-</div>
        <span className="value">{value}</span>
        <div className="controller" onClick={() => handler(value + 1, field)}>+</div>
    </div>
)
