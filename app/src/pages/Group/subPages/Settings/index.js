import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../../../components/Button'

import { CacheManager } from '../../../../utils'
import { GROUP } from '../../../../graphql/queries'

import './style.css'

export default class Settings extends Component {
    constructor() {
      super()
      this.state = {
          user: []
      }
    }
  
    componentDidMount = () => {
      const { user } = this.props
      this.setState({ user })
    }


    render() {
        const user = this.state
        return (
          <div className="section group-subpage all-members">
            <div className="containers">
              <div className="table">
                
              </div>
            </div>
          </div>
        )
    }
}