import React from "react";
import cssModule from "./MyPosts.module.css";
import Post from "./Post/Post";
import NewPostForm from "../NewPostForm";

const MyPosts = (props) => {
    console.log("Render")
    let onAddPost = (formData) => {
        props.addPost(formData.newPostText);
    };

    return (
            <div className={cssModule.postsBlock}>
                <h3>
                    My Posts:
                </h3>
               <NewPostForm onSubmit={onAddPost} />

                <div className={cssModule.posts}>
                    {props.posts.map(x => <Post id={x.id} likes={x.likes} text={x.text} />) }
                </div>
            </div>
    );
}

export default MyPosts;