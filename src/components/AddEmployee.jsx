import React, { Component } from 'react';
import { newEmployee } from '../actions';
import { connect } from 'react-redux';

class AddEmployee extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      title: "",
      salary: "",
      department: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.newEmployee = this.newEmployee.bind(this);
  }  
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  
  
  newEmployee()
  {
      
      const forms = this.state;
      
      if(forms.firstName.length === 0 || forms.lastName.length === 0 || forms.title.length === 0 || forms.salary.length === 0 || forms.department.length === 0)
      {
        alert("You are you missing some fields");
      } else {
        this.props.newEmployee(forms.fistName, forms.lastName, forms.title, forms.salary, forms.department);
      
      }
  }
  
  
  render() {
    if(this.props.response)
    {
      if(this.props.response.status === 201)
      {
        alert("Employee added success!");
        
      } else {
        alert("Adding employee failed");
      }
    }
    
    return (
      <div className="NewEmployee">


        <div className="card addnew">
          <div className="card-body">
            <h5 className="card-title">First name</h5>
            <input placeholder="First Name" name="firstName" onChange={this.handleInputChange}/>
            <br />
            <h5 className="card-title">Last name</h5>
            <input placeholder="Last Name" name="lastName" onChange={this.handleInputChange}/>
            <br/>
            <h5 className="card-title">Title</h5>
            <input placeholder="Title" name="title" onChange={this.handleInputChange}/>
            <br />
            <h5 className="card-title">Salary</h5>
            <input placeholder="Salary" name="salary" onChange={this.handleInputChange}/>
            <br/>
            <h5 className="card-title">Department</h5>
            <input placeholder="Department" name="department" onChange={this.handleInputChange}/>
            <br/>
            <button onClick={ this.newEmployee } className="btn btn-danger">Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    
    return {
        response: state["response"]
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        newEmployee: (fistName, lastName, title, salary, department) => {
            dispatch(newEmployee(fistName, lastName, title, salary, department));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddEmployee);