import {Formik, Field, Form} from "formik";
import Input from "../Common/Inputs/Input";
import {validatorMiddleware} from "../../utils/helpers/validatorMiddleware";
import {requiredValidator} from "../../utils/validators/requiredValidation";
import {maxLengthValidator} from "../../utils/validators/textLengthValidation";
import {connect} from "react-redux";
import {loginCredentialsThunkCreator} from "../../redux/authReducer";
import {Navigate} from "react-router-dom";
import {ValidationErrors} from "../Common/ValidationErrors";

let maxva50 = maxLengthValidator(50);
let full = [requiredValidator,maxva50];

const LoginForm = (props) => {
    return (
        <Formik initialValues={{email:"", password:"", rememberMe:false}} onSubmit = {(values, submitProps) =>
        {
            props.loginCredentialsThunkCreator(values.email,values.password,values.rememberMe, submitProps.setErrors);
            submitProps.resetForm();
        }
        }>
            { (props) => (
                    <Form>
                        <Field placeholder="email"
                               type="email"
                               name="email"
                               component={Input}
                               validate={validatorMiddleware(full)}/>
                        <Field placeholder="password"
                               type="password"
                               name="password"
                               component={Input}
                               validate={validatorMiddleware(full)}/>
                        <Field component={Input}
                               name="rememberMe"
                               type="checkbox"/> remember me
                        <button type="submit">login</button>

                        {
                            !props.errors.apiErrors ? <></> : <ValidationErrors errors={props.errors}/>
                        }
                    </Form>
                )
            }
        </Formik>
    );
};
const Login = (props) => {

    if(props.isAuth){
        return <Navigate to={"/profile"} />
    }

    return(
        <div>
            <h1>LOGIN</h1>
            <LoginForm loginCredentialsThunkCreator={props.loginCredentialsThunkCreator}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuth : state.auth.isAuthorized
    };
};

export default connect(mapStateToProps, {loginCredentialsThunkCreator})(Login);