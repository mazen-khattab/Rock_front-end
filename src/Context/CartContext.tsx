import React, { useEffect, useReducer, useContext, createContext } from "react";
import type { CartItem } from '../Types/product'

type CartState = {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

type CartAction =
  | { type: 'ADD_ITEM', item: CartItem }
  | { type: 'REMOVE_ITEM', id: number } // id => variantId
  | { type: 'INCREASE_QUANTITY', id: number } // id => variantId
  | { type: 'DECREASE_QUANTITY', id: number } // id => variantId

function cartReducer(state: CartState, action: CartAction) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(item => item.variantId === action.item.variantId);

      if (existing) {
        return {
          ...state,
          items: state.items.map(stateItem => stateItem.variantId === action.item.variantId
            ? { ...stateItem, quantity: stateItem.quantity + action.item.quantity }
            : stateItem)
        }
      }
      return { ...state, items: [...state.items, action.item] };
    }

    case "REMOVE_ITEM": return {
      ...state, items: state.items.filter(item => item.variantId !== action.id)
    }

    case "INCREASE_QUANTITY":
      return {
        ...state, items: state.items.map(item => item.variantId === action.id ?
          { ...item, quantity: item.quantity + 1 } : item
        )
      }

    case "DECREASE_QUANTITY":
      return {
        ...state, items: state.items.map(item => item.variantId === action.id ?
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
  removeFromCart: (id: number) => void;
  increaseAmount: (id: number) => void;
  decreaseAmount: (id: number) => void;
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
    dispatch({ type: 'ADD_ITEM', item })
  }

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  }

  const increaseAmount = (id: number) => {
    dispatch({ type: 'INCREASE_QUANTITY', id });
  }

  const decreaseAmount = (id: number) => {
    dispatch({ type: 'DECREASE_QUANTITY', id });
  }

  return (
    <CartContext.Provider value={{ items: state.items, cartCount, addToCart, removeFromCart, increaseAmount, decreaseAmount }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext);