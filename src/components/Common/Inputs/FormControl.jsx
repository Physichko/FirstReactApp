import cssModule from "./FormControl.module.css";
import {ValidationErrors} from "../ValidationErrors";

const FormControl = ({field, form: { touched, errors }, ...props}) => {
    let isErrorsDefined =  Object.keys(errors).length !== 0;
    let isTouchDefined = Object.keys(touched).length !== 0;
    let isFieldWithErrors = false;

    if(isErrorsDefined) {
        let isErrorDefinedInCurrentComponent =  typeof errors[field.name] !== typeof undefined;
        if(isErrorDefinedInCurrentComponent)
        {
            if(isTouchDefined)
            {
                let isTouchDefinedInCurrentComponent =  typeof touched[field.name] !== typeof undefined;
                if(isTouchDefinedInCurrentComponent)
                    isFieldWithErrors =  Object.keys(errors[field.name]).length !== 0 ;
            }
        }

    }
    let style = isFieldWithErrors ? `${cssModule.formControl} ${cssModule.error}` :`${cssModule.formControl}`;
    return (
        <div className={style}>
            <div>
                {props.children}
            </div>
            { isFieldWithErrors && <ValidationErrors errors={errors[field.name]}/>}
        </div>
    );
};

export default FormControl;