
import React, { createContext, useState, useContext } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [state, setState] = useState({
        name: 'John Doe',
        age: 30,
        email: 'alsdjk'
    });
    return (
        <MyContext.Provider value={{ state, setState }}>
            {children}
        </MyContext.Provider>
    );
}

export const useMyContext = () => useContext(MyContext);