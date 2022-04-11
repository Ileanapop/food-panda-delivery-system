import {React,  Component}  from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table'
import Checkbox from './Checkbox';


class AdminViewOrders extends Component {

  constructor(){
    super();
    
    this.state = 
    {
      orders:[],
      ordersIds:[],
      administrator:JSON.parse(localStorage.getItem('username')),
      selectedOrders: [],
      selectedCheckboxes:[],
      accept:0,
      decline:0
    };

  }

  componentDidMount = () => {
    this.setState({selectedCheckboxes:new Set()})
    axios.get("http://localhost:8080/restaurant/api/restaurantActions/viewRestaurantOrders", {
           params: {
               name: this.state.administrator,
           }
       })
    .then((response) => {
        var items = []
       // var itemsIds = []
      for(var i=0; i< response.data.length; i++){
        var orderItem = response.data[i];
        console.log(orderItem)
        items.push(orderItem)
       // itemsIds.push(orderItem.id.toString())
      }
      this.setState({orders:items})
      //this.setState({ordersIds:itemsIds})
    });

    axios.get("http://localhost:8080/restaurant/api/restaurantActions/viewRestaurantPendingOrders", {
           params: {
               name: this.state.administrator,
           }
       })
    .then((response) => {  
        var itemsIds = []
      for(var i=0; i< response.data.length; i++){
        var orderItem = response.data[i];
        itemsIds.push(orderItem.id.toString())
      }
      this.setState({ordersIds:itemsIds})
    })
    
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();   
    console.log(this.state.accept)
    axios({
  
        url: 'http://localhost:8080/restaurant/api/restaurantActions/acceptOrders',
        method: "PUT",
        headers: {'Content-type': 'application/json' },
    
        data: {
            ordersIds: this.state.selectedOrders
          },
      })  
        .then((res) => {alert("Orders were accepted successfully") })
       
        .catch((err) => {
          let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
          alert(message)
         });
    this.setState({accept:1})
    window.location.reload();
  }

  handleAccept(e) { 
    console.log(this.state.accept)
    axios({
  
        url: 'http://localhost:8080/restaurant/api/restaurantActions/acceptOrders',
        method: "PUT",
        headers: {'Content-type': 'application/json' },
    
        data: {
            ordersIds: this.state.selectedOrders
          },
      })  
        .then((res) => {alert("Orders were accepted successfully") })
       
        .catch((err) => {
          let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
          alert(message)
         });
    this.setState({accept:1})
  }

  toggleCheckbox = label => {
    if (this.state.selectedCheckboxes.has(label)) {
      this.state.selectedCheckboxes.delete(label);
      var array = [...this.state.selectedOrders];
      var index = array.indexOf(label)
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({selectedOrders: array});
      }
    } else {
      this.state.selectedCheckboxes.add(label);
      this.state.selectedOrders.push(label);
    }
    console.log(this.state.selectedOrders)
  }

  createCheckbox = label => (
    <Checkbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
  )

  createCheckboxes = () => (
    this.state.ordersIds.map(this.createCheckbox)
  )

  

  render() {
    return (
      <div className="container">

        <Table striped bordered hover size="sm">
        <thead>
            <tr>
            <th>ID Order</th>
            <th>Customer Name</th>
            <th>Status</th>      
            </tr>
        </thead>
        <tbody>
          {
               this.state.orders.map((item, index) => (
                <tr key = {index}> 
                    <td>{item.id}</td>
                    <td>{item.customer}</td>
                    <td>{item.status}</td>                   
                </tr>
              ))
          }
        </tbody>
        </Table>

        <div className="input-group">
                <label htmlFor="usernamme">Select ids of the orders to be accepted/declined</label>              
         
        <div className="row">
        <div className="col-sm-12">
            <form onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
              <button className="btn btn-primary">Accept Orders</button>
              <button className="btn btn-primary">Decline Orders</button>
            </form>

          </div>
        </div>
        </div>

      </div>
    );
  }
}

export default AdminViewOrders;