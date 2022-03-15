import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import { ListItemDisplay, ListItemTitle, LoadingBar, SearchInput, SaveButton, RemoveButton, SavedText } from './styled';

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
      isFetchable: true,
      savedItems: localStorage.getItem("savedItems") ? JSON.parse(localStorage.getItem("savedItems")) : [],
      removedItems: localStorage.getItem("removedItems") ? JSON.parse(localStorage.getItem("removedItems")) : []
    };

    this.fetchPokemon = this.fetchPokemon.bind(this);
    this.debouncedSearch = this.debouncedSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.removeItem = this.removeItem.bind(this);

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
      that.setState({ 
        search: e.target.value,
        isFetchable: true
      });

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

  saveItem(id) {
    localStorage.setItem("savedItems", JSON.stringify([...this.state.savedItems, id]));
    this.setState({
      savedItems: [...this.state.savedItems, id]
    })
  }

  removeItem(id) {
    localStorage.setItem("removedItems", JSON.stringify([...this.state.removedItems, id]));
    this.setState({
      removedItems: [...this.state.removedItems, id]
    })
  }

  render() {
    const { pokemon, isFetchable, removedItems, savedItems } = this.state;
    return (
      <Flexbox flexDirection='column' alignItems='center' width='100vw'>
        <Flexbox width='250px' marginTop='13px'>
          <SearchInput onChange={this.debouncedSearch(this.onChange, 250)} placeholder="Search for a Pokémon!"/>
        </Flexbox>
        <Flexbox marginTop='15px' padding='0px 10vw'>
          <Flexbox flexWrap='wrap'>
          {pokemon
            .filter(entry => removedItems.find(id => id === entry._id) === undefined)
            .map(entry => {
                return (
                  <ListItemDisplay key={entry._id}>
                    <Flexbox key={entry.name} flexDirection='column' justifyContent='center'>
                      <img src={entry.image} />
                      <ListItemTitle>{entry.name}</ListItemTitle>
                      <Flexbox justifyContent='space-between'>
                        {savedItems.find(id => id === entry._id) ? (
                          <SavedText>Saved</SavedText>
                        ) : (
                          <>
                            <SaveButton onClick={() => this.saveItem(entry._id)}>Save</SaveButton>
                            <RemoveButton onClick={() => this.removeItem(entry._id)}>Remove</RemoveButton>
                          </>
                        )}
                      </Flexbox>
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
