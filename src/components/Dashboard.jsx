import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { getEmployees, nextEmployee, prevEmployee, setFilter } from '../actions';
import { Link } from 'react-router-dom';


class Dashboard extends Component {
    
  constructor(props)
  {
      super(props);
      

        if(!this.props.employees)
        {
          this.props.getEmployees();
        }
        
  }

  
  nameUpperCase(str) {
    return str.replace(/\w\S*/g, function(words)
    {
        return words.charAt(0).toUpperCase() + words.substr(1).toLowerCase();
    });
  }
  
  onKeyPressed(e)
  {
      if(e.keyCode === 38)
      {
        this.props.prevEmployee();
      } else if (e.keyCode === 40)
      {
         this.props.nextEmployee();
      } else if (e.keyCode === 13 && this.props.currentEmployeeIndex !== null)
      {
          this.props.history.push('/employee/' + this.props.currentEmployeeIndex.toString());
      }
      
  }
  
  componentDidMount()
  {

    if(this.props.currentEmployeeIndex)
    {
          let topPos = document.getElementById("cardID-" + this.props.currentEmployeeIndex).offsetTop;
          document.getElementById('dashboard').scrollTop = topPos - 400; 
    }
    document.getElementById("dashboard").focus();     
  }
  
  setFilter(filter)
  {
     if(filter !== this.props.filter)
     {
        this.props.setFilter(filter);        
     } else {
        this.props.setFilter(null);
     }

  }
  
  render() {

     let data = this.props.employees ? this.props.employees : [];
     
     let departments = [];
     

     let listOfEmployees = data.map((employee, index) => {
        
        if(departments.indexOf(employee.department) === -1)
        {
          departments.push(employee.department);          
        }
        
        if(this.props.filter === null)
        {
          return (
            <div className={ index !== this.props.currentEmployeeIndex ? "card" : "card bg-dark text-white" } key={ index } id={ "cardID-" + index }>
              <div className="card-body">
                <h5 className="card-title">{ this.nameUpperCase(employee.name) }</h5>
                <p className="card-text">Title: { this.nameUpperCase(employee.job_titles) }</p>
              </div>
            </div>
            );          
        } else {
          
          if(employee.department === this.props.filter)
          {
            return (
              <div className={ index !== this.props.currentEmployeeIndex ? "card" : "card bg-dark text-white" } key={ index } id={ "cardID-" + index }>
                <div className="card-body">
                  <h5 className="card-title">{ this.nameUpperCase(employee.name) }</h5>
                  <p className="card-text">Title: { this.nameUpperCase(employee.job_titles) }</p>
                </div>
              </div>
              );             
          }
        
        }

     });
  
    let listOfDepartments = departments.map((department, index) => {
      
      if(department === this.props.filter)
      {
        return (
            <li className="list-group-item active" key={ index } onClick={()=>{this.setFilter(department)}} >{ department }</li>
          );          
      } else {
        return (
            <li className="list-group-item" key={ index } onClick={()=>{this.setFilter(department)}} >{ department }</li>
          );          
      }

    });
    
    return (
      <div>
        <h1>New Employee </h1>
        <Link to="/new" class="btn btn-danger">Add</Link>
        <h1> Department </h1>
        <ul className="list-group departments">
          { listOfDepartments }
        </ul>
        <h1>Employees </h1>
        <div className="dashboard" onKeyDown={(e) => this.onKeyPressed(e)} tabIndex="0" id="dashboard">
            { listOfEmployees }
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
    
    if(state["currentEmployeeIndex"] !== null)
    {
        if(document.getElementById("cardID-" + state["currentEmployeeIndex"]))
        {
              
              let topPos = document.getElementById("cardID-" + state["currentEmployeeIndex"]).offsetTop;
              document.getElementById('dashboard').scrollTop = topPos - 400; 
              
        }
    }
    return {
        employees: state["employees"],
        currentEmployeeIndex: state["currentEmployeeIndex"],
        filter: state["filter"]
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
        setFilter: (filter) => {
            dispatch(setFilter(filter));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);