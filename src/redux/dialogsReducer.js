const ADD_MESSAGE = "ADD_MESSAGE";

let initialState = {
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
};
export const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            return  {
                ...state,
                messages : [...state.messages, {id : state.messages.length + 1, text :  action.newMessageText}],
            };
        }
        default:
            return state;
    }
};

export const addMessageActionCreator = (newMessageText) => ({ type : ADD_MESSAGE, newMessageText});

export default dialogsReducer;