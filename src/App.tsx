import React from "react";
import "./App.css";
import Timer from "./Timer";
import { Record } from "./components/Record";
import formatTime_func from "./utils/formatTime_func";
import ConfettiExplosion from "react-confetti-explosion";
// import Slider from "./components/Slider";

function App() {
    // const [value, setValue] = React.useState<number>(150);
    const [value, setValue] = React.useState<number>(
        Number(localStorage.getItem("my_range")) ? Number(localStorage.getItem("my_range")) : 150
    );
    const [todayResult, setTodayResult] = React.useState<number>(0);
    const [decreasingValue, setDecreasingValue] = React.useState<number>(0);
    const [isTimerStarting, setIsTimerStarting] = React.useState<boolean>(false);
    const [isPopupOpen, setPopupOpen] = React.useState<boolean>(false);
    const [vibrateTimes, setVibrateTimes] = React.useState<any>([]);

    const [isExploding, setIsExploding] = React.useState<boolean>(false);

    //1 Эта переменная нужна для записи моего рекорда сколько я смог простоять в планке
    const [recordTime, setRecordTime] = React.useState<number>(
        Number(localStorage.getItem("my_time_record"))
            ? Number(localStorage.getItem("my_time_record"))
            : 0
    );

    const [finalTime, setFinalTime] = React.useState(0);

    const startTimer = () => {
        setIsTimerStarting(true);
        setPopupOpen(false);
        let oldValue = Number(value);
        let vibrateTimes = [];
        for (let i = 1; value > 0; i++) {
            console.log("old value is:", oldValue, "vibrate times is:", vibrateTimes);
            if (oldValue - 60 >= 0) {
                vibrateTimes.push(oldValue - 60);
                oldValue = oldValue - 60;
            } else {
                break;
            }
            // const element = array[i];
        }
        console.log("your vibrate intervals is:", vibrateTimes);
        setVibrateTimes(vibrateTimes);
    };

    React.useEffect(() => {
        localStorage.setItem("my_range", String(value));
    }, [value]);

    React.useEffect(() => {
        if (decreasingValue == 0) {
            window.navigator.vibrate(3000);
            console.log("Final Vibrate!!!");
        } else if (vibrateTimes.includes(decreasingValue)) {
            window.navigator.vibrate(500);
            console.log("Vibrate!!!");
        }
    }, [decreasingValue]);

    React.useEffect(() => {
        if (isTimerStarting == true) {
            // startTimer();
            setFinalTime(value);
        } else {
            if (decreasingValue && finalTime) {
                setPopupOpen(true);
                let myTimeRecord = Number(localStorage.getItem("my_time_record"));
                let didTime = finalTime - decreasingValue + 1;
                if (!myTimeRecord) {
                    localStorage.setItem("my_time_record", String(didTime));
                    setRecordTime(didTime);
                } else if (didTime > myTimeRecord) {
                    localStorage.setItem("my_time_record", String(didTime));
                    setRecordTime(didTime);
                }
                console.log("doneTime is:", didTime, ", final time is:", finalTime);
            }
        }
    }, [isTimerStarting]);

    return (
        <div className="App min-h-screen w-[200px] mx-auto relative text-text-color">
            <h1 className="pb-2 pt-2">My Record: {formatTime_func(recordTime)}</h1>
            <Timer
                value={value}
                setValue={setValue}
                isTimerStarting={isTimerStarting}
                decreasingValue={decreasingValue}
                setDecreasingValue={setDecreasingValue}
                setIsTimerStarting={setIsTimerStarting}
                setIsExploding={setIsExploding}
            />
            {isTimerStarting ? (
                <div className="mt-4 text-xl">
                    {/* {Math.floor(decreasingValue / 60)} :{" "}
                    {(decreasingValue % 60).toString().padStart(2, "0")} */}
                    {formatTime_func(decreasingValue)}
                </div>
            ) : (
                <p className="mt-4 text-xl">{formatTime_func(value)}</p>
            )}

            <Record value={value} setValue={setValue} isTimerStarting={isTimerStarting} />
            {isTimerStarting ? (
                <button
                    onClick={() => {
                        setIsTimerStarting(false);
                        console.log("today result is:", todayResult);
                    }}
                    type="button"
                    className="text-bg-color bg-text-color hover:bg-text-color/80   font-medium rounded-lg text-sm px-5 py-2.5 w-full absolute top-[315px] left-0 right-0"
                >
                    Stop
                </button>
            ) : (
                <button
                    onClick={() => startTimer()}
                    type="button"
                    className="text-bg-color bg-text-color hover:bg-text-color/80   font-medium rounded-lg text-sm px-5 py-2.5 w-full absolute top-[315px] left-0 right-0 z-2"
                >
                    Start
                </button>
            )}

            {isPopupOpen && (
                <div className="absolute z-4 top-2 rounded bg-bg-color/90 p-2 border-text-color border w-full">
                    {/* <p>Your result is: {formatTime_func(finalTime + (decreasingValue - 1))}</p> */}
                    <p className="text-left">
                        You wanted: <span className="font-bold">{formatTime_func(finalTime)}</span>
                    </p>
                    <p className="text-left py-2">
                        You did:{" "}
                        <span className="font-bold">
                            {formatTime_func(finalTime - decreasingValue)}
                        </span>
                    </p>
                    {decreasingValue == 0 && <p className="text-left pb-2">Congratulations!</p>}
                    <button
                        className="text-bg-color bg-text-color hover:bg-text-color/80   font-medium rounded-lg text-sm px-5 py-2.5 w-fit "
                        onClick={() => setPopupOpen(false)}
                    >
                        Close
                    </button>
                </div>
            )}

            {isExploding && (
                <ConfettiExplosion
                    duration={2200}
                    particleCount={250}
                    width={1000}
                    height={"120vh"}
                    force={0.5}
                />
            )}
        </div>
    );
}

export default App;

