import {createContext, useContext, useState} from 'react';

export const GyroContext = createContext();

export const GyroProvider = ({children}) => {
 const [gyroData, setGyroData] = useState({alpha: 0, beta: 0, gamma: 0});

 return(
    <GyroContext.Provider value={{gyroData, setGyroData}}>
        {children}
    </GyroContext.Provider>
 );
}
export const useGyroData = () => {
    const context = useContext(GyroContext);
    if(!context){
        throw new Error("Context is not availbale");
    }
    return context;
}