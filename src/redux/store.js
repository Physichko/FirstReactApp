import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

const store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, likes: 4, text: "Hi, how are you?"},
                {id: 2, likes: 8, text: "it is my my first post"},
                {id: 3, likes: 15, text: "Pashka, ti nahuy suda prishol?"},
                {id: 4, likes: 16, text: "Provalivai s moei stranichki"},
                {id: 5, likes: 23, text: "Ufff chto za tyagi takie barhatnie..."},
                {id: 6, likes: 42, text: "Keeeefteeeeemeeeeeeeee"}
            ],
            newPostText: "new Post text",
        },
        dialogsPage: {
            messages: [
                {id: 1, text: "Hi"},
                {id: 2, text: "How are you doing?"},
                {id: 3, text: "Bye"},
                {id: 4, text: "Yo"},
                {id: 5, text: "Yo"},
                {id: 6, text: "Yo"}
            ],
            dialogs: [
                {id: 1, name: "Lioshka"},
                {id: 2, name: "Nastya"},
                {id: 3, name: "Alisa"},
                {id: 4, name: "Alena"},
                {id: 5, name: "Egorus"},
                {id: 6, name: "Pashka"}
            ],
            newMessageText : "New message text",
        },
        sidebar : {},
    },

    _callSubscribers(){
        console.log("no subscribers");
    },

    getState(){
        return this._state;
    },

    subscribe(observer){
        this._callSubscribers = observer;
    },

    dispatch(action){ //{type : 'ADD_POST'}

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

        this._callSubscribers(this._state);
    }
}

window.state = store._state;

export default store;