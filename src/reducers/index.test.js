import reducer from '../reducers';
import actions from '../actions';


describe('normal reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
      }
    ])
  }),

  it('should handle get request', () => {
    expect(
      reducer([], {
        type: "GET_EMPLOYEES"
      })
    ).toEqual([
      {
 
      }
    ])

   })    
   
  it('Next employee', () => {
    expect(
      reducer([], {
        type: "NEXT_EMPLOYEE"
      })
    ).toEqual([
      {
             
      }
    ])

   }) 

})