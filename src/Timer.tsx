import React, { useState, useEffect, useCallback } from "react";

interface Props {
    setValue: any;
    value: any;
    isTimerStarting: boolean;
    decreasingValue: any;
    setDecreasingValue: any;
    setIsTimerStarting: any;
    setIsExploding: any;
}

const Timer: React.FC<Props> = ({
    isTimerStarting,
    setValue,
    value,
    decreasingValue,
    setDecreasingValue,
    setIsTimerStarting,
    setIsExploding,
}) => {
    const [time, setTime] = useState(0);
    // const [finalTime, setFinalTime] = useState(0);
    // const [doneTime, setDoneTime] = useState(0);
    // const [inputTime, setInputTime] = useState(60); // Время по умолчанию в секундах
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                if (time <= 1) {
                    setTime((prevTime) => prevTime - 1);
                    clearInterval(interval);
                    setIsRunning(false);
                    setIsTimerStarting(false);
                    setIsExploding(true);
                    setTimeout(() => {
                        setIsExploding(false);
                    }, 5000);
                } else {
                    setTime((prevTime) => prevTime - 1);
                }
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [time, isRunning]);

    useEffect(() => {
        setDecreasingValue(time);
    }, [time]);

    // let circleStyle = {
    //     // background: `blue` /* цвет */,
    //     // animation: `progress ${inputTime}s cubic-bezier(.25, .4, .75, .6) infinite` /* скорость анимации */,
    // };

    let circleStyle = {
        // backgroundColor: `blue` /* цвет */,
        // backgroundColor: "rgb(97, 218, 251)",
        animation: `progress ${value}s cubic-bezier(.25, .4, .75, .6) 1` /* скорость анимации */,
        // border: "rgb(214, 40, 40)",
    };

    const startTimer = () => {
        resetTimer();
        setTimeout(() => {
            if (value > 0) {
                setTime(value);
                setIsRunning(true);
            }
        }, 10);
    };

    const resetTimer = () => {
        setTime(0);
        setIsRunning(false);
    };

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const newValue = parseInt(event.target.value);
    //     setInputTime(newValue >= 1 ? newValue : 1);
    // };

    useEffect(() => {
        if (isTimerStarting == true) {
            startTimer();
            // setFinalTime(value);
        } else {
            // setDoneTime(time);
            setIsRunning(false);

            // if (doneTime && finalTime) {
            //     console.log("doneTime is:", doneTime, ", final time is:", finalTime);
            // }
        }
    }, [isTimerStarting]);

    return (
        <div className="min-h-[140px]">
            <div className="flex flex-col items-center">
                {/* <div
                    className={`w-24 h-24  rounded-full border-4 relative flex-auto ${
                        !isRunning ? "border-text-color" : "border-third-color"
                    }`}
                > */}
                <div
                    className={`w-[138px] h-[138px]  rounded-full border-4 relative flex-auto ${
                        !isRunning ? "border-text-color" : "border-third-color"
                    }`}
                >
                    <div
                        className={`w-[138px] h-[138px] top-[-4px] right-[-4px] rounded-full absolute border-4 ${
                            !isRunning ? "border-text-color" : "border-third-color bg-four-color"
                        }`}
                        style={isRunning ? circleStyle : {}}
                    ></div>
                    {/* <div className="w-24 h-24  rounded-full absolute border-4 border-gray-300 " style={isRunning ? circleStyle : {}}></div> */}
                </div>
                {/* {isTimerStarting ? (
                    <div className="mt-4 text-xl">
                        {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
                    </div>
                ) : (
                    <div></div>
                )} */}

                {/* <div className="mt-4">
                    <input
                        type="number"
                        value={inputTime}
                        onChange={handleInputChange}
                        min="1"
                        max="86400" // 86400 секунд = 24 часа
                    />
                    <button onClick={startTimer}>Start</button>
                    <button onClick={resetTimer}>Reset</button>
                </div> */}
            </div>
        </div>
    );
};

export default Timer;
