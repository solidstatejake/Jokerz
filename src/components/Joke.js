import React, { Component } from 'react';

class Joke extends Component {

 render() {
  return (
   <div className='Joke'>
    <p className='Joke__text'>{this.props.joke}</p>
   </div>
  );
 }
}

export default Joke;