import {React,  Component}  from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table'


class AdminFilterOrders extends Component {

  constructor(){
    super();
    
    this.state = 
    {
      orders:[],
      administrator:JSON.parse(localStorage.getItem('username')),
      orderStatuses: ['PENDING','ACCEPTED','IN DELIVERY','DELIVERED','DECLINED'],
      statusSelected: ''
    };

  }

  componentDidMount = () => {
    axios.get("http://localhost:8080/restaurant/api/restaurantActions/viewRestaurantOrders", {
           params: {
               name: this.state.administrator,
           }
       })
    .then((response) => {
        var items = []
      for(var i=0; i< response.data.length; i++){
        var orderItem = response.data[i];
        console.log(orderItem)
        items.push(orderItem)
      }
      this.setState({orders:items})
    }); 
  }

  filterOrders(e) { 
    axios.get("http://localhost:8080/restaurant/api/restaurantActions/filterOrder", {
          params: {
              orderStatus:this.state.statusSelected,
              administrator:this.state.administrator
          }
      })
      .then((response) => {
        var items = []
      for(var i=0; i< response.data.length; i++){
        var orderItem = response.data[i];
        console.log(orderItem)
        items.push(orderItem)
      }
      this.setState({orders:items})
    })
    .catch((error) => alert("Invalid login credentials"));
 }

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
          <label htmlFor="itemName">Order Statuses</label>
             <div className="form-group col-md-6">                           
                 <select className="form-control" name="city" onChange={(e) => { this.setState({statusSelected: e.target.value})}}>                                      
                 {this.state.orderStatuses.map((item) => {
                    return (
                    <option key={item} value={item}>
                        {item}
                    </option>
                    )
                })}
                  </select>
                </div> 
                <button className="primary" onClick={(e) => this.filterOrders(e)}>Filter</button>             
                </div>
     

      </div>
    );
  }
}

export default AdminFilterOrders;