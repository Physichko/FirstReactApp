import React from "react";
import cssModule from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
    let onAddPost = () => {
        props.addPost();
    };

    let onPostChange = (event) => {
        let text = event.target.value;
        props.updateNewPostText(text);
    };

    return (
            <div className={cssModule.postsBlock}>
                <h3>
                    My Posts:
                </h3>
                <div>
                    <textarea value={props.newPostText} onChange={onPostChange}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add Post</button>
                </div>

                <div className={cssModule.posts}>
                    {props.posts.map(x => <Post id={x.id} likes={x.likes} text={x.text} />) }
                </div>
            </div>
    );
}

export default MyPosts;