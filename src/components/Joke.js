import React, { Component } from 'react';

class Joke extends Component {

  getColor() {
    if (this.props.votes >= 16) {
      return "#4caf50";
    }
    else if (this.props.votes >= 12) {
      return "#8bc34a";
    }
    else if (this.props.votes >= 8) {
      return "#cddc39";
    }
    else if (this.props.votes >= 4) {
      return "#ffeb3b";
    }
    else if (this.props.votes <= -16) {
      return "#f44336";
    }
    else if (this.props.votes <= -12) {
      return "#ff7200";
    }
    else if (this.props.votes <= -8) {
      return "#ff9800";

    }
    else if (this.props.votes <= -4) {
      return "#ffc107";
    }
    else {
      return "#000";
    }
  }

  getEmoji() {
    if (this.props.votes >= 16) {
      return "em-rolling_on_the_floor_laughing";
    }
    else if (this.props.votes >= 12) {
      return "em-joy";
    }
    else if (this.props.votes >= 8) {
      return "em-laughing";
    }
    else if (this.props.votes >= 4) {
      return "em-grin";
    }
    else if (this.props.votes <= -16) {
      return "em-face_vomiting";
    }
    else if (this.props.votes <= -12) {
      return "em-angry";
    }
    else if (this.props.votes <= -8) {
      return "em-fearful";
    }
    else if (this.props.votes <= -4) {
      return "em-neutral_face";
    }
    else {
      return "em-thinking_face";
    }
  }

  render() {
    return (
      <div className='Joke'>

        <div className="Joke__button--container">
          <i className="Joke__button--upvote fa fa-arrow-up"
             onClick={ this.props.upvote }></i>
          <span className='Joke__button--text'
                style={ { borderColor: this.getColor() } }>{ this.props.votes }</span>
          <i className="Joke__button--downvote fa fa-arrow-down"
             onClick={ this.props.downvote }></i>
        </div>

        <div className="Joke__text--container">

          <p className='Joke__text'>{ this.props.joke }</p>

        </div>
        <div className="Joke__emoji--container">
          <i className={ `Joke__emoji em ${this.getEmoji()}` }></i>

        </div>
      </div>
    );
  }
}


/*
 <i className="em em-rolling_on_the_floor_laughing"></i>
 <i className="em em-joy"></i>
 <i className="em  em-laughing"></i>
 <i className="em em-grin"></i>

 <i className="em em-neutral_face"></i>
 <i className="em em-face_with_rolling_eyes"></i>
 <i className="em em-frowning"></i>
 <i className="em em-scream"></i>
 */
export default Joke;