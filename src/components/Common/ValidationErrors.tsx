import React from "react";
import cssModule from "./ValidationErrors.module.css"

type ValidationErrorPropsType = {
    error : string
}
export const ValidationErrors : React.FC<ValidationErrorPropsType> = ({error}) => {
    debugger;
    return (<div className={cssModule.errorMessage}>
            {error}
        </div>
    );
};