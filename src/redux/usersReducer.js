const SHOW_MORE = "SHOW_MORE";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";

let initialState = {
    users : [
        {id:1, fullName : "Dmitry K.", location :{ country: "Belarus", city:"Minsk",}, status : "I am looking for a job at the moment", isFollowed : false},
        {id:2, fullName : "Lioshka", location :{ country: "Poland", city:"Bialystok",}, status : "I am looking for a job at the moment", isFollowed : false},
        {id:3, fullName : "Nastyenka",location :{ country: "Belarus", city:"Minsk",}, status : "I am looking for a job at the moment", isFollowed: true},
        {id:4, fullName : "Pashka", location :{ country: "USA", city:"Miami",}, status : "I am looking for a job at the moment", isFollowed: true},
    ],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type){
        case FOLLOW : {

        }
        case UNFOLLOW : {

        }
        default :
            return state;
    }
};

export const followActionCreator = (userId) => ({type : FOLLOW, userId : userId});
export const unfollowActionCreator = (userId) => ({type : UNFOLLOW, userId : userId});

export default usersReducer;