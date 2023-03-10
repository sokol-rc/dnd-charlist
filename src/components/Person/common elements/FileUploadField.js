import React, {Component} from 'react'

export default class FileUploadForm  extends Component{
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        const { input: { onChange } } = this.props;
        this.props.setNewAvatar(this.props.personID, e.target.files[0]);
        //onChange(e.target.files[0]);
    }
    render(){
        const { input: { value } } = this.props
        const {input,label, required, meta, } = this.props  //whatever props you send to the component from redux-form Field
        return(
            <div><label>{label}</label>
                <div>
                    <input
                        type='file'
                        accept='.jpg, .png, .jpeg'
                        onChange={this.onChange}
                    />
                </div>
            </div>
        )
    }
}