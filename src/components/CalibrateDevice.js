import useGyroStats from "../hooks/useGyroStats";

const CalibrateDevice = ({onToMenu }) => {
    const [gyroData, setGyroData] = useGyroStats();
    function ta(message){
        document.getElementById("ta").innerText = message;
    }
    const calibrateDevice = (event) => {
        const {alpha, beta, gamma} = event;

        console.log({alpha, beta, gamma})

        calibrateGyro(alpha, beta, gamma);
    }
    const calibrateGyro = (alpha, beta, gamma) => {
        setGyroData({alpha: alpha, beta: beta, gamma: gamma});

        alert("calibrated", gyroData);
    }
    const startCalibration = () => {
        if(typeof DeviceOrientationEvent.requestPermission === 'function'){
            DeviceOrientationEvent.requestPermission()
                                    .then((permission) => {
                                        if(permission === 'granted'){
                                            document.addEventListener("deviceorientationevent", calibrateDevice);
                                            ta("Please hold your phone naturally it will get calibrated shortly");
                                        } else{
                                            ta("You denied us permission to use your gyroscope, why :(")
                                        }
                                    })
        }else if('DeviceOrientationEvent' in window){
            ta("Permission was given automatically, glad you are not a apple device :)")
            document.addEventListener("deviceorientation", calibrateDevice)
        } else{
            ta("You dont have a gyroscope, big L")
            console.log("no gyro")
        }
    }

  return (
    <div className="Highscore absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 text-white">
      <h1 className="text-3xl font-bold mb-4">Game Over</h1>
      <textarea id="ta"  style={{
            border: "1px solid orange",
            backgroundColor: "#ffc",
            padding: "0.5em",
            borderLeftWidth: "0.5em",
            fontFamily: '"Courier New", monospace',
            fontSize: "0.8em",
            margin: "0.5em 0px",
            height: "10em",
        }}>
      </textarea>

      <div className="flex flex-col items-center mb-4">
      </div>
      <button 
      className="bg-blue-500 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded mt-4 mb-3"
      onClick={startCalibration}>
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