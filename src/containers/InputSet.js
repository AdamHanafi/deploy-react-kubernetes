import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Input from '../components/Input'
import * as MoviesAction from '../actions'
import { bindActionCreators } from 'redux'

class InputSet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
    }

    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
  }

  // Function for when 'search' is clicked and retrieves movies
  handleResponse(input) {
    const { retrieveMovies } = this.props;
    // eslint-disable-next-line
    const result = retrieveMovies(input);
  }

  // Function for when text in input changes
  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  // Function for 'enter' key press
  handleKeyPress(target) {
    const { input } = this.state;
   if(target.charCode===13){
     this.handleResponse(input);
   }
 }

  render() {
    const { input } = this.state;
    return (
      <div className="input-set">
        <Input movieValue={input} handleChange={this.handleChange} handleKeyPress={this.handleKeyPress} handleResponse={this.handleResponse}/>
      </div>
    );
  }
}

// Set state and action as proptype
InputSet.propTypes = {
  movies: PropTypes.object,
  retrieveMovies: PropTypes.func
}

// Map Redux state to props
function mapStateToProps(state) {
  return {
    movies: state.movies
  };
}

// Map action to props
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, MoviesAction), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InputSet);
