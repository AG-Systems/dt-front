import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { nextEmployee, prevEmployee, getEmployees, setEmployeeID } from '../actions';


class Employee extends Component {
  
  constructor(props)
  {
    super(props);
    
    if(!this.props.employees)
    {
      this.props.getEmployees();
    }
    
    if(!this.props.currentEmployeeIndex)
    {
      this.props.setEmployeeID(this.props.match.params.id);  
    }
    
  }

  onKeyPressed(e)
  {
      
      if (e.keyCode === 13)
      {
          this.props.history.push('/');
      } else {
        if(e.keyCode === 38)
        {
          this.props.prevEmployee();
        } else if (e.keyCode === 40)
        {
           this.props.nextEmployee();
        } 
      }
  }
  
  nameUpperCase(str) {
    return str.replace(/\w\S*/g, function(words)
    {
        return words.charAt(0).toUpperCase() + words.substr(1).toLowerCase();
    });
  }
  
  firstName(name)
  {
      let first_name = name.split(",")[0];
      
      return this.nameUpperCase(first_name);
  }
  
  lastName(name)
  {
      
      if(name.indexOf(',') > -1)
      {
        let last_name = name.split(",")[1];
        return this.nameUpperCase(last_name);          
      } else {
        return ""; // no last name was given
      }
  
  }
  
  componentDidMount()
  {
    if(document.getElementById("employee"))
    {
      document.getElementById("employee").focus();      
    }
  }
  
  render() {
    
    let data = this.props.employees;
    let index = this.props.currentEmployeeIndex ? this.props.currentEmployeeIndex : this.props.match.params.id;
    

    if(data)
    {
      let employee = data[index];
      
      return (
        <div className="Employee" onKeyDown={(e) => this.onKeyPressed(e)} tabIndex="0" id="employee">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">First name: { this.firstName(employee.name) }</h5>
              <h5 className="card-title">Last name: { this.lastName(employee.name) } </h5>
              <h5 className="card-title">Salary: ${ employee.employee_annual_salary }</h5>
              <h5 className="card-title">Department: { employee.department }</h5>
              <p className="card-text">ID: { employee.id }</p>
            </div>
          </div>        
        </div>
      );
    } else {
      return (
        <div>
            <h1>Loading...</h1>
        </div>
        );
    }
    
  }
}


const mapStateToProps = (state) => {
    
    return {
        employees: state["employees"],
        currentEmployeeIndex: state["currentEmployeeIndex"]
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getEmployees: () => {
            dispatch(getEmployees());
        },
        nextEmployee: () => {
            dispatch(nextEmployee());
        },
        prevEmployee: () => {
            dispatch(prevEmployee());
        },
        setEmployeeID: (employeeID) => {
          dispatch(setEmployeeID(employeeID));
        }
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Employee);