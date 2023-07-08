import { BrowserRouter, Routes } from 'react-router-dom';
import { RenderRoutes } from './routes/routes';
import { routes } from './const/Routes';
import Swal from 'sweetalert2';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        {RenderRoutes(routes)}
      </Routes>
    </BrowserRouter>
  )
}

export default App
