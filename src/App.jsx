import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import { ContextProvider } from './context/usersContext';
import StatisticsPage from './pages/statistics/StatisticsPage';
import UsersPage from './pages/users/UsersPage';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <ContextProvider>
        <Routes>
          <Route path="/" exact element={<StatisticsPage />} />
          <Route path="users" element={<UsersPage />} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
