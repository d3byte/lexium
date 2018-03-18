import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../../../components/Button'

import { CacheManager } from '../../../../utils'
import { USER } from '../../../../graphql/queries'

import './style.css'

export default class SettingsMenu extends Component {
    constructor(){
        super()
        this.state = {
            user: {},
            image: ''
        }
    }

    componentDidMount = () => {
        const { user } = this.props
        this.setState({ user })
    }

    render(){
        const user = this.state
        return(
            <div className="menu-subpage container">
                <span className="menu-header">Настройки</span>
                <div className="menu-setting-list">
                    <span className="menu-setting">Аккаунт</span>
                    <span className="menu-setting">Безопасность</span>
                    <span className="menu-setting">Личная информация</span>
                    <span className="menu-setting">Управление группами</span>
                    <span className="menu-setting">Подписка</span>
                </div>
          </div>
        )
    }
}