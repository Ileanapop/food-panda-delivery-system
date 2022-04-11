import {React,  Component}  from 'react';
import Checkbox from './Checkbox';
import axios from "axios";


class AddRestaurant extends Component {

  constructor(){
    super();
    this.state = 
    {
      availableDeliveryZones: [],
      name:'',
      location:'',
      administrator:{
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
      },
      selectedDeliveryZones: []
    };
  }

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
    axios.get("http://localhost:8080/restaurant/deliveryZones/getZones")
    .then((response) => {
      var items = [];
      for(var i=0; i< response.data.length; i++){
        var zone = response.data[i];
        items.push(zone);
      }
      this.setState({availableDeliveryZones: items});   
    })
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();   
    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected.');
      this.state.selectedDeliveryZones.push(checkbox);
    }
    console.log(this.state.selectedDeliveryZones)
    console.log(this.state.administrator);
    console.log(this.state.name)

    axios({
  
      url: 'http://localhost:8080/restaurant/api/restaurantActions/addRestaurant',
      method: "POST",
      headers: {'Content-type': 'application/json' },
  
      data: {
        name:this.state.name,
        location:this.state.location,
        administrator:{
          username: JSON.parse(localStorage.getItem('username')),
          password: JSON.parse(localStorage.getItem('password'))
        },
        deliveryZones: this.state.selectedDeliveryZones},
    })  
      .then((res) => {alert("Restaurant was added successfully") })
     
      .catch((err) => {
        let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
        alert(message)
       });
  }

  createCheckbox = label => (
    <Checkbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
  )

  createCheckboxes = () => (
    this.state.availableDeliveryZones.map(this.createCheckbox)
  )

  render() {
    return (
      <div className="container">

    <div className="input-group">
                <label htmlFor="usernamme">New Restaurant Name</label>
                <input type="text" name="newRestaurant"  onChange={(e) => { this.setState({name: e.target.value})}}/>
          </div>
          <div className="input-group">
            <label htmlFor="username">Location</label>
            <input type="text" name="location" onChange={(e) => { this.setState({location: e.target.value})}}/>
          </div>
          <div className="input-group">
                <label htmlFor="usernamme">Select Delivery Zones</label>              
          </div>
        <div className="row">
          <div className="col-sm-12">
            <form onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
              <button className="btn btn-default" type="submit">Save</button>
            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default AddRestaurant;