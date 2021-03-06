import React from 'react';
import PropTypes from "prop-types"
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from "../base"

class App extends React.Component {
  
  state = {
    fishes: { },
    order: { }
  };

  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount() {

    const { params } = this.props.match;
    //first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId);

    if(localStorageRef) {

      this.setState({ order : JSON.parse(localStorageRef)  }) //convirtiendo el string en objeto JSON.parse

    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate(){

    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))

  }

  componentWillUnmount(){
    
    base.removeBinding(this.ref)

  }

  addFish = fish => {
    //1. Take a copy of the exsisting state
    const fishes = { ...this.state.fishes };
    //2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    //3. Set the new fishes object to state
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  updateFish = (key ,  updatedFish) => {
    //1. take a copy of the current state
    const fishes = {...this.state.fishes};
    //2.  update that state
    fishes[key] = updatedFish;
    //3. Set that to state
    this.setState({ fishes })
  }

  deleteFish = (key) => {
    //1. take a copy of the state
    const fishes = { ...this.state.fishes }
    //2. remove the fish
    fishes[key] = null
    //3. update the state
    this.setState({ fishes })
  }

  addToOrder = (key) => {
    //1. take a copy of state
    const order =  { ...this.state.order  }
    //2 either add to teh oreder, or update the number in our order
    order[key] = order[key] +1 || 1;
    //3.call setState to update our state object
    this.setState({ order })

  }

  removeFromOrder = (key) => {

    const order = { ...this.state.order };

    delete order[key]

    this.setState({ order })

  }

  render() {
    return(
      <div className="catch-of-the-day" >
        <div className="menu" >
          <Header tagline="Fresh Seafood Market"  age={500}  />
          <ul className="fishes" >
             {Object.keys(this.state.fishes).map(key => (
               
              <Fish addToOrder={this.addToOrder}  key={key} index={key} details={this.state.fishes[key]} />  

            ))  }
          </ul>
        </div>
        <Order removeFromOrder={this.removeFromOrder}  fishes={this.state.fishes} order={this.state.order} />
        <Inventory
            deleteFish = {this.deleteFish}
            loadSampleFishes={this.loadSampleFishes}
            updateFish = {this.updateFish}
            addFish={this.addFish} 
            fishes={this.state.fishes}
            storeId = {this.props.match.params.storeId}
         />  
      </div>
    )
  }
}

export default App;