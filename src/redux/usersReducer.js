import {type} from "@testing-library/user-event/dist/type";

const SHOW_MORE = "SHOW_MORE";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

let initialState = {
    users : [
        {
            id:1,
            photoUrl:,
            fullName : "Dmitry K.",
            location :{ country: "Belarus", city:"Minsk",},
            status : "I am looking for a job at the moment",
            isFollowed : false},
        {
            id:2,
            photoUrl:,
            fullName : "Lioshka",
            location :{ country: "Poland", city:"Bialystok",},
            status : "I am looking for a job at the moment",
            isFollowed : false},
        {
            id:3,
            photoUrl:,
            fullName : "Nastyenka",
            location :{ country: "Belarus", city:"Minsk",},
            status : "I am looking for a job at the moment",
            isFollowed: true},
        {
            id:4,
            photoUrl:,
            fullName : "Pashka",
            location :{ country: "USA", city:"Miami",},
            status : "I am looking for a job at the moment",
            isFollowed: true},
    ],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type){
        case FOLLOW : {
            return  {
                ...state,
                users: state.users.map(x => {
                    if(x.id === action.userId)
                    {
                        return {
                            ...x,
                            isFollowed: true
                        };
                    }
                    return x;
                })
            };

        }
        case UNFOLLOW : {
            return  {
                ...state,
                users: state.users.map(x => {
                    if(x.id === action.userId)
                    {
                        return {
                            ...x,
                            isFollowed: false
                        };
                    }
                    return x;
                })
            };
        }
        case SHOW_MORE : {

        }

        case SET_USERS : {
            return {
                ...state,
                users: [...state.users, action.users]};
        }
        default :
            return state;
    }
};

export const followActionCreator = (userId) => ({type : FOLLOW, userId : userId});
export const unfollowActionCreator = (userId) => ({type : UNFOLLOW, userId : userId});
export const setUsersActionCreator = (users) => ({type : SET_USERS, users : users});

export default usersReducer;