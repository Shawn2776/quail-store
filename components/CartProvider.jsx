"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "quail-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage once, on mount (can't run during server render —
  // there's no `window` on the server).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch (err) {
      console.error("Failed to load cart from storage:", err);
    }
    setIsLoaded(true);
  }, []);

  // Mirror every change back to localStorage, but only after the initial
  // load above has happened — otherwise this would fire once on mount with
  // an empty array and immediately wipe out whatever was actually stored.
  useEffect(() => {
    if (!isLoaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error("Failed to save cart to storage:", err);
    }
  }, [items, isLoaded]);

  function addItem({ id, categoryId, categoryName, label, price }) {
    setItems((current) => {
      const existing = current.find((item) => item.id === id);
      if (existing) {
        return current.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...current, { id, categoryId, categoryName, label, price, quantity: 1 }];
    });
  }

  function removeItem(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((current) => current.map((item) => (item.id === id ? { ...item, quantity } : item)));
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
}
