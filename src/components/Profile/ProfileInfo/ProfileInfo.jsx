import cssModule from "./ProfileInfo.module.css";
import Preloader from "../../Common/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/images.png"
import {useState} from "react";
import {Field, Form, Formik} from "formik";
import {validatorMiddleware} from "../../../utils/helpers/validatorMiddleware";
import {maxLengthValidator} from "../../../utils/validators/textLengthValidation";
import {ValidationErrors} from "../../Common/ValidationErrors";

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

    const onSubmit = (values, setErrors) => {
        console.log("OnSubmitRendered")
        let profileData = {}
        profileData.userId = props.profile.userId;
        profileData.aboutMe = values.aboutMe;
        profileData.lookingForAJob = values.lookingForAJob;
        profileData.lookingForAJobDescription = values.lookingForAJobDescription;
        profileData.fullName = values.fullName;
        let contactKeys = Object.keys(props.profile.contacts)
        let contacts = {};
        for (let i = 0; i < contactKeys.length; i ++)
            contacts[contactKeys[i]] = values[contactKeys[i]]
        profileData.contacts = contacts;
        props.saveProfileData(profileData,setErrors).then((x) => {
            setEditMode(!x);
        });
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
                    <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus} isProfileOwner={props.isProfileOwner}/>
                </div>
                {
                    editMode
                        ? <ContactsDataForm contacts={props.profile.contacts}
                                            onSubmit={onSubmit}
                                            aboutMe={props.profile.aboutMe}
                                            lookingForAJobDescription={props.profile.lookingForAJobDescription}
                                            lookingForAJob={props.profile.lookingForAJob}
                                            fullName={props.profile.fullName}/>
                        : <ContactsData contacts={props.profile.contacts}
                                        onEditButtonClicked={onEditButtonClicked}
                                        isOwner={props.isProfileOwner}
                                        />
                }
            </div>
        </div>
    );
}

const ContactsData = ({contacts, onEditButtonClicked, isOwner, props}) => {
    return (
        <div className={cssModule.contacts}>
            <ul>
                {Object.keys(contacts).map(x => {
                    return (<li key={x}>
                        <Contact contactName={x} contactValue={contacts[x]} />
                        </li>)
                })}
            </ul>
            {isOwner && <div>
                <button onClick={onEditButtonClicked}>Edit</button>
            </div> }
{/*            {
                !props.errors.apiErrors ? <></> : <ValidationErrors errors={props.errors.apiErrors}/>
            }*/}
        </div>
    );
}

const ContactsDataForm = ({contacts, onSubmit, aboutMe, lookingForAJobDescription, lookingForAJob, fullName}) =>{
    return (
        <Formik
            initialValues={{...contacts, aboutMe, lookingForAJobDescription, lookingForAJob, fullName}}
            onSubmit={(values, submitProps) => onSubmit(values, submitProps.setErrors)}>
            {
                (props) => (
                    <Form>
                        <div>
                            Full name :
                            <Field component="input"
                                   name="fullName"
                                   validate={() => validatorMiddleware([maxLengthValidator(20)])(props.values.aboutMe)}
                                   value={props.values.fullName}
                            />
                            {props.errors.fullName && props.touched.fullName && <ValidationErrors errors={props.errors.fullName} />}
                        </div>
                        <div>
                            About me :
                            <Field component="input"
                                   name="aboutMe"
                                   validate={() => validatorMiddleware([maxLengthValidator(20)])(props.values.aboutMe)}
                                   value={props.values.aboutMe}
                                    />
                            {props.errors.aboutMe && props.touched.aboutMe && <ValidationErrors errors={props.errors.aboutMe} />}
                        </div>
                        <div>
                            Are you looking for a job?
                            <label>
                                <Field type="checkbox"
                                       name="lookingForAJob"
                                />
                            </label>
                            {props.errors.lookingForAJob && props.touched.lookingForAJob && <ValidationErrors errors={props.errors.lookingForAJob} />}
                        </div>
                        <div>
                            My professional skills:
                            <Field component="input"
                                   name="lookingForAJobDescription"
                                   validate={() => validatorMiddleware([maxLengthValidator(20)])(props.values.lookingForAJobDescription)}
                                   value={props.values.lookingForAJobDescription}
                            />
                            {props.errors.lookingForAJobDescription && props.touched.lookingForAJobDescription && <ValidationErrors errors={props.errors.lookingForAJobDescription} />}
                        </div>
                        <div className={cssModule.contacts}>
                            <ul>{
                                    Object.keys (contacts).map (x => {
                                        return <li key={x}>
                                            <ContactInEditMode {...props} contactName={x} errors={props.errors[x]} touched={props.touched[x]} value={props.values[x]}/>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                        <button type="submit">Submit</button>
                        {
                            !props.errors.apiErrors ? <></> : <ValidationErrors errors={props.errors.apiErrors}/>
                        }
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

const ContactInEditMode = ({contactName,errors, touched,value}) => {
    const firstLetterCapital = (word) => {
        let firstLetter = word.charAt(0);
        let rest = word.slice(1);
        return `${firstLetter.toUpperCase()}${rest}`
    }

    return (
        <div>
            <div>
                {firstLetterCapital(contactName)}:
            </div>
            <div>
                <Field type={contactName}
                       name={contactName}
                       validate={() => validatorMiddleware([maxLengthValidator(20)])(value)}
                       value={value}
                       component="input"/>
               {errors && touched && <ValidationErrors errors={errors} />}
            </div>
        </div>
    );
}

export default ProfileInfo;