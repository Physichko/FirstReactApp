const store = {
    state : state
}

let rerenderEntireTree;

let dialogsData = [
    { id: 1, name : "Lioshka"},
    { id: 2, name : "Nastya"},
    { id: 3, name : "Alisa"},
    { id: 4, name : "Alena"},
    { id: 5, name : "Egorus"},
    { id: 6, name : "Pashka"}
];

let messagesData = [
    { id: 1, text : "Hi"},
    { id: 2, text : "How are you doing?"},
    { id: 3, text : "Bye"},
    { id: 4, text : "Yo"},
    { id: 5, text : "Yo"},
    { id: 6, text : "Yo"}
];

let postsData = [
    { id: 1, likes : 4, text : "Hi, how are you?"},
    { id: 2, likes : 8, text : "it is my my first post"},
    { id: 3, likes : 15, text : "Pashka, ti nahuy suda prishol?"},
    { id: 4, likes : 16, text : "Provalivai s moei stranichki"},
    { id: 5, likes : 23, text : "Ufff chto za tyagi takie barhatnie..."},
    { id: 6, likes : 42, text : "Keeeefteeeeemeeeeeeeee"}
];

let state = {

    profilePage:{
        posts: postsData,
        newPostText : "new Post text",
    },
    dialogsPage:{
        messages: messagesData,
        dialogs : dialogsData,
    },

};
window.state = state;
export const addPost = () => {
    let id = postsData.length + 1;
    let postToAdd = {
        id : id,
        text : state.profilePage.newPostText,
        likes : 0,
    };
    state.profilePage.posts.push(postToAdd);
    state.profilePage.newPostText = "";
    rerenderEntireTree();
};

export const updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree()
}

export const subscribe = (observer) => {
    rerenderEntireTree = observer;
}
export default state;