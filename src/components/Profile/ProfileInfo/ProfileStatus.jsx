import React from "react";

//I will leave it like a class component like an example
class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        defaultStatusText : "here can be your status",
        status : this.props.status
    };

    activateEditMode() {
        this.setState(
            {
                editMode : true
            }
        );
    };

    deactivateEditMode() {
        this.setState(
            {
                editMode : false
            }
        );
        this.props.updateUserStatus(this.state.status);
    };

    onStatusChange(eventArgs) {
        this.setState({
            status : eventArgs.currentTarget.value
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.status !== this.props.status)
            this.setState({status:this.props.status})
    }

    render() {
        return (<div>
                {
                    !this.state.editMode
                        ? <div>
                            <span onDoubleClick={this.activateEditMode.bind(this)}>{ !this.props.status ? this.state.defaultStatusText : this.props.status}</span>
                        </div>
                        : <div>
                            <input autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.state.status} onChange={this.onStatusChange.bind(this)}/>
                        </div>
                }
            </div>
        );
    }
}

export default ProfileStatus;