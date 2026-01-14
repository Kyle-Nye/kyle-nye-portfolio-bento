import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DebugContextType {
  isDebug: boolean;
  setIsDebug: (value: boolean) => void;
}

const DebugContext = createContext<DebugContextType | undefined>(undefined);

export const DebugProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDebug, setIsDebug] = useState(false);

  return (
    <DebugContext.Provider value={{ isDebug, setIsDebug }}>
      {children}
    </DebugContext.Provider>
  );
};

export const useDebug = () => {
  const context = useContext(DebugContext);
  if (context === undefined) {
    throw new Error('useDebug must be used within a DebugProvider');
  }
  return context;
};