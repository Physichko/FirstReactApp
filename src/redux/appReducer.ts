import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./reduxStore";

const {loginCookieThunkCreator} = require('./authReducer');

let initialState = {
    isInitialized : false,
};

type StateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof appReducerActionCreators>;
const appReducer = (state : StateType = initialState, action : ActionsTypes) :StateType => {
    switch (action.type){
        case 'SET_INITIALIZED' : {
            return {
                ...state,
                isInitialized: action.isInitialized,
            };
        }

        default : {
            return state;
        }
    }
};
export const appReducerActionCreators = {
    setIsInitializedActionCreator : (isInitialized : boolean)  => ({type : 'SET_INITIALIZED', isInitialized} as const),
}
export const appInitializedThunkCreator = () : ThunkAction<void,AppStateType, unknown, ActionsTypes> => {
    return (dispatch) => {
        let promise = dispatch(loginCookieThunkCreator());
        Promise.all([promise])
            .then(() => {
            dispatch(appReducerActionCreators.setIsInitializedActionCreator(true))
        });

    };
}

export default appReducer;