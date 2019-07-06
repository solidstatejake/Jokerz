import React, { Component } from 'react';
import Joke from "./Joke";

import '../stylesheets/css/main.css'

const uuid = require('uuid');

const axios = require('axios');


class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };

  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem('jokes') || "[]"),
      loading: false
    };

    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) this.initializeJokes();
  }

  async initializeJokes() {
    let jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      const jokeResponse = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' }
      });
      const newJoke = jokeResponse.data.joke;
      jokes.push({ id: uuid(), joke: newJoke, votes: 0 });
    }
    this.setState({ jokes });
    window.localStorage.setItem(
      "jokes",
      JSON.stringify(jokes)
    );
  }

  async grabJokes() {
    let jokeResponse;
    this.setState({ loading: true });
    do {
      jokeResponse = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' }
      });

    } while (this.state.jokes.some((joke) => {
      return joke.joke === jokeResponse.data.joke;
    }));

    const newJoke = { id: uuid(), joke: jokeResponse.data.joke, votes: 0 };
    this.setState({
        jokes: [ newJoke, ...this.state.jokes ],
        loading: false
      },
      () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    )
  }

  handleVote(id, delta) {
    this.setState(currentState => ({
        jokes: currentState.jokes.map(joke => {
          return joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
        })
      }),
      () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    )
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="loading-spinner">
          <h1 className='JokeList__sidebar--title'>Loading...</h1>
        </div>
      )
    }

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

          <button className='JokeList__sidebar--button'
                  onClick={ () => this.grabJokes() }>New Jokes
          </button>

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