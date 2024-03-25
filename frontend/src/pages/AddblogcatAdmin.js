import React from 'react'

const Addblogcat = () => {
    return (
        <div>
            <h3 className="mb-4">Thêm loại bài đăng</h3>
            <div className="">
                <form action="">
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title"> Tên </h5>
                        </div>
                        <input type="text"
                            className="brandname-input"
                            value=""
                            onChange=""
                        />
                    </div>
                    <button className="btn btn-success border-0 rounded-3 my-2" type="submit">
                        Thêm mới
                    </button>
                </form>
            </div>
        </div>

    )
}

export default Addblogcat