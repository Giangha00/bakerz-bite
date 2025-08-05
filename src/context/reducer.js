const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const item = action.payload;
      const exist = state.cart.find((p) => p.id === item.id);
      let newCart;
      if (exist) {
        newCart = state.cart.map((p) =>
          p.id === item.id
            ? {
                ...p,
                qty: p.qty + item.qty,
                total_price: (p.qty + item.qty) * p.price,
              }
            : p
        );
      } else {
        newCart = [
          ...state.cart,
          { ...item, total_price: item.qty * item.price },
        ];
      }
      return { ...state, cart: newCart };
    }
    case "INCREASE_QTY": {
      const newCart = state.cart.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              qty: item.qty + 1,
              total_price: (item.qty + 1) * item.price,
            }
          : item
      );
      return { ...state, cart: newCart };
    }

    case "DECREASE_QTY": {
      const newCart = state.cart.map((item) =>
        item.id === action.payload && item.qty > 1
          ? {
              ...item,
              qty: item.qty - 1,
              total_price: (item.qty - 1) * item.price,
            }
          : item
      );
      return { ...state, cart: newCart };
    }

    case "UPDATE_CART":
      return {
        ...state,
        rate: action.payload,
      };
    case "REMOVE_CART":
      return {
        ...state,
        cart: state.cart.filter((p) => p.id !== action.payload),
      };
    case "CLEAR_CART": {
      return { ...state, cart: [] };
    }

    default:
      return state;
  }
};

export default reducer;
