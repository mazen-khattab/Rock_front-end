import React, { useEffect, useReducer, useContext, createContext } from "react";

type CartItem = {
  id: number,
  name: string,
  description: string,
  price: number,
  quantity: number,
  image: string,
  size: string,
  color: string,
  reserved: number,
}

type CartState = {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

type CartAction =
  | { type: 'ADD_ITEM', item: CartItem }
  | { type: 'REMOVE_ITEM', payload: { id: number, color: string, size: string } }
  | { type: 'INCREASE_QUANTITY', payload: { id: number, color: string, size: string } }
  | { type: 'DECREASE_QUANTITY', payload: { id: number, color: string, size: string } }

function cartReducer(state: CartState, action: CartAction) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        item => item.id === action.item.id &&
          item.color === action.item.color &&
          item.size === action.item.size
      );

      if (existing) {
        return {
          ...state,
          items: state.items.map(stateItem =>
            stateItem.id === action.item.id &&
              stateItem.color === action.item.color &&
              stateItem.size === action.item.size ?
              { ...stateItem, quantity: stateItem.quantity + action.item.quantity }
              : stateItem)
        }
      }
      return { ...state, items: [...state.items, action.item] };
    }

    case "REMOVE_ITEM": return {
      ...state, items: state.items.filter(item => item.id !== action.payload.id &&
        item.color !== action.payload.color &&
        item.size !== action.payload.size)
    }

    case "INCREASE_QUANTITY":
      return {
        ...state, items: state.items.map(item =>
          item.id === action.payload.id &&
            item.color === action.payload.color &&
            item.size === action.payload.size ?

            { ...item, quantity: item.quantity + 1 } : item
        )
      }

    case "DECREASE_QUANTITY":
      return {
        ...state, items: state.items.map(item =>
          item.id === action.payload.id &&
            item.color === action.payload.color &&
            item.size === action.payload.size ?

            { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        )
      }

    default:
      return state;
  }
}

const CartContext = createContext<{
  items: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, color: string, size: string) => void;
  increaseAmount: (id: number, color: string, size: string) => void;
  decreaseAmount: (id: number, color: string, size: string) => void;
}>({
  items: [],
  cartCount: 0,
  addToCart: () => { },
  removeFromCart: () => { },
  increaseAmount: () => { },
  decreaseAmount: () => { },
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const cartCount = state.items.reduce((count, item) => count + item.quantity, 0)

  // this useEffect is used to load all the items from loacl storage.
  useEffect(() => {
    const saved = localStorage.getItem('cart');

    if (saved) {
      try {
        const items = JSON.parse(saved);

        items.forEach((item: CartItem) => {
          dispatch({ type: 'ADD_ITEM', item: item });
        });
      } catch (e) {
        console.error('Failed to load cart');
      }
    }
  }, []);

  // this useEffect is used to save any new item in local storage.
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items))
  }, [state.items]);

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', item: { ...item, quantity: item.quantity || 1 } })
  }

  const removeFromCart = (id: number, color: string, size: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, color, size } });
  }

  const increaseAmount = (id: number, color: string, size: string) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: { id, color, size } });
  }

  const decreaseAmount = (id: number, color: string, size: string) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: { id, color, size } });
  }

  return (
    <CartContext.Provider value={{ items: state.items, cartCount, addToCart, removeFromCart, increaseAmount, decreaseAmount }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext);