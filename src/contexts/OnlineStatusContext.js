import { createContext, useContext, useState } from "react";

const OnlineStatusContext = createContext();
const OnlineStatusSetterContext = createContext();

export const OnlineStatusProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  return (
    <OnlineStatusContext.Provider value={isOnline}>
      <OnlineStatusSetterContext.Provider value={setIsOnline}>
        {children}
      </OnlineStatusSetterContext.Provider>
    </OnlineStatusContext.Provider>
  );
};

export const useIsOnline = () => useContext(OnlineStatusContext);
export const useSetIsOnline = () => useContext(OnlineStatusSetterContext);
