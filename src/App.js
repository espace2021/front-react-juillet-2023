
import './App.css';
import NavScroll from './components/NavScroll';
import ArticlesApp from './components/articles/ArticlesApp';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import CategorieApp from './components/categories/CategorieApp';
import Scategorie from './components/scategories/Scategorie';
function App() {
  return (
    <div className="App">
      <Router>
      <NavScroll/>
      <Routes>
        <Route path='/articles' element={<ArticlesApp/>}/>
        <Route path='/categories' element={<CategorieApp/>}/>
        <Route path='/scategories' element={<Scategorie/>}/>

      </Routes>
      </Router>
    </div>
  );
}

export default App;
