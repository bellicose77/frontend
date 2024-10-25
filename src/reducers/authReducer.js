// Initial state
const initialState = {
  isLoggedIn: false,
  userEmail: ''
};

// Reducer function to manage the login state
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      return {
        ...state,
        isLoggedIn: false,
      };
    case 'USER_EMAIL':
      localStorage.setItem('userEmail', action.email); 
        return {
          ...state,
          userEmail: action.email,
        };
    default:
      return state;
  }
};
