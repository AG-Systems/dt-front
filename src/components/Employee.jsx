import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { nextEmployee, prevEmployee, viewEmployee } from '../actions';


class Employee extends Component {
  render() {
    return (
      <div className={ "Employee" }>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">First name: { this.props.first_name }</h5>
            <h5 className="card-title">Last name: { this.props.last_name }</h5>
            <h5 className="card-title">Salary: ${ this.props.salary }</h5>
            <h5 className="card-title">Department: { this.props.department }</h5>
            <p className="card-text">ID: { this.props.id }</p>
          </div>
        </div>        
      </div>
    );
  }
}


const mapStateToProps = (state) => {
    
    return {
        currentEmployeeIndex: state["currentEmployeeIndex"],
        viewEmployee: state["employeeScreen"],
        id: state["id"],
        first_name: state["first_name"],
        last_name: state["last_name"],
        title: state["title"],
        salary: state["salary"],
        department: state["department"]
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
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
)(Employee);