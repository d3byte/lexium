import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'

import { SIGNUP } from '../graphql/mutations'

class Signup extends Component {
  render() {
    return (
      <div>

      </div>
    )
  }
}

export default graphql(SIGNUP)(Signup)