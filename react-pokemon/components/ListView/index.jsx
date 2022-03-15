import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import { ListItemDisplay, ListItemTitle } from './styled';

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      offset: 0,
      limit: 20,
      search: ""
    };

    this.fetchPokemon = this.fetchPokemon.bind(this);
    this.debouncedSearch = this.debouncedSearch.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.fetchPokemon();
  }

  shouldComponentUpdate(nextProps, nextState){
      if (this.state.search !== nextState.search) {
        return false;
      }
    return true;
  }

  async fetchPokemon(init = true) {
    // your code here
    const { limit, offset, search } = this.state;
    const response = await fetch(`http://localhost:8080/pokemon?limit=${limit}&offset=${offset}&search=${search}`);
    const result = await response.json();
    console.log(result);
    this.setState({
      pokemon: result
    })
  }

  debouncedSearch(func, wait) {
    // your code here
    let timer;
    const that = this;

    return function (e) {
      that.setState({ search: e.target.value });

      const runAfterTime = () => {
        timer = null;
        func(e)
      }

      clearTimeout(timer);
      timer = setTimeout(runAfterTime, wait)
    }
  }

  onChange(e) {
    // your code here
    this.fetchPokemon();
  }

  render() {
    const { pokemon } = this.state;
    return (
      <Flexbox flexDirection='column' alignItems='center' width='100vw'>
        <Flexbox width='250px' marginTop='13px'>
          <input onChange={this.debouncedSearch(this.onChange, 250)} placeholder="Search for a Pokémon!"/>
        </Flexbox>
        <Flexbox marginTop='15px' padding='0px 10vw'>
          <Flexbox flexWrap='wrap'>
          {pokemon.map(entry => {
                return (
                  <ListItemDisplay key={entry._id}>
                    <Flexbox key={entry.name} flexDirection='column'>
                      <ListItemTitle>{entry.name}</ListItemTitle>
                      <img src={entry.image} />
                    </Flexbox>
                  </ListItemDisplay>
                )
              })
            }
          </Flexbox>
        </Flexbox>
      </Flexbox>
    )
  }
}

export default ListView;
