import React from "react";
import formatTime_func from "../utils/formatTime_func";

interface Props {
    setValue: any;
    value: any;
    isTimerStarting: boolean;
}

export const Record: React.FC<Props> = ({ value, setValue, isTimerStarting }) => {
    // const [value, setValue] = React.useState<number>(0);
    const timerInterval = React.useRef<NodeJS.Timeout | null>(null);
    // const [tempTime, setTempTime] = React.useState<number>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);
        setValue(newValue);
    };

    const handlePress = (symbol: string) => {
        if (symbol == "plus") {
            setValue((prevValue: any) => prevValue + 10);
            timerInterval.current = setInterval(() => {
                setValue((prevValue: any) => prevValue + 10);
            }, 100);
        } else if (symbol == "minus") {
            if (value - 10 >= 0) {
                setValue((prevValue: any) => prevValue - 10);
                let id = 0;
                timerInterval.current = setInterval(() => {
                    setValue((prevValue: any) => prevValue - 10);
                }, 100);
            }
        }
        console.log("Знак функции:", symbol, "new value is", value);
    };

    React.useEffect(() => {
        // setTempTime(value);
        if (value < 10) {
            setValue(10);
        }
        // else if (value > 3600) {
        //     setValue(3590);
        // }
    }, [value]);

    const handleRelease = () => {
        if (timerInterval.current) {
            clearInterval(timerInterval.current);
        }
    };

    return (
        <div>
            <div className="min-h-[93px]">
                {isTimerStarting ? (
                    <div></div>
                ) : (
                    <div>
                        {/* <p className="text-xl">{formatTime_func(value)}</p> */}
                        <input
                            type="range"
                            min={10}
                            max={600}
                            step={10}
                            value={value}
                            onChange={handleChange}
                            className="py-2 bg-bg-color h-9"
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onMouseDown={() => handlePress("minus")}
                                onMouseUp={handleRelease}
                                onMouseLeave={handleRelease}
                                onTouchStart={() => handlePress("minus")}
                                onTouchEnd={handleRelease}
                                type="button"
                                className="text-bg-color bg-text-color hover:bg-text-color/80   font-medium rounded-lg text-sm px-5 py-2.5 mb-2 "
                            >
                                -
                            </button>

                            <button
                                onMouseDown={() => handlePress("plus")}
                                onMouseUp={handleRelease}
                                onMouseLeave={handleRelease}
                                onTouchStart={() => handlePress("plus")}
                                onTouchEnd={handleRelease}
                                type="button"
                                className="text-bg-color bg-text-color hover:bg-text-color/80   font-medium rounded-lg text-sm px-5 py-2.5 mb-2 "
                            >
                                +
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
