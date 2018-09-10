export default function App(state = [], action) {

    switch(action.type) {
        
        case 'GET_EMPLOYEES':
            state = { 
                employees: action.res.data, 
                currentEmployeeIndex: null,
                filter: null
            };
            return state;
            
        case 'NEXT_EMPLOYEE':
             
             let increment = null;
             
             if(state.filter !== null)
             {
                 if(state.currentEmployeeIndex === null || state.currentEmployeeIndex === state.employees.length - 1)
                 {

                    increment = state.employees.map(e => e.department).indexOf(state.filter);

                 } else {
                     
                    for(var i = state.currentEmployeeIndex + 1; i < state.employees.length; i += 1) {
                        if(state.employees[i]["department"] === state.filter) {
                            increment = i;
                            break;
                        }
                    }
                    
                    if(increment === null)
                    {
                        increment = state.employees.map(e => e.department).indexOf(state.filter);
                    }
                 }                  
             } else {
                 
                 if(state.currentEmployeeIndex === null || state.currentEmployeeIndex === state.employees.length - 1)
                 {
                     increment = 0;
                 } else {
                     increment = state.currentEmployeeIndex + 1
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
                        for(var i = 0; i < state.employees.length; i += 1) {
                            if(state.employees[i]["department"] === state.filter) {
                                decrement = i;
                            }
                        }   
                    }
                 } else {
                    for(var i = 0; i < state.employees.length; i += 1) {
                        if(state.employees[i]["department"] === state.filter) {
                            decrement = i;
                        }
                    }                     
                 }
                 
             } else {
                 if(state.currentEmployeeIndex === 0)
                 {
                     decrement = state.employees.length - 1;
                 } else {
                     decrement = state.currentEmployeeIndex - 1
                 }                 
             }
             
             return {
                ...state,
                currentEmployeeIndex: decrement
              };
              
        case 'SET_EMPLOYEE':
            
            return {
                ...state,
                currentEmployeeIndex: action.id
            }
            
        case 'SET_FILTER':
            
            let filter = action.filter;
            
            return {
               ...state,
               filter
            };
            
        
    }



    return state;
}