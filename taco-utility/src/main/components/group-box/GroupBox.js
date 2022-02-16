import React from 'react'
import './GroupBox.css'

function GroupBox(props) {
    return (
        <div className="groupBox">
            <div className="groupBoxTitle">{props.title}</div>
            <div className="groupBoxContent">
                {props.content}
            </div>
        </div>
    )
}

export default GroupBox
