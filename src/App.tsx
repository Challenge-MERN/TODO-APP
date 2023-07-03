import { BrowserRouter, Routes } from 'react-router-dom';
import { RenderRoutes } from './routes/routes';
import { routes } from './const/Routes';


function App() {
  // const token = sessionStorage.getItem('ACCESS_TOKEN');

  return (
    <BrowserRouter>
      <Routes>
        {RenderRoutes(routes)}
      </Routes>
    </BrowserRouter>
  )
}

export default App
