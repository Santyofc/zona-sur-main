'use client';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Contact, Deal, Quote, User, DealStage } from './types';
import { CONTACTS, DEALS } from './mockData';

interface AppState {
  user: User | null;
  contacts: Contact[];
  deals: Deal[];
  quotes: Quote[];
}

type Action =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_DEAL'; payload: Deal }
  | { type: 'UPDATE_DEAL_STAGE'; payload: { dealId: string; stage: DealStage } }
  | { type: 'ADD_CONTACT'; payload: Contact }
  | { type: 'ADD_QUOTE'; payload: Quote }
  | { type: 'ADD_INTERACTION'; payload: { contactId: string; interaction: any } };

const initialState: AppState = {
  user: null, // Start unauth
  contacts: CONTACTS,
  deals: DEALS,
  quotes: [],
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'ADD_DEAL':
      return { ...state, deals: [...state.deals, action.payload] };
    case 'UPDATE_DEAL_STAGE':
      return {
        ...state,
        deals: state.deals.map(deal =>
          deal.id === action.payload.dealId
            ? { ...deal, stage: action.payload.stage }
            : deal
        ),
      };
    case 'ADD_CONTACT':
      return { ...state, contacts: [...state.contacts, action.payload] };
    case 'ADD_QUOTE':
      return { ...state, quotes: [...state.quotes, action.payload] };
    case 'ADD_INTERACTION':
      return {
        ...state,
        contacts: state.contacts.map(c =>
          c.id === action.payload.contactId
            ? { ...c, interactions: [action.payload.interaction, ...c.interactions] }
            : c
        ),
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
