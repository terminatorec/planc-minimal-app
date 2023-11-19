const formatTime_functsts = (timer: number) => {
    // было 150 сек
    let seconds = String(timer % 60); //сек будет 30 правильно
    seconds = Number(seconds) == 0 ? "00" : seconds;
    seconds = seconds.length == 1 ? "0" + seconds : seconds;
    let minutes = String(Math.floor(timer / 60)); //2 minutes будет правильно
    minutes = minutes.length == 1 ? "0" + minutes : minutes;

    // timer = timer - (seconds*60)    //
    // let minutes =

    let result = minutes + " : " + seconds;
    return result;
};

export default formatTime_functsts;
