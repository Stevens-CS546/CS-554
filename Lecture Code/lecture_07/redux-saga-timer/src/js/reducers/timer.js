const initialState = {
  secondsLeft: 0
};

export default function timer(state = initialState, action) {
  switch (action.type) {
    case "SET_SECONDS_LEFT":
      return {
        ...state,
        secondsLeft: action.secondsLeft
      };
    default:
      return state;
  }
}
