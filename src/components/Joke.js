import React, { Component } from 'react';

class Joke extends Component {

  render() {
    return (
      <div className='Joke'>

        <div className="Joke__button--container">
          <p className='Joke__button--text' onClick={this.props.upvote}>UP</p>
          <span className='Joke__button--text'>{ this.props.votes }</span>
          <p className='Joke__button--text' onClick={this.props.downvote}>DN</p>
        </div>

        <div className="Joke__text--container">

          <p className='Joke__text'>{ this.props.joke }</p>

        </div>

      </div>
    );
  }
}

export default Joke;