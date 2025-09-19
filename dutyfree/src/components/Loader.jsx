import React from 'react'
import loader from "../assets/Spinner-3.gif"
const Loader = ({ className }) => {
    return (
        <div className={`${className}`}>
            <img src={loader} width={"50"} height={"50"} />
        </div>
    )
}

export default Loader