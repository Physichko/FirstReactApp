import profileReducer, {addPostActionCreator, deletePostActionCreator} from "./profileReducer";

let state = {
    posts: [
        {id: 1, likes: 4, text: "Hi, how are you?"},
        {id: 2, likes: 8, text: "it is my my first post"},
        {id: 3, likes: 15, text: "Pashka, ti nahuy suda prishol?"},
        {id: 4, likes: 16, text: "Provalivai s moei stranichki"},
        {id: 5, likes: 23, text: "Ufff chto za tyagi takie barhatnie..."},
        {id: 6, likes: 42, text: "Keeeefteeeeemeeeeeeeee"}
    ],
};
it("New posts length should be incremented", () => {
    let action = addPostActionCreator("My first test of reducer");
    let newState = profileReducer(state,action);
    expect(newState.posts.length).toBe(7);
});

it("New post has correct id", () => {
    let action = addPostActionCreator("My first test of reducer");
    let newState = profileReducer(state,action);
    expect(newState.posts[6].id).toBe(7);
});

it("New post text correct", () => {
    let action = addPostActionCreator("My first test of reducer");
    let newState = profileReducer(state,action);
    expect(newState.posts[6].text).toBe("My first test of reducer");
});

it("New posts length after removing should be decremented", () => {
    let action = deletePostActionCreator(1);
    let newState = profileReducer(state,action);
    expect(newState.posts.length).toBe(5);
});