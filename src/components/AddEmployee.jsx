import React, { Component } from 'react';


class AddEmployee extends Component {
  
  newEmployee()
  {
    
  }
  
  
  render() {
    return (
      <div className="NewEmployee">


        <div className="card addnew">
          <div className="card-body">
            <h5 className="card-title">First name</h5>
            <input placeholder="First Name" />
            <br />
            <h5 className="card-title">Last name</h5>
            <input placeholder="Last Name" />
            <br/>
            <h5 className="card-title">Title</h5>
            <input placeholder="Title" />
            <br />
            <h5 className="card-title">Salary</h5>
            <input placeholder="Salary" />
            <br/>
            <h5 className="card-title">Department</h5>
            <input placeholder="Department" />
            <br/>
            <button onClick={ this.newEmployee } class="btn btn-danger">Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddEmployee;