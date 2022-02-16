import React from 'react'
import './CloudTitle.css'

function CloudTitle(props) {
    return (
        <div className="cloudtitle">
            <div className="cloudtitletext">
                <h2>{props.title}</h2>
            </div>
        </div>
    )
}

export default CloudTitle
