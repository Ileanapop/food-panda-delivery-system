import {React,  Component}  from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table'
import Checkbox from './Checkbox';


class CustomerViewMenu extends Component {

  constructor(){
    super();
    //this.myExample= this.myExample.bind(this);
    this.state = 
    {
      menuItems:[],
      menuItemsNames:[],
      selectedRestaurant:JSON.parse(localStorage.getItem('selectedRestaurant')), 
      selectedFoods: [],
      selectedCheckboxes:[]
    };

  }

  componentDidMount = () => {
    this.setState({selectedCheckboxes:new Set()})
    axios.get("http://localhost:8080/restaurant/api/restaurantActions/viewRestaurantMenu", {
           params: {
               name: this.state.selectedRestaurant,
           }
       })
    .then((response) => {
        var items = []
      for(var i=0; i< response.data.length; i++){
        var menuItem = response.data[i];
        console.log(menuItem)
        items.push(menuItem)
        this.state.menuItemsNames.push(menuItem.itemName)
      }
      this.setState({menuItems:items})
    })
    
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();   
    console.log(localStorage.getItem('customerEmail'))
    console.log(this.state.selectedCheckboxes)
   // var f = []
   // for (const checkbox of this.state.selectedCheckboxes) {
   //   console.log(checkbox, 'is selected.');
    //  f.push(checkbox);
   //   console.log(f)
   // }
   // this.setState({selectedFoods:f});
    console.log(this.state.selectedFoods)
    
    axios({
  
      url: 'http://localhost:8080/restaurant/customer/createOrder',
      method: "POST",
      headers: {'Content-type': 'application/json' },
  
      data: {
        restaurant:JSON.parse(localStorage.getItem('selectedRestaurant')),
        customer: JSON.parse(localStorage.getItem('customerEmail')),
        foods: this.state.selectedFoods
        },
    })  
      .then((res) => {alert("Order was placed successfully") })
     
      .catch((err) => {
        let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
        alert(message)
       });
  }

  toggleCheckbox = label => {
    if (this.state.selectedCheckboxes.has(label)) {
      this.state.selectedCheckboxes.delete(label);
      var array = [...this.state.selectedFoods];
      var index = array.indexOf(label)
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({selectedFoods: array});
      }
    } else {
      this.state.selectedCheckboxes.add(label);
      this.state.selectedFoods.push(label);
    }
    console.log(this.state.selectedFoods)
  }

  createCheckbox = label => (
    <Checkbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
  )

  createCheckboxes = () => (
    this.state.menuItemsNames.map(this.createCheckbox)
  )

  render() {
    return (
      <div className="container">

        <Table striped bordered hover size="sm">
        <thead>
            <tr>
            <th>Menu Item Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            </tr>
        </thead>
        <tbody>
          {
               this.state.menuItems.map((item, index) => (
                <tr key = {index}> 
                    <td>{item.itemName}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                </tr>
              ))
          }
        </tbody>
        </Table>

        <div className="input-group">
                <label htmlFor="usernamme">Add Food to Cart</label>              
          </div>
        <div className="row">
        <div className="col-sm-12">
            <form onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
              <button className="btn btn-primary" type="submit">Order</button>
            </form>

          </div>
        </div>

      </div>
    );
  }
}

export default CustomerViewMenu;