export default function tableReducer(state = {count:0, results:[]}, action) {
  switch (action.type) {
    case 'SET_TABLE':
      return action.payload.data
    default:
      return state
  }
}