import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { ThemeProvider, useTheme, antdThemeConfig } from './context/ThemeContext';
import Navbar from './assets/components/Navbar';
import CarListPage from './pages/CarListPage';
import AddCarPage from './pages/AddCarPage';
import EditCarPage from './pages/EditCarPage';
import './assets/styles/theme.css';

function ThemedRoutes() {
  const { theme } = useTheme();

  return (
    <ConfigProvider theme={antdThemeConfig[theme]}>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <Routes>
            <Route path="/" element={<CarListPage />} />
            <Route path="/add" element={<AddCarPage />} />
            <Route path="/edit/:id" element={<EditCarPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedRoutes />
    </ThemeProvider>
  );
}