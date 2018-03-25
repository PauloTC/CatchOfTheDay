import React from 'react'
import PropTypes from 'prop-types'
class EditFishForm extends React.Component{

  static propTypes = {

    fish : propTypes.shape({
      image : propTypes.string,
      name : propTypes.string,
      desc : propTypes.string,
      status : propTypes.string,
      price : propTypes.number

    }),
    index : propTypes.string,
    updateFish : propTypes.func,
    deleteFish : propTypes.func,

  }

  handleChange = (event) => {

    console.log(event.currentTarget.name)
    //update that fish
    // 1. take a copy of the current fish

    const updateFish = { 
      ...this.props.fish,
      [event.currentTarget.name] : event.currentTarget.value   
    }
   this.props.updateFish(this.props.index, updateFish)

  }

  render() {

    return (

      <div className="fish-edit">
          <input type="text" name="name"  onChange={this.handleChange}  value={this.props.fish.name} />
          <input type="text" name="price"  onChange={this.handleChange}  value={this.props.fish.price} />
          <select  name="status" onChange={this.handleChange}  value={this.props.fish.status} >
            <option value="available"> Fresh! </option>
            <option value="unavailable"> Sold Out! </option>      
          </select>
          <textarea name="desc"  onChange={this.handleChange}  value={this.props.fish.desc} ></textarea>
          <input type="text" name="image"  onChange={this.handleChange}  value={this.props.fish.image} />
          <button onClick={() => this.props.deleteFish(this.props.index)} >Remove Fish</button>
      </div>

    )
  }
}

export default EditFishForm