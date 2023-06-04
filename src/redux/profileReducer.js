const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";

let initialState = {
    posts: [
        {id: 1, likes: 4, text: "Hi, how are you?"},
        {id: 2, likes: 8, text: "it is my my first post"},
        {id: 3, likes: 15, text: "Pashka, ti nahuy suda prishol?"},
        {id: 4, likes: 16, text: "Provalivai s moei stranichki"},
        {id: 5, likes: 23, text: "Ufff chto za tyagi takie barhatnie..."},
        {id: 6, likes: 42, text: "Keeeefteeeeemeeeeeeeee"}
    ],
    newPostText: "new Post text",
    profile : null,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return  {
                ...state,
                posts: [...state.posts, {id: state.posts.length + 1, text: state.newPostText, likes: 0,}],
                newPostText: "",
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return  {
                ...state,
                newPostText : action.updatedValue
            };
        }
        case SET_USER_PROFILE : {
            return {
                ...state,
                profile : action.profile,
            }
        }
        default:
            return state;
    }
};

export const addPostActionCreator = () => ({ type : ADD_POST});
export const updateNewPostTextActionCreator = (text) => ({type : UPDATE_NEW_POST_TEXT, updatedValue : text});
export const setUserProfileActionCreator = (profile) => ({ type : SET_USER_PROFILE, profile : profile});
export default profileReducer;