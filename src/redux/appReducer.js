import {loginCookieThunkCreator} from "./authReducer";

const SET_INITIALIZED = "SET_INITIALIZED";

let initialState = {
    isInitialized : false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_INITIALIZED : {
            return {
                ...state,
                isInitialized: action.isInitialized
            };
        }

        default : {
            return state;
        }
    }
};


export const setIsInitializedActionCreator = (isInitialized) => ({type : SET_INITIALIZED, isInitialized });
export const appInitializedThunkCreator = () => {
    return (dispatch) => {
        let promise = dispatch(loginCookieThunkCreator());
        Promise.all([promise])
            .then(() => {
            dispatch(setIsInitializedActionCreator(true))
        });

    };
}
export default appReducer;