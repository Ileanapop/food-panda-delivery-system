import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
  

class CreateMenuPage extends React.Component {

  constructor(){
    super();
    this.state = 
    {
      availableCategories:[],
      category: '',
      itemName: '',
      price:'',
      description:'',
      administrator:{
        username: JSON.parse(localStorage.getItem('username')),
        password: JSON.parse(localStorage.getItem('password'))
      },
    };
  }

  componentWillMount = () => { 
    this.selectedCheckboxes = new Set();
    axios.get("http://localhost:8080/restaurant/foodCategories/getAllCategories")
    .then((response) => {
      var items = [];
      for(var i=0; i< response.data.length; i++){
        var zone = response.data[i];
        items.push(zone);
      }
      this.setState({availableCategories: items});   
    })
  }
   
  handleAddFood(e) { 

    axios({
      url: 'http://localhost:8080/restaurant/api/restaurantActions/addFoods',
      method: "POST",
      headers: {'Content-type': 'application/json' },
  
      data: {    
      category: this.state.category,
      itemName: this.state.itemName,
      price:this.state.price,
      description:this.state.description,
      administrator:this.state.administrator.username}
    })  
      .then((res) => {alert("Item added successfully!") })
     
      .catch((err) => {
        let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
        alert(message)
       });
  }
    
  render() {
    return (
      <div className="App">
       
        <div className="input-group">
            <label htmlFor="itemName">Item Name</label>
            <input type="text" name="itemName"  onChange={(e) => { this.setState({itemName: e.target.value})}}/>
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <input type="text" name="description" onChange={(e) => { this.setState({description: e.target.value})}}/>
          </div>
          <div className="input-group">
            <label htmlFor="price">Price</label>
            <input type="text" name="price" onChange={(e) => { this.setState({price: e.target.value})}}/>
          </div>
        
          <div className="input-group">
          <label htmlFor="itemName">Category</label>
             <div className="form-group col-md-6">                           
                 <select className="form-control" name="city" onChange={(e) => { this.setState({category: e.target.value})}}>                                      
                 {this.state.availableCategories.map((item) => {
                    return (
                    <option key={item} value={item}>
                        {item}
                    </option>
                    )
                })}
                  </select>
                </div>              
                </div>
                                    
          <button className="primary" onClick={(e) => this.handleAddFood(e)}>Add Menu Item</button>
      </div>
    );
  }
}
    
export default CreateMenuPage;