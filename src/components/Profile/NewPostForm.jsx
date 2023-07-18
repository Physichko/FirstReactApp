import {Form, Formik,Field} from "formik";
import {maxLengthValidator} from "../../utils/validators/textLengthValidation";
import {requiredValidator} from "../../utils/validators/requiredValidation";
import TextArea from "../Common/Inputs/TextArea";
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
                        component={TextArea}
                        validate={validatorMiddleware([requiredValidator,maxLengthValidator(5),maxLengthValidator(10)])}/>
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
};


export default NewPostForm;