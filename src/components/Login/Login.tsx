import React, {FC} from "react";
import {AppStateType} from "../../redux/reduxStore";
import {Formik, Field, Form, FormikErrors, FormikValues} from "formik";
import {validatorMiddleware} from "../../utils/helpers/validatorMiddleware";
import {requiredValidator} from "../../utils/validators/requiredValidation";
import {maxLengthValidatorCreator} from "../../utils/validators/textLengthValidation";
import {connect, ConnectedProps} from "react-redux";
import {loginCredentialsThunkCreator} from "../../redux/authReducer";
import {Navigate} from "react-router-dom";
import {ValidationErrors} from "../Common/ValidationErrors";


let maxva25 = maxLengthValidatorCreator(25);
let maxva15 = maxLengthValidatorCreator(15);
let full = [requiredValidator,maxva25,maxva15];
const LoginForm : FC<PropsFromRedux> = ({captchaUrl, loginByCredentials}) => {
    return (
        <Formik initialValues={{email:"", password:"", rememberMe:false}} onSubmit = {(values, submitProps) => {
                loginByCredentials(values.email,values.password,values.rememberMe, captchaUrl , submitProps.setErrors);
                submitProps.resetForm();
            }
        }>
            { (props) => (
                    <Form>
                        <div>
                            <Field placeholder="email"
                                   type="email"
                                   name="email"
                                   validate={validatorMiddleware(full)(props.values.email)}/>
                            {props.errors.email && props.touched.email && <ValidationErrors error={props.errors.email} />}
                        </div>
                        <div>
                            <Field placeholder="password"
                                   type="password"
                                   name="password"
                                   validate={validatorMiddleware(full)(props.values.password)}/>
                            {props.errors.password && props.touched.password && <ValidationErrors error={props.errors.password} />}
                        </div>

                        <div>
                            <Field name="rememberMe"
                                   type="checkbox"/> remember me
                        </div>
                        <div>
                            <button type="submit">login</button>
                        </div>
                        {
                            captchaUrl && <img src={captchaUrl}/>
                        }
                        {
                            captchaUrl &&  <Field placeholder="captcha" type="captcha" name="captcha"/>
                        }
                       {/* {
                            !props.errors.apiErrors ? <></> : <ValidationErrors errors={props.errors}/>
                        }*/}
                    </Form>
                )
            }
        </Formik>
    );
};

type MapStateToPropsType = {
    isAuthorized : boolean
    captchaUrl : string | null
}

type MapDispatchToPropsType = {
    loginByCredentials : (email : string, password : string, rememberMe: boolean, captchaUrl : string | null, setErrors : (errors : FormikErrors<FormikValues>) => void) => void
}

type OwnProps = {

}

const Login : FC<PropsFromRedux> = (props) => {
    if(props.isAuthorized){
        return <Navigate to={"/profile"} />
    }
    return(
        <div>
            <h1>LOGIN</h1>
            <LoginForm {...props}/>
        </div>
    );
}

const mapStateToProps = (state : AppStateType) => {
    return {
        isAuthorized : state.auth.userData.isAuthorized,
        captchaUrl: state.auth.captchaUrl,
    };
};
const connector = connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, AppStateType>(mapStateToProps, {loginByCredentials :loginCredentialsThunkCreator});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Login);
