import cssModule from "./MyPosts.module.css";
import Post from "./Post/Post";
const MyPosts = () => {
    return (
            <div>
                My Posts:
                <div>
                    <textarea></textarea>
                    <button>Add Post</button>
                </div>
                <div>
                    <Post message="Hi, how are you?"/>
                    <Post message="it is my my first post"/>
                </div>
            </div>
    );
}

export default MyPosts;