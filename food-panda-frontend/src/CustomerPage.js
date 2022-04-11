import React from "react";
import {Link} from "react-router-dom";
import "./App.css";
    
class CustomerPage extends React.Component {
 
  render() {
    return (
      <div className="App">      
        <div className="input-group">
        <button className="primary"><Link to="/customer/viewRestaurants">View Resturants</Link></button>          
         </div>
         <div className="input-group">
        <button className="primary"><Link to="/customer/viewOrders">View Orders</Link></button>          
         </div>
      </div>
    );
  }
}
    
export default CustomerPage;