import { useState, createContext } from 'react';

export const FooterContext = createContext();

export const FooterProvider = ({ children }) => {
  const [showFooter, setShowFooter] = useState(true);

  const footerControls = {
    showFooter,
    setShowFooter,
  };

  return <FooterContext.Provider value={footerControls}>{children}</FooterContext.Provider>;
};
