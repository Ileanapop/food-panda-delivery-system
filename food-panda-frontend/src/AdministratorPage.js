import React from "react";
import {Link} from "react-router-dom";
import "./App.css";
    
class AdministratorPage extends React.Component {
 
  render() {
    return (
      <div className="App">      
        <div className="input-group">
        <button className="primary"><Link to="/administrator/addRestaurant">Add restaurant</Link></button>          
         </div>
          <div className="input-group">
          <button className="primary"><Link to="/administrator/createMenu">Create Menu</Link></button> 
          </div>
          <div className="input-group">
          <button className="primary"><Link to="/administrator/viewMenu">View Menu</Link></button> 
          </div>
          <div className="input-group">
          <button className="primary"><Link to="/administrator/viewOrders">View Orders</Link></button> 
          </div>
          <div className="input-group">
          <button className="primary"><Link to="/administrator/filterOrders">Filter Orders</Link></button> 
          </div>
      </div>
    );
  }
}
    
export default AdministratorPage;