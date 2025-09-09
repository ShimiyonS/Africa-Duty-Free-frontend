import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

import CustomAlert from '../components/commonComponents/CustomAlert';
import { useLocation } from 'react-router-dom';
const MyContext = createContext();
const MyProvider = ({ children }) => {
    const [showAlert, setShowAlert] = useState("");
    const [adminSidebarToggle, setAdminSidebarToggle] = useState(false)
    const location = useLocation()

    const handleAdminToggle = () => {
        setAdminSidebarToggle(!adminSidebarToggle)
    }

    const handleOpenAlert = (item) => {
        setShowAlert(item)
    }

    useEffect(() => {
        setAdminSidebarToggle(false)
    }, [location])

    useEffect(() => {
        setTimeout(() => {
            setShowAlert("")
        }, [6000])
    }, [showAlert])
    return (
        <MyContext.Provider value={{ handleOpenAlert, adminSidebarToggle, handleAdminToggle }}>
            {showAlert ? <CustomAlert data={showAlert} /> : ""}
            {children}
        </MyContext.Provider >)
}
export default MyProvider
export function useMyContext() {
    return useContext(MyContext);
}
