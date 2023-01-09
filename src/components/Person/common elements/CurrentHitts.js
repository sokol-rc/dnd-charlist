import React from "react";
import TextField from "@material-ui/core/TextField";

class CurrentHitts extends React.Component {

    state = {
        editMode: false,
        inputValue: ''
    }

    activateEditMode() {
        this.setState({
            editMode: true,
            inputValue: this.props.hp
        })
    }

    deactivateEditMode() {
        this.setState({
            editMode: false
        });
        this.props.setCurrentHP(this.props.hp, this.state.inputValue, this.props.personID)


    }

    changeHP = (e) => {
        this.setState({
            inputValue: e.currentTarget.value
        })
    }
    calculateHP = (e) => {
        try {
            let newValue = e.currentTarget.value;
            if (!isNaN(parseInt(newValue)) && isFinite(newValue)) {
                this.setState({
                    inputValue: newValue
                })
            }

        } catch (e) {
        }

    }

    render() {
        return (
            <>
                {!this.state.editMode &&
                <div className="mainStatValue" onClick={this.activateEditMode.bind(this)}>
                    {this.props.hp}
                </div>
                }
                {this.state.editMode &&
                <>
                    <TextField id="standard-basic" autoFocus={true} onChange={this.calculateHP}
                               onBlur={this.deactivateEditMode.bind(this)}/>
                </>
                }
            </>
        )
    }
}

export default CurrentHitts;