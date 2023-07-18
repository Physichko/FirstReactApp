import React, {useEffect, useState} from "react";

const ProfileStatusWithHooks = (props) => {
    let [isEditMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () =>{
        props.updateUserStatus(status);
        setEditMode(false);
    }

    const statusChanged = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            { !isEditMode &&
                    <div>
                        <span onDoubleClick={activateEditMode}>{ props.status || "-------"}</span>
                    </div>
            }
            {
                isEditMode &&
                <div>
                    <input autoFocus={true} onChange={statusChanged} onBlur={deactivateEditMode} value={status}/>
                </div>
            }
        </div>
    );
};

export default ProfileStatusWithHooks;