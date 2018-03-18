import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../../../components/Button'

import { CacheManager } from '../../../../utils'
import { USER } from '../../../../graphql/queries'

import './style.css'

export default class PersonalSettings extends Component {
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
                <span className="title">Личная информация</span>
                <div className="containers">

                    <div className="container-settings security-menu">
                        <div className="container-main personal">
                            <span className="personal-header">Эти данные смогут видеть все пользователи.</span>
                            <div className="form">
                                <div className="form-group">
                                    <input type="text" className="line-based" placeholder="Имя" />
                                    <input type="text" className="line-based" placeholder="Фамилия" />
                                </div>
                            </div>
                            <button className="regular personal-button">Сохранить</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}