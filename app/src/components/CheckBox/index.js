import React from 'react'

import './style.css'

export const CheckBox = ({ label, name, value, iconType, handler }) => (
    <label className="lexium-radio">
        <input type="radio" name={name} value={value} onChange={handler} />
        <div className="input">
            <i className="material-icons">
                {iconType === 'double' ? 'done_all' : 'done'}
            </i>
        </div>
        <span>{label}</span>
    </label>
)

