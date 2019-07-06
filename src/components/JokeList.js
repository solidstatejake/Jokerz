import React, { Component } from 'react';
import Joke from "./Joke";

import '../stylesheets/css/main.css'

const uuid = require('uuid');

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

    this.handleVote = this.handleVote.bind(this);
  }

  async componentDidMount() {
    let jokes = [];

    while (jokes.length < this.props.numJokesToGet) {
      const jokeResponse = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' }
      });
      const newJoke = jokeResponse.data.joke;
      jokes.push({ id: uuid(), joke: newJoke, votes: 0 });
    }
    this.setState({ jokes })

  }

  handleVote(id, delta) {
    this.setState(currentState => ({
      jokes: currentState.jokes.map(joke => {
        return joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
      })
    }))
  }

  render() {
    const jokes = this.state.jokes.map((joke) => {
      return <Joke key={ joke.id }
                   id={ joke.id }
                   joke={ joke.joke }
                   votes={ joke.votes }
                   upvote={ () => this.handleVote(joke.id, 1) }
                   downvote={ () => this.handleVote(joke.id, -1) }
      />
    });
    return (
      <div className='JokeList'>
        <div className="JokeList__sidebar">

          <h1 className='JokeList__sidebar--title'>
            <span>Dad</span> Jokes
          </h1>

          <img className='JokeList__sidebar--img'
               src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
               alt=""/>

          <button className='JokeList__sidebar--button'>New Jokes</button>

        </div>
        <div className='JokeList__jokes'>
          <div className="JokeList__jokes--container">

            { jokes }
          </div>
        </div>
      </div>
    );
  }
}

export default JokeList;