import React, { useState, useRef } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { GrCopy, GrCut } from "react-icons/gr";
import { MdContentPasteOff, MdContentPaste } from "react-icons/md";

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
        <path
            className="ql-stroke"
            d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
        />
    </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
        <path
            className="ql-stroke"
            d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
        />
    </svg>
);

const CustomToolbar = ({ quillRef }) => {
    const handleLowercase = (e) => {
        e.preventDefault();
        const quill = quillRef.current.getEditor();
        const selection = quill.getSelection();
        if (selection) {
            const text = quill.getText(selection.index, selection.length);
            quill.insertText(selection.index, text.toLowerCase());
            quill.deleteText(selection.index + text.length, selection.length);
        }
    };

    const handleUppercase = (e) => {
        e.preventDefault();
        const quill = quillRef.current.getEditor();
        const selection = quill.getSelection();
        if (selection) {
            const text = quill.getText(selection.index, selection.length);
            quill.insertText(selection.index, text.toUpperCase());
            quill.deleteText(selection.index + text.length, selection.length);
        }
    };

    const handleLowercase1 = (e) => {
        e.preventDefault();
        const quill = quillRef.current.getEditor();
        const selection = quill.getSelection();
        if (selection) {
            const text = quill.getText(selection.index, selection.length);
            const newText = text
                .split(' ')
                .map(word => {
                    // Kiểm tra nếu từ đó đã được viết hoa
                    if (word === word.toUpperCase()) {
                        return word.charAt(0) + word.slice(1).toLowerCase();
                    } else {
                        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                    }
                })
                .join(' ');

            quill.insertText(selection.index, newText);
            quill.deleteText(selection.index + newText.length, selection.length);
        }
    };

    const handleLowercase2 = (e) => {
        e.preventDefault();
        const quill = quillRef.current.getEditor();
        const selection = quill.getSelection();
        if (selection) {
            const text = quill.getText(selection.index, selection.length);
            const newText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
            quill.insertText(selection.index, newText);
            quill.deleteText(selection.index + newText.length, selection.length);
        }
    };

    return (
        <div className="custom-quill-toolbar">
            <button onClick={handleLowercase}>Lowercase</button>
            <button onClick={handleUppercase} style={{ marginLeft: '70px' }}>Uppercase</button>
            <button onClick={handleLowercase1} style={{ marginLeft: '70px' }}>Lowercase1</button>
            <button onClick={handleLowercase2} style={{ marginLeft: '70px' }}>Lowercase2</button>
        </div>
    );
};

const Addblog = () => {
    const [desc, setDesc] = useState('');
    const quillRef = useRef(null);

    const handleDesc = (e) => {
        setDesc(e);
    };

    const modules = {
        toolbar: {
            container: "#toolbar", // Thêm container custom toolbar
        },
    };

    const [fontSize, setFontSize] = useState('16px');

    const handleFontSizeChange = (e) => {
        const newFontSize = e.target.value;
        setFontSize(newFontSize);

        // Lấy ra vị trí và độ dài của văn bản đã chọn
        const quill = quillRef.current.getEditor();
        const selection = quill.getSelection();
        if (selection) {
            const startIndex = selection.index;
            const endIndex = startIndex + selection.length;

            // Thay đổi kích thước font size của văn bản đã chọn
            quill.formatText(startIndex, endIndex - startIndex, 'size', newFontSize);
        }
    };

    return (
        <div>
            <div className="">
                <form action="">
                    <div id="toolbar">
                        <span className="ql-formats">
                            <button className="ql-bold" />
                            <button className="ql-italic" />
                            <button className="ql-underline" />
                            <button className="ql-strike" />
                        </span>
                        <span className="ql-formats">
                            <select className="ql-font">
                                <option value="arial"> Arial </option>
                                <option value="comic-sans">Comic Sans</option>
                                <option value="courier-new">Courier New</option>
                                <option value="georgia">Georgia</option>
                                <option value="helvetica">Helvetica</option>
                                <option value="Inter" selected>
                                    Inter
                                </option>
                                <option value="lucida">Lucida</option>
                            </select>
                            <select
                                className="ql-size"
                                value={fontSize}
                                onChange={handleFontSizeChange}
                            >
                                <option value="12px">12</option>
                                <option value="14px">14</option>
                                <option value="16px">16</option>
                                <option value="18px">18</option>
                                <option value="20px">20</option>
                                <option value="24px">24</option>
                            </select>
                            <select className="ql-header">
                                <option value="1">Heading 1</option>
                                <option value="2">Heading 2</option>
                                <option value="3">Heading 3</option>
                                <option value="4">Heading 4</option>
                                <option value="5">Heading 5</option>
                                <option value="6">Heading 6</option>
                                <option value="" selected>
                                    Normal
                                </option>
                            </select>
                        </span>
                        <span className="ql-formats">
                            <button className="ql-list" value="ordered" />
                            <button className="ql-list" value="bullet" />
                            <button className="ql-indent" value="-1" />
                            <button className="ql-indent" value="+1" />
                        </span>
                        <span className="ql-formats">
                            <button className="ql-script" value="super" />
                            <button className="ql-script" value="sub" />
                            <button className="ql-blockquote" />
                            <button className="ql-direction" />
                        </span>
                        <span className="ql-formats">
                            <select className="ql-align" />
                            <select className="ql-color" />
                            <select className="ql-background" />
                        </span>
                        <span className="ql-formats">
                            <button className="ql-link" />
                            <button className="ql-image" />
                            <button className="ql-video" />
                        </span>
                        <span className="ql-formats">
                            <button className="ql-formula" />
                            <button className="ql-code-block" />
                            <button className="ql-clean" />
                        </span>
                        <span className="ql-formats">
                            <button className="ql-undo">
                                <CustomUndo />
                            </button>
                            <button className="ql-redo">
                                <CustomRedo />
                            </button>
                        </span>
                        <span className="ql-formats">
                            <button className="ql-copy">
                                <GrCopy />
                            </button>
                            <button className="ql-cut">
                                <GrCut></GrCut>
                            </button>
                            <button className="ql-paste">
                                <MdContentPaste />
                            </button>
                            <button className="ql-paste-without-format">
                                <MdContentPasteOff />
                            </button>
                        </span>
                        <CustomToolbar quillRef={quillRef} />
                    </div>
                    <ReactQuill
                        theme="snow"
                        value={desc}
                        onChange={(value) => {
                            handleDesc(value);
                        }}
                        modules={modules}
                        ref={quillRef}
                    />
                </form>
            </div>
        </div>
    );
};

export default Addblog;
