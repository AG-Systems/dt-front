import axios from 'axios';

export function getEmployees() {

   return function (dispatch) {

      axios.get('https://dt-interviews.appspot.com/').then((res) =>  dispatch({
                type: 'GET_EMPLOYEES',
                res
            }));

  }
}

export function nextEmployee() {

   return function (dispatch) {

         dispatch({
                type: 'NEXT_EMPLOYEE'
            });

  }
}

export function prevEmployee() {

   return function (dispatch) {

         dispatch({
                type: 'PREV_EMPLOYEE'
            });

  }
}

export function setEmployeeID(employeeID) {

   let id = parseInt(employeeID)
   return function (dispatch) {
         dispatch({
                type: 'SET_EMPLOYEE',
                id
            });

  }

}

export function setFilter(filter) {

   return function (dispatch) {
         dispatch({
                type: 'SET_FILTER',
                filter
            });

  }

}

export function newEmployee(firstName, lastName, title, salary, department) {

   return function (dispatch) {
      axios({
        method: 'post',
        url: 'https://dt-interviews.appspot.com/',
        data: {
            name:  firstName + ", " + lastName,
            job_titles: title,
            employee_annual_salary: parseInt(salary),
            department: department
        },
       headers: {
           'Content-Type': 'text/plain;charset=utf-8',
       }
      }).then((res) =>  dispatch({
                type: 'NEW_EMPLOYEE',
                res
            }));

  }

}