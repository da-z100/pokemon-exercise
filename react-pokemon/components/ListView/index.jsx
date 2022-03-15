import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import { ListItemDisplay, ListItemTitle, LoadingBar } from './styled';

class ListView extends Component {
  loadingElementRef = null;

  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      offset: 0,
      limit: 20,
      search: "",
      isLoading: false,
      isFetchable: true
    };

    this.fetchPokemon = this.fetchPokemon.bind(this);
    this.debouncedSearch = this.debouncedSearch.bind(this);
    this.onChange = this.onChange.bind(this);

    this.observer = React.createRef();
  }

  componentDidMount() {
    this.fetchPokemon();

    this.loadingElementRef = (node) => {
      if (this.observer.current) this.observer.current.disconnect();
      this.observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (this.state.isLoading) return;

          this.fetchPokemon(false);
        }
      });
      if (node) this.observer.current.observe(node);
    }
  }

  shouldComponentUpdate(nextProps, nextState){
      if (this.state.search !== nextState.search) {
        return false;
      }
    return true;
  }

  async fetchPokemon(init = true) {
    // your code here
    try {
      const { limit, offset, search, pokemon, isFetchable } = this.state;

      if (!isFetchable) return false;

      this.setState({
        isLoading: true
      });

      const offsetVal = init ? offset : this.state.pokemon.length;

      const response = await fetch(`http://localhost:8080/pokemon?limit=${limit}&offset=${offsetVal}&search=${search}`);
      const result = await response.json();
  
      this.setState({
        pokemon: init ? result : [...pokemon, ...result],
        isFetchable: result.length === limit,
        isLoading: false
      })
    } catch (e) {
      console.log(e);
    }
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
    const { pokemon, isFetchable } = this.state;
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
        {isFetchable && <LoadingBar ref={this.loadingElementRef} />}
      </Flexbox>
    )
  }
}

export default ListView;
