import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../../../components/Button'

import { CacheManager } from '../../../../utils'
import { GROUP } from '../../../../graphql/queries'

import './style.css'

export const AllMembers = ({}) => (
    <div className="all-members">
        <div className="containers of-header">
            <div className="members-header">
                <div className="members-info head">Имя пользователя</div>
                <div className="members-info head">Пройдено заданий</div>
                <div className="members-info head">Вступил в группу</div>
                <div className="members-info head">Управление</div>
            </div>
        </div>

        <div className="containers of-allmembers">
            <div className="container of-allmembers">
                <div className="members-info name">Сергей Савтыра</div>
                <div className="members-info">8 заданий</div>
                <div className="members-info">23.02.2017</div>
                <div className="members-info editing">
                    <div className="members-info user-status">
                        <i className="material-icons super-user">done_all</i>
                    </div>
                    <div className="members-info user-remove">
                        <i className="material-icons">clear</i>
                    </div>
                </div>
            </div>

            <div className="container of-allmembers">
                <div className="members-info name">Никулин Дмитрий</div>
                <div className="members-info">5 заданий</div>
                <div className="members-info">23.02.2017</div>
                <div className="members-info editing">
                    <div className="members-info user-status">
                        <i className="material-icons super-user">done_all</i>
                    </div>
                    <div className="members-info user-remove">
                        <i className="material-icons">clear</i>
                    </div>
                </div>
            </div>

            <div className="container of-allmembers">
                <div className="members-info name">Константин Фаизов</div>
                <div className="members-info">0 заданий</div>
                <div className="members-info">23.02.2017</div>
                <div className="members-info editing">
                    <div className="members-info user-status">
                        <i className="material-icons user">done_all</i>
                    </div>
                    <div className="members-info user-remove">
                        <i className="material-icons">clear</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
)