import {InferActionsTypes} from "./reduxStore";

type Message = {
    id : number;
    text : string;
}

type Dialog = {
    id: number;
    name : string;
}

let initialState = {
    messages: [
        {id: 1, text: "Hi"},
        {id: 2, text: "How are you doing?"},
        {id: 3, text: "Bye"},
        {id: 4, text: "Yo"},
        {id: 5, text: "Yo"},
        {id: 6, text: "Yo"}
    ] as Array<Message>,
    dialogs: [
        {id: 1, name: "Lioshka"},
        {id: 2, name: "Nastya"},
        {id: 3, name: "Alisa"},
        {id: 4, name: "Alena"},
        {id: 5, name: "Egorus"},
        {id: 6, name: "Pashka"}
    ] as Array<Dialog>,
};

type DialogsStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof dialogsReducerActionCreators>;
export const dialogsReducer = (state : DialogsStateType = initialState, action : ActionsTypes) : DialogsStateType => {
    switch (action.type) {
        case 'ADD_MESSAGE': {
            return  {
                ...state,
                messages : [...state.messages, {id : state.messages.length + 1, text :  action.newMessageText}],
            } ;
        }
        default:
            return state;
    }
};

export const dialogsReducerActionCreators = {
    addMessageActionCreator : (newMessageText : string)=> ({ type : 'ADD_MESSAGE', newMessageText} as const),
}

export default dialogsReducer;