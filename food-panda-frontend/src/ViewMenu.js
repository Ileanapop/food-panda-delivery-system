import {React,  Component}  from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table'


class ViewMenu extends Component {

  constructor(){
    super();
    //this.myExample= this.myExample.bind(this);
    this.state = 
    {
      menuItemsNames: [],
      menuItemsDescription: [],
      menuItemsPrice: [],
      menuItemsCategory: [],
      menuItems:[],
      administrator:JSON.parse(localStorage.getItem('username')),
      count:0
    };

  }

  componentDidMount = () => {
    this.selectedCheckboxes = new Set();
    axios.get("http://localhost:8080/restaurant/api/restaurantActions/viewAllMenuItems", {
           params: {
               username: this.state.administrator,
           }
       })
    .then((response) => {
        var items = [];
      for(var i=0; i< response.data.length; i++){
        var menuItem = response.data[i];
        items.push(menuItem);
        this.state.menuItemsNames.push(menuItem.itemName);
        this.state.menuItemsDescription.push(menuItem.description);
        this.state.menuItemsPrice.push(menuItem.price);
        this.state.menuItemsCategory.push(menuItem.category);
        this.state.menuItems.push(menuItem)  
      }
     console.log(this.state.menuItemsCategory);
     console.log(this.state.menuItemsDescription);
     console.log(this.state.menuItemsNames);
     console.log(this.state.menuItemsPrice);
     this.setState({count:this.state.menuItemsNames.legth})
     this.setState({menuItems:items})
    })
  }

   customizedRow() {
    let myArray = []
    for(let i = 0; i<this.state.count;i++) {
        myArray.push(<tr>
            <td>{this.state.menuItemsNames[i]}</td>
            <td>{this.state.menuItemsDescription[i]}</td>
            <td>{this.state.menuItemsPrice[i]}</td>
            <td>{this.state.menuItemsCategory[i]}</td>
        </tr>)
    } 

    return myArray
}

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
        
      </div>
    );
  }
}

export default ViewMenu;