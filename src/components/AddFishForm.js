import React from"react"


class AddFishForm extends React.Component{

  nameRef = React.createRef()
  priceRef = React.createRef()
  statusRef = React.createRef()
  descRef = React.createRef()
  imageRef = React.createRef()



    createFish = (event) => {
      //1.  stop the form from submitting
      event.preventDefault()

      const fish = {
        name : this.nameRef.value.value,
        price : parseFloat(this.priceRef.value.value), // 1024
        status : this.statusRef.value.value,
        desc : this.descRef.value.value,
        image : this.imageRef.value.value
      }

      this.props.addFish(fish);
      //refresh the form
      event.currentTarget.reset();
    }

    render() {
      return(
       <form className="fish-edit"  onSubmit={this.createFish} >
          <input type="text" ref={this.nameRef}  name="name" placeholder="Name" />  
          <input type="text" ref={this.priceRef}  name="price" placeholder="Price" />
          <select name="status" ref={this.statusRef}  >
            <option value="available"> Fresh! </option>
            <option value="unavailable"> Sold Out! </option>            
          </select>
          <textarea type="text" ref={this.descRef}  name="desc" placeholder="Desc" />
          <input type="text" ref={this.imageRef}  name="image" placeholder="Image" />  
          <button type="submit"  >+ Add Fish</button>
       </form>
      )
    }
}

export default AddFishForm