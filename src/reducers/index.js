export default function App(state = [], action) {

    switch(action.type) {
        
        case 'GET_EMPLOYEES':
            state = { 
                employees: action.res.data, 
                currentEmployeeIndex: null,
                filter: null
            };
            return state; /* initialize the data */
            
        case 'NEXT_EMPLOYEE':
             
             let increment = null;
             
             if(state.filter !== null)
             {
                 if(state.currentEmployeeIndex === null || state.currentEmployeeIndex === state.employees.length - 1)
                 {

                    increment = state.employees.map(e => e.department).indexOf(state.filter); /* Get the index of the first occurence of the depertment */

                 } else {
                    /* starts with the next elemenet and then finds the first occurence of the depertment filter */
                    for(var i = state.currentEmployeeIndex + 1; i < state.employees.length; i += 1) { 
                        if(state.employees[i]["department"] === state.filter) {
                            increment = i;
                            break;
                        }
                    }
                    

                    
                    if(increment === null)  /* If its end of the list, starts from 0 and finds the first occurence */
                    {
                        increment = state.employees.map(e => e.department).indexOf(state.filter);
                    }
                    

                 }                  
             } else {
                 /* If there is no filter enabled */
                 if(state.currentEmployeeIndex === null || state.currentEmployeeIndex === state.employees.length - 1)
                 {
                     increment = 0; /* Go bottom to the top */
                 } else {
                     increment = state.currentEmployeeIndex + 1;
                 }                 
             }

             
             return {
                ...state,
                currentEmployeeIndex: increment
              };
              
        case 'PREV_EMPLOYEE':
            
             let decrement = null;
             
             if(state.filter !== null)
             {
                    
                 if(state.currentEmployeeIndex !== null)
                 {
                    for(var i = state.currentEmployeeIndex - 1; i >= state.employees.map(e => e.department).indexOf(state.filter); i -= 1) {
                        if(state.employees[i]["department"] === state.filter) {
                            decrement = i;
                            break;
                        }
                    } 
                    
                    if(decrement === null)
                    {
                       /* Starts from the end of the list if its front of the list. Finds the first occurence back of the list. */
                        for(var i = 0; i < state.employees.length; i += 1) {
                            if(state.employees[i]["department"] === state.filter) {
                                decrement = i;
                            }
                        }   
                    }
                    
                   
                 } else {
                     /* Finds the last occurence of the obj of the filter */
                    for(var i = 0; i < state.employees.length; i += 1) {
                        if(state.employees[i]["department"] === state.filter) {
                            decrement = i;
                        }
                    }  
                    
                    
                 }
                 
             } else {
                 /* If there is no filter enabled */
                 if(state.currentEmployeeIndex === 0)
                 {
                     decrement = state.employees.length - 1; /* Go top to the bottom */
                 } else {
                     decrement = state.currentEmployeeIndex - 1;
                 }                 
             }
             
             return {
                ...state,
                currentEmployeeIndex: decrement
              };
              
        case 'SET_EMPLOYEE': /* This sets the id for the currentEmployeeIndex */
            
            return {
                ...state,
                currentEmployeeIndex: action.id
            }
            
        case 'SET_FILTER': /* This sets the filter */
            
            let filter = action.filter;
            
            return {
               ...state,
               filter
            };
            
        case 'NEW_EMPLOYEE': /* Axios post request to create a new employee */
            return { 
                ...state,
                response: action.res   
            };  
            
        default:
            return state
    }



    return state;
}