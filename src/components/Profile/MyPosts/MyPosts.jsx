import React from "react";
import cssModule from "./MyPosts.module.css";
import Post from "./Post/Post";


const MyPosts = (props) => {

    let newPostElement = React.createRef();
    let addPost = () => {
        props.addPost();
    };

    let newPostTextChanged = () => {
         props.updateNewPostText(newPostElement.current.value);
    };

    return (
            <div className={cssModule.postsBlock}>
                <h3>
                    My Posts:
                </h3>
                <div>
                    <textarea ref={newPostElement} value={props.newPostText} onChange={newPostTextChanged}/>
                </div>
                <div>
                    <button onClick={addPost}>Add Post</button>
                </div>

                <div className={cssModule.posts}>
                    {props.posts.map(x => <Post id={x.id} likes={x.likes} text={x.text} />) }
                </div>
            </div>
    );
}

export default MyPosts;