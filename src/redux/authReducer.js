const SET_USER_DATA = "SET_USER_DATA";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
    id : null,
    email : null,
    login : null,
    isFetching : false,
    isAuthorized : false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_USER_DATA : {
            return {
                ...state,
                ...action.userData,
                isAuthorized: true
            };
        }
        case TOGGLE_IS_FETCHING : {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        default : {
            return state;
        }
    }
};


export const setUserDataActionCreator = (userData) => ({type : SET_USER_DATA, userData : userData,});
export const setIsToggleFetchingActionCreator = (isFetching) => ({type : TOGGLE_IS_FETCHING, isFetching : isFetching,});
export default authReducer;