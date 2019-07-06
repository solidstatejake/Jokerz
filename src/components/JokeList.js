import React, { Component } from 'react';
import Joke from "./Joke";
import '../stylesheets/css/main.css'
const log = console.log;
const axios = require('axios');


class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };

  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    };
  }

  async componentDidMount() {
    let jokes = [];

    while (jokes.length < this.props.numJokesToGet) {
      const jokeResponse = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' }
      });
      const newJoke = jokeResponse.data.joke;
      jokes = [ ...jokes, newJoke ];
      log(jokes);
    }
    this.setState({ jokes })

  }


  render() {
    const jokes = this.state.jokes.map((joke) => {
      return <Joke joke={ joke }/>
    });
    return (
      <div className='JokeList'>
        <div className="JokeList__sidebar">

          <h1 className='JokeList__sidebar--title'>
            <span>Dad</span> Jokes
          </h1>
          <img className='JokeList__sidebar--img' src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt=""/>
          <button className='JokeList__button-fetch-jokes'>New Jokes</button>
        </div>
        <div className='JokeList__jokes'>
          { jokes }
        </div>
      </div>
    );
  }
}

export default JokeList;