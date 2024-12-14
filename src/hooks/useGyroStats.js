import { useState } from "react";

const useGyroStats = () => {
    const [gyroData, setGyroData] = useState({alpha: 0, beta: 0, gamma: 0});

    return [gyroData, setGyroData];
}
export default useGyroStats