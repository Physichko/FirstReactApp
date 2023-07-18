import cssModule from "./TextArea.module.css"
import FormControl from "./FormControl";
const TextArea = (props)  => {
    return( <FormControl {...props}>
        <textarea {...props.field} {...props} />
    </FormControl>);
};

export default TextArea;