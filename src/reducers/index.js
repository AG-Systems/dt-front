export default function App(state = [], action) {

    switch(action.type) {
        
        case 'GET_EMPLOYEES':
            state = { employees: action.res.data, currentEmployeeIndex: null, employeeScreen: false  };
            return state;
            
        case 'NEXT_EMPLOYEE':
            
             let increment = null;
             if(state.currentEmployeeIndex === null || state.currentEmployeeIndex === state.employees.length - 1)
             {
                 increment = 0;
             } else {
                 increment = state.currentEmployeeIndex + 1
             }
             
             return {
                employees: state.employees,
                currentEmployeeIndex: increment
              };
              
        case 'PREV_EMPLOYEE':
            
             let decrement = null;
             if(state.currentEmployeeIndex === 0)
             {
                 decrement = state.employees.length - 1;
             } else {
                 decrement = state.currentEmployeeIndex - 1
             }
             
             return {
                employees: state.employees,
                currentEmployeeIndex: decrement
              };
              
        case 'VIEW_EMPLOYEE':
            
            // id, first name, last name, title, salary, department
            
            let currentEmployee = state.employees[state.currentEmployeeIndex];
            

            let id = currentEmployee.id;
            let first_name = currentEmployee.name;
            let last_name = currentEmployee.name;
            let title = currentEmployee.job_titles;
            let salary = currentEmployee.employee_annual_salary;
            let department = currentEmployee.department;


             return {
                employees: state.employees,
                currentEmployeeIndex: state.currentEmployeeIndex,
                employeeScreen: true,
                id,
                first_name,
                last_name,
                title,
                salary,
                department
              };
        
    }



    return state;
}