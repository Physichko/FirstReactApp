import {Form, Formik,Field} from "formik";
import {maxLengthValidatorCreator} from "../../../utils/validators/textLengthValidation";
import {requiredValidator} from "../../../utils/validators/requiredValidation";
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
                        validate={validatorMiddleware([requiredValidator,maxLengthValidatorCreator(5),maxLengthValidatorCreator(10)])}/>
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
};


export default NewMessageForm;