export const setSecondsLeft = secondsLeft => {
  return {
    type: "SET_SECONDS_LEFT",
    secondsLeft
  };
};

export const beginCountdown = seconds => {
  return {
    type: "BEGIN_COUNTDOWN",
    seconds
  };
};
