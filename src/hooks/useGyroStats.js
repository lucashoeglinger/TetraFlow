import { useState } from "react";

const useGyroStats = () => {
    const [gyroData, setGyroData] = useState({alpha: 0, beta: 0, gamma: 0});
    const isEnabled = useState(false);

    return [gyroData, setGyroData, isEnabled];
}
export default useGyroStats