import cssModule from "./ProfileInfo.module.css";
import Preloader from "../../Common/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/images.png"
import {useState} from "react";
import {Field, Form, Formik} from "formik";
import Input from "../../Common/Inputs/Input";
import {validatorMiddleware} from "../../../utils/helpers/validatorMiddleware";
import {requiredValidator} from "../../../utils/validators/requiredValidation";
import {maxLengthValidator} from "../../../utils/validators/textLengthValidation";

const ProfileInfo = (props) => {
    let [editMode, setEditMode] = useState(false);
    const onPhotoSelected = (e) =>{
        if(e.target.files.length > 0)
        {
            let file = e.target.files[0];
            props.savePhoto(file);
        }

    };

    const onEditButtonClicked = () => {
        setEditMode(true);
    }

    if(!props.profile){
        return <Preloader />
    }
    return (
        <div className={cssModule.container}>
            <div className={cssModule.descriptionBlock}>
                <div className={cssModule.avatar}>
                    <div>
                        <img src={props.profile.photos.large || userPhoto}/>
                    </div>
                    <div>
                        {props.isProfileOwner && <input type="file" onChange={onPhotoSelected} />}
                    </div>
                </div>
                <div className={cssModule.nameStatus}>
                    <div className={cssModule.name}>
                        {props.profile.fullName}
                    </div>
                    <div className={cssModule.status}>
                        {props.profile.lookingForAJobDescription}
                    </div>
                    <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
                </div>
                {
                    editMode
                        ? <ContactsDataForm contacts={props.profile.contacts}/>
                        : <ContactsData contacts={props.profile.contacts}
                                        onEditButtonClicked={onEditButtonClicked}
                                        isOwner={props.isProfileOwner}/>
                }
            </div>
        </div>
    );
}

const ContactsData = ({contacts, onEditButtonClicked, isOwner}) => {
    return (
        <div className={cssModule.contacts}>
            <ul>
                {Object.keys(contacts).map(x => {
                    return (<li>
                        <Contact contactName={x} contactValue={contacts[x]} />
                        </li>)
                })}
            </ul>
            {isOwner && <div>
                <button onClick={onEditButtonClicked}>Edit</button>
            </div> }
        </div>
    );
}

const ContactsDataForm = ({contacts}) => {
    return (
        <Formik
            initialValues={{x : contacts[x]}}
            onSubmit={(values) => {alert(JSON.stringify(values, null, 2));}}>
            {
                (props) => (
                    <Form>
                <div className={cssModule.contacts}>
                 <ul>
                    {
                        Object.keys(contacts).map(x => {
                         return <li>
                             <ContactInEditMode contactName={x} contactValue={contacts[x]} />

                    </li>
                })
            }
            </ul>
            <button type="submit">Submit</button>
        </div>
                    </Form>
                )
            }
        </Formik>
    );
}

const Contact = ({contactName,contactValue}) => {
    const firstLetterCapital = (word) => {
        let firstLetter = word.charAt(0);
        let rest = word.slice(1);
        return `${firstLetter.toUpperCase()}${rest}`
    }

    return (
        <div>
            {firstLetterCapital(contactName)}:{contactValue}
        </div>
    );
}

const ContactInEditMode = ({contactName,contactValue}) => {
    const firstLetterCapital = (word) => {
        let firstLetter = word.charAt(0);
        let rest = word.slice(1);
        return `${firstLetter.toUpperCase()}${rest}`
    }

    return (
        <span>{
            firstLetterCapital(contactName)}:{<Field
            type={contactName}
            name={contactName}
            component={Input}
            value={contactValue}
            validate={validatorMiddleware([maxLengthValidator(20)])}/>
        }
        </span>
    );
}

export default ProfileInfo;import cssModule from "./ProfileInfo.module.css";
import Preloader from "../../Common/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/images.png"
import {useState} from "react";
import {Field, Form, Formik} from "formik";
import Input from "../../Common/Inputs/Input";
import {validatorMiddleware} from "../../../utils/helpers/validatorMiddleware";
import {requiredValidator} from "../../../utils/validators/requiredValidation";
import {maxLengthValidator} from "../../../utils/validators/textLengthValidation";

const ProfileInfo = (props) => {
    let [editMode, setEditMode] = useState(false);
    const onPhotoSelected = (e) =>{
        if(e.target.files.length > 0)
        {
            let file = e.target.files[0];
            props.savePhoto(file);
        }

    };

    const onEditButtonClicked = () => {
        setEditMode(true);
    }

    if(!props.profile){
        return <Preloader />
    }
    return (
        <div className={cssModule.container}>
            <div className={cssModule.descriptionBlock}>
                <div className={cssModule.avatar}>
                    <div>
                        <img src={props.profile.photos.large || userPhoto}/>
                    </div>
                    <div>
                        {props.isProfileOwner && <input type="file" onChange={onPhotoSelected} />}
                    </div>
                </div>
                <div className={cssModule.nameStatus}>
                    <div className={cssModule.name}>
                        {props.profile.fullName}
                    </div>
                    <div className={cssModule.status}>
                        {props.profile.lookingForAJobDescription}
                    </div>
                    <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
                </div>
                {
                    editMode
                        ? <ContactsDataForm contacts={props.profile.contacts}/>
                        : <ContactsData contacts={props.profile.contacts}
                                        onEditButtonClicked={onEditButtonClicked}
                                        isOwner={props.isProfileOwner}/>
                }
            </div>
        </div>
    );
}

const ContactsData = ({contacts, onEditButtonClicked, isOwner}) => {
    return (
        <div className={cssModule.contacts}>
            <ul>
                {Object.keys(contacts).map(x => {
                    return (<li>
                        <Contact contactName={x} contactValue={contacts[x]} />
                        </li>)
                })}
            </ul>
            {isOwner && <div>
                <button onClick={onEditButtonClicked}>Edit</button>
            </div> }
        </div>
    );
}

const ContactsDataForm = ({contacts}) => {
    return (
        <Formik
            initialValues={{x : contacts[x]}}
            onSubmit={(values) => {alert(JSON.stringify(values, null, 2));}}>
            {
                (props) => (
                    <Form>
                <div className={cssModule.contacts}>
                 <ul>
                    {
                        Object.keys(contacts).map(x => {
                         return <li>
                             <ContactInEditMode contactName={x} contactValue={contacts[x]} />

                    </li>
                })
            }
            </ul>
            <button type="submit">Submit</button>
        </div>
                    </Form>
                )
            }
        </Formik>
    );
}

const Contact = ({contactName,contactValue}) => {
    const firstLetterCapital = (word) => {
        let firstLetter = word.charAt(0);
        let rest = word.slice(1);
        return `${firstLetter.toUpperCase()}${rest}`
    }

    return (
        <div>
            {firstLetterCapital(contactName)}:{contactValue}
        </div>
    );
}

const ContactInEditMode = ({contactName,contactValue}) => {
    const firstLetterCapital = (word) => {
        let firstLetter = word.charAt(0);
        let rest = word.slice(1);
        return `${firstLetter.toUpperCase()}${rest}`
    }

    return (
        <span>{
            firstLetterCapital(contactName)}:{<Field
            type={contactName}
            name={contactName}
            component={Input}
            value={contactValue}
            validate={validatorMiddleware([maxLengthValidator(20)])}/>
        }
        </span>
    );
}

export default ProfileInfo;