import React, { ReactNode, createContext, useState } from 'react';

interface LayoutContextProps {
  isSidebarExpanded: boolean;
  setSidebarExpanded: (value: boolean) => void;
}

export const LayoutContext = createContext<LayoutContextProps>({
  isSidebarExpanded: false,
  setSidebarExpanded: (value: boolean) => {},
});

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <LayoutContext.Provider value={{ isSidebarExpanded, setSidebarExpanded }}>
      {children}
    </LayoutContext.Provider>
  );
};
