import {Form, Formik,Field} from "formik";
import {maxLengthValidatorCreator} from "../../utils/validators/textLengthValidation";
import {requiredValidator} from "../../utils/validators/requiredValidation";
import {validatorMiddleware} from "../../utils/helpers/validatorMiddleware";

const NewPostForm = () => {
    return (
        <Formik
            initialValues={{newPostText : ""}}
            onSubmit={(values) => {alert(JSON.stringify(values, null, 2));}}>
            {(props) => (
                <Form>
                    <Field
                        type="newPostText"
                        name="newPostText"
                        placeholder="Write your post here"
                        validate={validatorMiddleware([requiredValidator,maxLengthValidatorCreator(5),maxLengthValidatorCreator(10)])}/>
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
};


export default NewPostForm;