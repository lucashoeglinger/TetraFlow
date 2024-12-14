import { useState } from "react";

const useGyroStats = () => {
    const [gyroData, setGyroData] = useState(null);

    return [gyroData, setGyroData];
}
export default useGyroStats