import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../../../components/Button'
import MaterialSwitch from '../../../../components/MaterialSwitch'

import { CacheManager } from '../../../../utils'
import { USER } from '../../../../graphql/queries'

import './style.css'

export default class SubsrciptionSettings extends Component {
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
                <span className="title">Подписка</span>
                <div className="containers">

                    <div className="container-settings security-menu">
                        <div className="container-main subscription-settings">
                        <span className="subscription-main">Подписка истекает</span>
                        <span className="subscription-date">23/02/18</span>
                        <span className="subscription-main">через 6 дней</span>
                        <button className="regular personal-button">Продлить</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}