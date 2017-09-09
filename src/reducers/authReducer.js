
export default function authReducers(state = {}, action) {
    switch(action.type) {
        case "SET_USER":
            return {
                ...state,
                user: {...action.payload}
            };
            break;
        case 'SET_SESSION':
            return {
                ...state,
                session: action.payload
            };
            break;
    default:
        return state;
    }
}