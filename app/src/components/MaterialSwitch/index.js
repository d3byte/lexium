import React from 'react'
import './style.css'

const MaterialSwitch = ({ titleProp, changeHandler, addClasses}) => (
    <span className={'title switch ' + addClasses}>
            {titleProp}
            <div className="switch">
              <label>
                <input type="checkbox" onChange={changeHandler} />
                <span className="lever"></span>
              </label>
            </div>
          </span>
)

export default MaterialSwitch