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
      return {
        ...state,
        isLoggedIn: false,
      };
    case 'USER_EMAIL':
        return {
          ...state,
          userEmail: action.email,
        };
    default:
      return state;
  }
};
