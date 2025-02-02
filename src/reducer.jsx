


export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);
  

export const initialState = {
    
    basket: [],
    user: null,
  };

  export const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_BASKET':
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
      case 'REMOVE_FROM_BASKET':
        // Clone the basket and remove the item
        const index = state.basket.findIndex(basketItem => basketItem.id === action.id);
        let newBasket = [...state.basket];
  
        if (index >= 0) {
          // Item exists in the basket
          newBasket.splice(index, 1);
        } else {
          console.warn(`Can't remove product (id: ${action.id}) as it's not in the basket!`);
        }
  
        return {
          ...state,
          basket: newBasket,
        };

      case 'SET_USER':
        return {
         ...state,
          user: action.user,
        };  
      
      default:
        return state;
    }
  };
  
export default reducer;