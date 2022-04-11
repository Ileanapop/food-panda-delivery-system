import {React,  Component}  from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table'
import {Link} from "react-router-dom";
import "./ViewRestaurants.css";
import { useTable, useRowSelect } from 'react-table'
import BTable from 'react-bootstrap/Table';
import { Navigate } from "react-router-dom";

class ViewRestaurants extends Component {

  constructor(){
    super();
    this.state = 
    {
      restaurants: [],
      restaurantsNames:[],
      isLoaded: 0, 
      hasSelectedRestaurant: 0,
      selectedRestaurant: ''
    };
 
  }



  componentDidMount = () => {
    this.selectedCheckboxes = new Set();
    axios.get("http://localhost:8080/restaurant/api/restaurantActions/getAllRestaurants")
    .then((response) => {
      for(var i=0; i< response.data.length; i++){
        var restaurant = response.data[i];      
        this.state.restaurants.push(restaurant);
        this.state.restaurantsNames.push(restaurant.name)  
      }
     //console.log(this.state.restaurants[0].name);
     this.setState({isLoaded:1})
    })
  }

  handleSelection(e) { 
    this.setState({hasSelectedRestaurant:1});
    console.log(this.state.selectedRestaurant);
    localStorage.setItem('selectedRestaurant', JSON.stringify(this.state.selectedRestaurant));
 }
  
  render() {

     if(this.state.hasSelectedRestaurant){
      return (<Navigate to={"/customer/viewMenu"}/>)
    }

    return (
        
      <div className="container" >

        <BTable striped bordered hover size="sm"  >
        <thead>
            <tr>
            <th>Name</th>
            <th>Location</th>
            <th>DeliveryZones</th>       
            </tr>
        </thead>
        <tbody>  
        {
               this.state.restaurants.map((item, index) => (
                <tr key = {index} > 
                    <td>{item.name}</td>
                    <td>{item.location}</td>
                    <td>{item.deliveryZones}</td>                                
                    
                </tr>
              ))
          }         
        </tbody>
        </BTable>
        
        <div className="input-group">
          <label htmlFor="itemName">View Menu For</label>
          <div className="form-group col-md-6">                           
          <select className="form-control" name="city" onChange={(e) => { this.setState({selectedRestaurant: e.target.value})}}>                                      
          {this.state.restaurantsNames.map((item) => {
                    return (
                    <option key={item} value={item}>
                        {item}
                    </option>
                    )
                })}
                  </select>
                </div>              
                </div>
            <button type="button" className="btn btn-primary" onClick={(e) => this.handleSelection(e)}>View Menu</button>
      </div>
    );
  }
}

export default ViewRestaurants;