import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

import CustomAlert from '../components/commonComponents/CustomAlert';
const MyContext = createContext();
const MyProvider = ({ children }) => {
    const [showAlert, setShowAlert] = useState("");


    const handleOpenAlert = (item) => {
        setShowAlert(item)
    }

    useEffect(() => {
        setTimeout(() => {
            setShowAlert("")
        }, [6000])
    }, [showAlert])
    return (
        <MyContext.Provider value={{ handleOpenAlert }}>
            {showAlert ? <CustomAlert data={showAlert} /> : ""}
            {children}
        </MyContext.Provider >)
}
export default MyProvider
export function useMyContext() {
    return useContext(MyContext);
}
