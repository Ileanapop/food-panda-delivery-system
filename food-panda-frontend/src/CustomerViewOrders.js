import {React,  Component}  from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table'


class CustomerViewOrders extends Component {

  constructor(){
    super();
    
    this.state = 
    {
      orders:[],
      customerEmail:JSON.parse(localStorage.getItem('customerEmail')),
    };

  }

  componentDidMount = () => {
    axios.get("http://localhost:8080/restaurant/api/restaurantActions/viewCustomerOrders", {
           params: {
               email: this.state.customerEmail,
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

      </div>
    );
  }
}

export default CustomerViewOrders;