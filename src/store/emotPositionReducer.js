const initialState = {
  positions: {},
};

const emotPositionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EMOT_POSITION':
      return {
        ...state,
        positions: {
          ...state.positions,
          [action.payload.id]: action.payload.position,
        },
      };
    default:
      return state;
  }
};

export default emotPositionReducer;
