import cssModule from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = () => {

    let postsData = [
        { id: 1, likes : 4, text : "Hi, how are you?"},
        { id: 2, likes : 8, text : "it is my my first post"},
        { id: 3, likes : 15, text : "Pashka, ti nahuy suda prishol?"},
        { id: 4, likes : 16, text : "Provalivai s moei stranichki"},
        { id: 5, likes : 23, text : "Ufff chto za tyagi takie barhatnie..."},
        { id: 6, likes : 42, text : "Keeeefteeeeemeeeeeeeee"}
    ];

    return (
            <div className={cssModule.postsBlock}>
                <h3>
                    My Posts:
                </h3>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add Post</button>
                </div>

                <div className={cssModule.posts}>
                    {
                        postsData.map(x => {
                            return <Post id={x.id} likes={x.likes} text={x.text} />
                        })
                    }
                </div>
            </div>
    );
}

export default MyPosts;