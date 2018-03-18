import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../../../components/Button'

import { CacheManager } from '../../../../utils'
import { USER } from '../../../../graphql/queries'

import './style.css'

export default class AccountSettings extends Component {
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
                <span className="title">Аккаунт</span>
                <div className="containers">

                    <div className="container-settings">
                        <div className="avatar">
                            {
                            updatedAvatar && <span className="loading-status">Изображение загружено</span>
                            }
                            <input type="file" onChange={this.uploadImage} name="image" accept="image/*" />
                            {
                            user.avatarUrl || image ? 
                                <img src={image || user.avatarUrl} alt="user-avatar" /> :
                                <i className="material-icons">file_upload</i>
                            }
                        </div>
                        <div className="container-main">
                            <div className="form">
                                <div className="form-group">
                                    <label>Логин</label>
                                    <input type="text" className="line-based" placeholder={user && user.username} />
                                </div>
                                <div className="form-group">
                                    <label>Почта</label>
                                    <input type="text" className="line-based" placeholder={user && user.email} />
                                </div>
                            <Button clickHandler={() => console.log('Ура!')} classNameProp="regular lighter" text="Сохранить" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}