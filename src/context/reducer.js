const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_RATE":
      return {
        ...state,
        rate: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
