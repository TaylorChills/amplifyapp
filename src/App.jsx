import './App.css';
import '@aws-amplify/ui-react/styles.css';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { withAuthenticator } from '@aws-amplify/ui-react';

// import { uploadData, getUrl, remove } from 'aws-amplify/storage';

const App = ({ signOut }) => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard signOut={signOut} />} />
          <Route path='/blog/:blogId' element={<Blog />} />
        </Routes>
      </Router>
    </>
  );
};

export default withAuthenticator(App);
