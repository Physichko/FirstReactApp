import {loginCookieThunkCreator} from "./authReducer";

const SET_INITIALIZED : string = "appReducer/SET_INITIALIZED";

let initialState : StateType = {
    isInitialized : false,
};

const appReducer : (state : StateType, action : IAction ) => StateType = (state = initialState, action) => {
    switch (action.type){
        case SET_INITIALIZED : {
            let setInitializeAction = action as ISetInitializeAction;
            return {
                ...state,
                isInitialized: setInitializeAction.isInitialized
            };
        }

        default : {
            return state;
        }
    }
};


export const setIsInitializedActionCreator : (isInitialized : boolean) => ISetInitializeAction = (isInitialized) => ({type : SET_INITIALIZED, isInitialized});
export const appInitializedThunkCreator = () => {
    return (dispatch) => {
        let promise = dispatch(loginCookieThunkCreator());
        Promise.all([promise])
            .then(() => {
            dispatch(setIsInitializedActionCreator(true))
        });

    };
}

type StateType = {
    isInitialized : boolean
};

interface IAction  {
    type : string
}
interface ISetInitializeAction extends IAction {
    isInitialized : boolean
}
export default appReducer;