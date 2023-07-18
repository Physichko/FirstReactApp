import cssModule from "./Input.module.css"
import FormControl from "./FormControl";
const Input = (props)  => {
    return (
        <FormControl {...props}>
            <input  {...props.field} {...props}/>
        </FormControl>
    );
};

export default Input;
