import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../components/Button'

import { CacheManager } from '../../utils'
import { GROUP } from '../../graphql/queries'

import './style.css'

export const TaskList = ({}) => (
    <div className="containers task-list">
        <div className="container of-task">
            <div className="info">
                <p className="name">Test</p>
                <p className="task-info">Пар слов: <b>2</b></p>
                <p className="task-info">Пройдено раз: <b>3</b></p>
                <p className="lightest">Создано: 08.03.2018</p>
            </div>
        </div>
    </div>
)