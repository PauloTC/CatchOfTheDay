import React from 'react';
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

  componentDidMount() {

    const { params } = this.props.match;

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
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

  addToOrder = (key) => {
    //1. take a copy of state
    const order =  { ...this.state.order  }
    //2 either add to teh oreder, or update the number in our order
    order[key] = order[key] +1 || 1;
    //3.call setState to update our state object
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
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory loadSampleFishes={this.loadSampleFishes}  addFish={this.addFish}  />  
      </div>
    )
  }
}

export default App;