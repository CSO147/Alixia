import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Background from './components/Background';
import Hero from './components/Hero';
import Form from './components/Form';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Background><Hero /></Background>} />
        <Route path="/apply" element={<Background><Form /></Background>} />
      </Routes>
    </Router>
  );
};

export default App;
