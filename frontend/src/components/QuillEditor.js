import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({ value, onEditorChange }) => {
    const handleChange = (content) => {
        onEditorChange(content);
    };

    return (
        <div style={{ whiteSpace: 'pre-wrap' }}>
            <ReactQuill
                modules={QuillEditor.modules}
                theme="snow"
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}

QuillEditor.modules = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};

export default QuillEditor