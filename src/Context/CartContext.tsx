import React, {
  useEffect,
  useReducer,
  useContext,
  createContext,
  useCallback,
  useState,
} from "react";
import type { ApiResponse } from "../Types/auth";
import type { CartItem } from "../Types/product";
import { cartService } from "../Services/CartService";
import { useAuth } from "./AuthContext";

type CartState = {
  items: CartItem[];
};

const initialState: CartState = { items: [] };

type CartAction =
  | { type: "SET_ITEMS"; items: CartItem[] }
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; id: number }
  | { type: "INCREASE_QUANTITY"; id: number }
  | { type: "DECREASE_QUANTITY"; id: number }
  | { type: "CLEAR_CART" };

function cartReducer(state: CartState, action: CartAction) {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.items };

    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) => item.variantId === action.item.variantId,
      );

      if (existing) {
        return {
          ...state,
          items: state.items.map((stateItem) =>
            stateItem.variantId === action.item.variantId
              ? {
                ...stateItem,
                quantity: stateItem.quantity + action.item.quantity,
              }
              : stateItem,
          ),
        };
      }

      return { ...state, items: [...state.items, action.item] };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.variantId !== action.id),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.variantId === action.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.variantId === action.id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item,
        ),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  cartCount: number;
  cartLoading: boolean,
  getCart: () => Promise<ApiResponse<CartItem[]> | null>;
  addToCart: (item: CartItem) => Promise<ApiResponse<string>>;
  removeFromCart: (id: number) => Promise<ApiResponse<string>>;
  increaseAmount: (id: number) => Promise<ApiResponse<string>>;
  decreaseAmount: (id: number) => Promise<ApiResponse<string>>;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue>({
  items: [],
  cartCount: 0,
  cartLoading: false,
  getCart: async () => null,
  addToCart: async () => ({ isSucess: false, message: "", data: "" }),
  removeFromCart: async () => ({ isSucess: false, message: "", data: "" }),
  increaseAmount: async () => ({ isSucess: false, message: "", data: "" }),
  decreaseAmount: async () => ({ isSucess: false, message: "", data: "" }),
  clearCart: () => { }
});

function getLangId() {
  const savedLang = localStorage.getItem("lang");
  return savedLang === "ar" ? 1 : 2;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [cartLoading, setCartLoading] = useState(false);
  const guestId = localStorage.getItem("GuestId") ?? "";

  const cartCount = state.items.reduce((count, item) => count + item.quantity, 0);

  const getCart = useCallback(async (): Promise<ApiResponse<CartItem[]> | null> => {
    const langId = getLangId();

    try {
      setCartLoading(true);

      const response = isAuthenticated
        ? await cartService.GetUserCart(langId)
        : await cartService.GetGuestCart(guestId, langId);

      dispatch({ type: "SET_ITEMS", items: response.data ?? [] });
      return response;
    } catch (error) {
      console.error("[CartContext] getCart failed", error);
      return null;
    } finally {
      setCartLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (loading) {
      return;
    }

    getCart();
  }, [getCart, loading]);

  const addToCart = useCallback(
    async (item: CartItem): Promise<ApiResponse<string>> => {
      const response = isAuthenticated
        ? await cartService.AddToUserCart(item.variantId, item.quantity)
        : await cartService.AddToGuestCart(
          guestId,
          item.variantId,
          item.quantity,
        );

      dispatch({ type: "ADD_ITEM", item });
      return response;
    },
    [isAuthenticated],
  );

  const removeFromCart = useCallback(
    async (id: number): Promise<ApiResponse<string>> => {
      const response = isAuthenticated
        ? await cartService.RemoveUserItem(id)
        : await cartService.RemoveGuestItem(guestId, id);

      dispatch({ type: "REMOVE_ITEM", id });
      return response;
    },
    [isAuthenticated],
  );

  const increaseAmount = useCallback(
    async (id: number): Promise<ApiResponse<string>> => {
      const response = isAuthenticated
        ? await cartService.IncreaseUserAmount(id)
        : await cartService.IncreaseGuestAmount(guestId, id);

      dispatch({ type: "INCREASE_QUANTITY", id });
      return response;
    },
    [isAuthenticated],
  );

  const decreaseAmount = useCallback(
    async (id: number): Promise<ApiResponse<string>> => {
      const response = isAuthenticated
        ? await cartService.DecreaseUserAmount(id)
        : await cartService.DecreaseGuestAmount(guestId, id);

      dispatch({ type: "DECREASE_QUANTITY", id });
      return response;
    },
    [isAuthenticated],
  );

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        cartCount,
        cartLoading,
        getCart,
        addToCart,
        removeFromCart,
        increaseAmount,
        decreaseAmount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

