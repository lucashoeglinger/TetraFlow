import { useState } from "react";

const useGyroscope = () => {
    const [isCalibrate, setIsCalibrate] = useState(false);

    return [isCalibrate, setIsCalibrate]
}

export default useGyroscope