export const loginReducer = (state, { type, payload }, action) => {
  if (!action || !action.type) {
    console.warn("Invalid action dispatched to loginReducer:", action);
    return state;
  }

  switch (action.type) {
    case "SET_LOGIN":
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        token: action.payload.token || "",
      };

    case 'EMAIL':
      return {
        ...state,
        email: payload.value
      }

    case 'PASSWORD':
      return {
        ...state,
        password: payload.value
      }

    case 'TOKEN':
      return {
        ...state,
        token: action.payload.token
      }

    case "LOGOUT":
      return {
        ...state,
        email: '',
        password: '',
        token: ''
      }


    default:
      return state
  }
}