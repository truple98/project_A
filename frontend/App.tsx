import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { lightTheme, darkTheme, ThemeContext } from './constants/theme';

import { store } from './store';
import AppNavigator from './navigation/AppNavigator';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <StoreProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <AppNavigator />
              <StatusBar style={mode === 'light' ? 'dark' : 'light'} />
            </NavigationContainer>
          </PaperProvider>
        </QueryClientProvider>
      </StoreProvider>
    </ThemeContext.Provider>
  );
} 