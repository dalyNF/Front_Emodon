import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './screens/Home';
import Conversation from './screens/Conversation';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conversation" element={<Conversation />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
