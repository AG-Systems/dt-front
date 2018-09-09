import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { getEmployees, nextEmployee, prevEmployee, viewEmployee } from '../actions';

class Dashboard extends Component {
    
  constructor(props)
  {
      super(props);
      
      this.props.getEmployees();
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
      } else if (e.keyCode === 13)
      {
          this.props.viewEmployee();
      }
      
  }
  
  
  render() {

     let data = this.props.employees ? this.props.employees : [];
     
     
     
     let listOfEmployees = data.map((employee, index) =>
        <div className={ index !== this.props.currentEmployeeIndex ? "card" : "card bg-dark text-white" } key={ index } id={ "cardID-" + index }>
          <div className="card-body">
            <h5 className="card-title">{ this.nameUpperCase(employee.name) }</h5>
            <p className="card-text">Title: { this.nameUpperCase(employee.job_titles) }</p>
          </div>
        </div>
      );
  
    return (
      <div>
        <h1> Department </h1>
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
              document.getElementById('dashboard').scrollTop = topPos - 100;             
        }
    }
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
        viewEmployee: () => {
            dispatch(viewEmployee());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);