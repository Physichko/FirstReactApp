const ADD_MESSAGE = "ADD_MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE_NEW_MESSAGE_TEXT";

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
    newMessageText : "New message text",
};
export const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let text = state.newMessageText;
            return  {
                ...state,
                newMessageText : '',
                messages : [...state.messages, {id : state.messages.length + 1, text :  text}],
            };
        }
        case UPDATE_NEW_MESSAGE_TEXT: {
            return {
                ...state,
                newMessageText : action.updatedValue
            };
        }
        default:
            return state;
    }
};

export const addMessageActionCreator = () => ({ type : ADD_MESSAGE});
export const updateNewMessageTextActionCreator = (text) => ({type : UPDATE_NEW_MESSAGE_TEXT, updatedValue : text});
export default dialogsReducer;