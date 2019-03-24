import { SEARCH } from '../actions/actions.js';
import results from "./data.json"

const initialState = {
  physician_name: "",
  physician_data: null
}

const appState = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH: 
      return {...state, 
        physician_name: action.physician_name,
        physician_data: searchResults(action.physician_name)
      } 
    default: 
      return state;
  }
}

function searchResults(name) {
  var i
  for (i = 0; i < results.length; i++) {
    if (results[i]["provider_full_name"] === name) {
      return results[i]
    }
  }
  return "not found"
}
export default appState;

