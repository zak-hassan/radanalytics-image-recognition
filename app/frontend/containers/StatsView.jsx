import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Stats from "../components/Stats.jsx";
import ResultHistory from "../components/ResultHistory.jsx";
import { getStats } from "../actions/statsActions";

class StatsView extends Component {

  static get propTypes() {
    return {
      numRes: PropTypes.number,
      timeTaken: PropTypes.string,
      dateLastRes: PropTypes.string,
      getStatsData: PropTypes.func,
      results: PropTypes.array,
    }
  }

  componentWillMount() {
    this.props.getStatsData();
    this.interval= setInterval(() => this.props.getStatsData(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="StatsView">
        <Stats numRes={this.props.numRes} timeTaken={this.props.timeTaken} dateLastRes={this.props.dateLastRes}/>
        <ResultHistory results={this.props.results}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    numRes: state.statsReducer.numRes,
    timeTaken: state.statsReducer.timeTaken,
    dateLastRes: state.statsReducer.dateLastRes,
    results: state.statsReducer.resultsHistory,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      getStatsData:() => {
          dispatch(getStats())
      }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StatsView);
