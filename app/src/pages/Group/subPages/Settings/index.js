import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../../../components/Button'

import { CacheManager } from '../../../../utils'
import { GROUP } from '../../../../graphql/queries'

import './style.css'

class Settings extends Component {
    constructor(props) {
      super(props)
      this.state = {
          group: props.group,
      }
      this.client = props.client
    }

    render() {
        const { group } = this.state
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

export default withApollo(Settings)