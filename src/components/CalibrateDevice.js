import { useGyroData } from "../contexts/GyroContext";

const CalibrateDevice = ({onToMenu }) => {
    const {gyroData, setGyroData, isEnabled, setIsEnabled} = useGyroData();

    const round = (value, comma) => {
        return Math.round(Math.pow(10,comma)*value)/Math.pow(10,comma);
    }
    const calibrateDevice = (event) => {
        const {alpha, beta, gamma} = event;

        calibrateGyro(alpha, beta, gamma);
    }
    const calibrateGyro = (alpha, beta, gamma) => {
        const a = round(alpha, 1);
        const b = round(beta, 1)
        const g = round(gamma, 1)
        setTimeout(() => {
            setGyroData({alpha: a, beta: b, gamma: g});
        }, 1000);
    }
    const enableGyroscope = () => {
      setIsEnabled(!isEnabled);
    }
    const startCalibration = () => {
        if(typeof DeviceOrientationEvent.requestPermission === 'function'){
            DeviceOrientationEvent.requestPermission()
                                    .then((permission) => {
                                        if(permission === 'granted'){
                                            window.addEventListener("deviceorientation", calibrateDevice);
                                        } 
                                    })
        }else if('DeviceOrientationEvent' in window){
            window.addEventListener("deviceorientation", calibrateDevice)
        }
    }

  return (
    <div className="Highscore absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 text-white">
      <h1 className="text-3xl font-bold mb-4">Gyroscope</h1>

      <div className="flex flex-col items-center mb-4">
      </div>
      <button className="bg-blue-500 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded mt-4 mb-3"
              onClick={enableGyroscope} >
                Enable Gyroscope
      </button>
      <button 
      className={`text-white font-bold py-2 px-4 rounded mt-4 mb-3 ${
        isEnabled
          ? "bg-blue-500 hover:bg-blue-950"
          : "bg-gray-400 cursor-not-allowed"
      }`}
      onClick={startCalibration}
      disabled={!isEnabled}>
        Start Caliibration
      </button>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={onToMenu}
      >
        Back to menu
      </button>
    </div>
  );
};

export default CalibrateDevice;