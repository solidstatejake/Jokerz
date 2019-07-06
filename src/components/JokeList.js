import React, { Component } from 'react';
import Joke from "./Joke";

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
        <h1>Dad Jokes</h1>
        <div className='JokeList__jokes'>
          { jokes }
        </div>
      </div>
    );
  }
}

export default JokeList;