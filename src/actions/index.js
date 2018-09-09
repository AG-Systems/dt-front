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

export function viewEmployee() {

   return function (dispatch) {

         dispatch({
                type: 'VIEW_EMPLOYEE'
            });

  }
}