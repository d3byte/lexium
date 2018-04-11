import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './style.css'

export const Gamebar = ({ task, currentTab, takenAttempts, attempts }) => (
    <div className="game-bar">
        <Link to={{ pathname: '/task/learn', state: { task, takenAttempts } }} className={'game ' + (currentTab === 'learn' ? 'active' : '')}>
            <span className="name">Выучи слова</span>
            <span className="attempts">Пройдено <b>{takenAttempts.learnWords + '/' + ((attempts || {}).learnWords)}</b></span>
            <div className="hint">
            <p>В этой игре вам предстоит познакомиться со словами, пользуясь карточками. Вы можете перевернуть карточку,
            кликнув на неё, таким образом показав аналог на другом
            языке</p>
            </div>
        </Link>
        <Link to={{ pathname: '/task/find', state: { task, takenAttempts } }} className={'game ' + (currentTab === 'find' ? 'active' : '')}>
            <span className="name">Найди пару</span>
            <span className="attempts">Пройдено <b>{takenAttempts.findPair + '/' + ((attempts || {}).findPair)}</b></span>
            <div className="hint">
            <p>В этой игре вам нужно искать слово на одном языке и его аналог на другом.
            Просто кликайте на карточку со словом и потом на карточку с предположительной парой</p>
            </div>
        </Link>
        <Link to={{ pathname: '/task/typein', state: { task, takenAttempts } }} className={'game ' + (currentTab === 'typein' ? 'active' : '')}>
            <span className="name">Введи слово</span>
            <span className="attempts">Пройдено <b>{takenAttempts.typeIn + '/' + ((attempts || {}).typeIn)}</b></span>
            <div className="hint">
            <p>Введите эквивалент предложенного слова на другом языке</p>
            </div>
        </Link>
        <Link to={{ pathname: '/task/scramble', state: { task, takenAttempts } }} className={'game ' + (currentTab === 'scramble' ? 'active' : '')}>
            <span className="name">Скрэмбл</span>
            <span className="attempts">Пройдено <b>{takenAttempts.scramble + '/' + ((attempts || {}).scramble)}</b></span>
            <div className="hint">
            <p>Составляйте целые слова из букв, разбросанных в случайном порядке. Просто перетягивайте
            части слова на подходящее, по вашему мнению, место и проверьте ваши знания</p>
            </div>
        </Link>
    </div>
)
