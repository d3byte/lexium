import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../../../components/Button'

import { CacheManager } from '../../../../utils'
import { USER } from '../../../../graphql/queries'

import './style.css'

export default class SecuritySettings extends Component {
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
        const { user, image, updatedAvatar } = this.state
        return(
            <div className="account-subpage">
                <span className="title">Безопасность</span>
                <div className="containers">

                    <div className="container-settings security-menu">
                        <div className="container-main">
                            <div className="form">
                                <div className="form-group">
                                    <label>Введите старый пароль</label>
                                    <input type="text" className="line-based" placeholder="Пароль" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}