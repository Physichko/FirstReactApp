import cssModule from "./Message.module.css";

const Message = (props) => {
    return (
        <div className={cssModule.message}>
            {props.text}
        </div>
    );
};

export default Message;