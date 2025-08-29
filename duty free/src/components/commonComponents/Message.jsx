import { IoCloseSharp } from 'react-icons/io5'

const Message = ({ handleclose, responseStatus, message }) => {
    
    return (
        <>
            <div className={`${responseStatus ? "alertsuccess" : "alertfail"} d-flex justify-content-between align-items-center text-white p-2 rounded-2 mb-3`}>
                <p className='m-0'>{message}</p>
                <button onClick={handleclose} className='bg-transparent border-0 text-white'><IoCloseSharp /></button>
            </div>
            </>
    )
}

export default Message