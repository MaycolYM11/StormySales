import './App.css';
import MainLayout from './components/Layout/Main_Layout.jsx';
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;
