import React, {useState} from "react";
import {connect} from "react-redux";
import {setTextContent} from "../../../redux/single-person-reducer";
import {Editor} from 'react-draft-wysiwyg';
import {ContentState, convertToRaw, EditorState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditorContainer = (props) => {
    const contentBlock = htmlToDraft(props.content);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);

    const [content, setEditorState] = useState(editorState);

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };
    const onEditorSave = (event, editorState) => {
        let textContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        props.setTextContent(props.personID, textContent);
    }
    return (
        <Editor
            editorState={content}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
            onBlur={onEditorSave}
        />

    );
}

const mstp = (state) => {
    return {
        content: state.personReducer.person.textContent,
        personID: state.personReducer.person.id
    }
}
export default connect(mstp, {setTextContent})(EditorContainer);