'use client';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Client, CountryCode, Invoice, Product, User } from './types';
import { CLIENTS, INVOICES, PRODUCTS } from './mockData';
import { COUNTRY_CONFIGS } from './config';

interface AppState {
  user: User | null;
  currentCountry: CountryCode;
  clients: Client[];
  products: Product[];
  invoices: Invoice[];
  isLoading: boolean;
}

type Action =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_COUNTRY'; payload: CountryCode }
  | { type: 'ADD_INVOICE'; payload: Invoice }
  | { type: 'ADD_CLIENT'; payload: Client }
  | { type: 'ADD_PRODUCT'; payload: Product };

const initialState: AppState = {
  user: null, // Start unauthenticated
  currentCountry: 'MX', // Default
  clients: CLIENTS,
  products: PRODUCTS,
  invoices: INVOICES,
  isLoading: false,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
  getCountryConfig: () => typeof COUNTRY_CONFIGS['MX'];
} | undefined>(undefined);

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'SET_COUNTRY':
      return { ...state, currentCountry: action.payload };
    case 'ADD_INVOICE':
      return { ...state, invoices: [action.payload, ...state.invoices] };
    case 'ADD_CLIENT':
      return { ...state, clients: [...state.clients, action.payload] };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const getCountryConfig = () => COUNTRY_CONFIGS[state.currentCountry];

  return (
    <AppContext.Provider value={{ state, dispatch, getCountryConfig }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
