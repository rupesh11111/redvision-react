import { combineReducers } from 'redux';
import { SIGN_TOKEN, USER_DETAIL} from './action';

// Initial state for todos
const initialTodoState = {
  token: localStorage.getItem('token') || '',
  userDetail:{}

};


const tokenReducer = (state = initialTodoState, action) => {
  switch (action.type) {
    case SIGN_TOKEN:
      return {
        ...state,
        token:action.payload
      };
      case USER_DETAIL:
      return {
        ...state,
        userdetail:action.payload
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tokenReducer,
  });
  
  export default rootReducer;