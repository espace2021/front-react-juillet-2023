
import './App.css';
import NavScroll from './components/NavScroll';
import ArticlesApp from './components/articles/ArticlesApp';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import CategorieApp from './components/categories/CategorieApp';
import Scategorie from './components/scategories/Scategorie';
import Printdocument from './components/articles/Printdocument';

function App() {
  return (
    <div className="App">
      <Router>
      <NavScroll/>
      <Routes>
        <Route path='/articles' element={<ArticlesApp/>}/>
        <Route path='/categories' element={<CategorieApp/>}/>
        <Route path='/scategories' element={<Scategorie/>}/>
        <Route path='/printart' element={<Printdocument/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
