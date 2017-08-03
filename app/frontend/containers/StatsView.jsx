import React, { Component } from 'react'

import Stats from '../components/Stats.jsx'
import ResultHistory from '../components/ResultHistory.jsx'

class StatsView extends Component {

  render() {
    return(
      <div className="StatsView">
        <Stats/>
        <ResultHistory/>
      </div>
    )
  }
}

export default StatsView
