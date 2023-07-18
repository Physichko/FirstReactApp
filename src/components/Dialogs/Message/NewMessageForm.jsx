import {Form, Formik,Field} from "formik";
import {maxLengthValidator} from "../../../utils/validators/textLengthValidation";
import {requiredValidator} from "../../../utils/validators/requiredValidation";
import Input from "../../Common/Inputs/Input";
import {validatorMiddleware} from "../../../utils/helpers/validatorMiddleware";

const NewMessageForm = () => {
    return (
        <Formik
            initialValues={{newMessageText : ""}}
            onSubmit={(values) => {alert(JSON.stringify(values, null, 2));}}>
            {(props) => (
                <Form>
                    <Field
                        type="newMessageText"
                        name="newMessageText"
                        placeholder="Write your message here"
                        component={Input}
                        validate={validatorMiddleware([requiredValidator,maxLengthValidator(5),maxLengthValidator(10)])}/>
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
};


export default NewMessageForm;