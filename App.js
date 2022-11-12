import React from 'react';
import Toast from './src/companent/Toast/Toast';
import UserProvider from './src/context/provider';
import Router from './src/Router';

const App = () => {
  return (
    <>
      <Toast/>
      <UserProvider>
        <Router />
      </UserProvider>
    </>
  );
};

export default App;
