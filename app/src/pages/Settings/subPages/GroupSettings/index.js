import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../../../components/Button'
import MaterialSwitch from '../../../../components/MaterialSwitch'

import { CacheManager } from '../../../../utils'
import { USER } from '../../../../graphql/queries'

import './style.css'

export default class GroupSettings extends Component {
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
        const { user } = this.state
        return(
            <div className="account-subpage">
                <span className="title">Управление группами</span>
                <div className="containers">

                    <div className="container-settings security-menu">
                        <div className="container-main group-settings">
                        <MaterialSwitch titleProp="Показывать список групп другим пользователям" extraClasses='fullWidthSwitch'/>
                        <MaterialSwitch titleProp="Разрешать приглашать меня в группы" extraClasses='fullWidthSwitch'/>
                        <button className="regular personal-button">Сохранить</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}