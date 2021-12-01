import { createContext, useEffect, useState } from "react";

interface AppProviderProps {
  children: any;
}

interface AppContextProps {
  theme?: string;
  toggleTheme?: () => void;
}

const AppContext = createContext<AppContextProps>({
  theme: '',
  toggleTheme: () => {}
});

export function AppProvider({ children }: AppProviderProps) {
  const [theme, setTheme] = useState('dark');

  function toggleTheme() {
    const newTheme = theme === '' ? 'dark' : '';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme ?? '');
  }, [])

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext;
