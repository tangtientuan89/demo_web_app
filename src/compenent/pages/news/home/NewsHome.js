import React, { Component } from 'react'
import ReactQuill from '../../admin/reactQuill/ReactQuill'

export default class NewsHome extends Component {
    render() {
        return (
            <div>
                {/* <CKEditor/> */}
                <ReactQuill/>
            </div>
        )
    }
}
