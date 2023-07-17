
import './App.css';
import NavScroll from './components/NavScroll';
import ArticlesApp from './components/articles/ArticlesApp';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import CategorieApp from './components/categories/CategorieApp';
import Scategorie from './components/scategories/Scategorie';
import Printdocument from './components/articles/Printdocument';
import Listarticles from './components/articlesRedux/Listarticles';
import Cart from './components/articlesRedux/Cart';
import CheckoutSuccess from './components/articlesRedux/CheckoutSuccess';
import PdfCart from './components/articlesRedux/PdfCart';
import StripePayment from './components/articlesRedux/StripePayment';

function App() {
  return (
    <div className="App">
      <Router>
      <NavScroll/>
      <Routes>
        <Route path='/' element={<Listarticles/>}/>
        <Route path='/articles' element={<ArticlesApp/>}/>
        <Route path='/categories' element={<CategorieApp/>}/>
        <Route path='/scategories' element={<Scategorie/>}/>
        <Route path='/printart' element={<Printdocument/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/ckeckout" element={<CheckoutSuccess/>}/>
        <Route path="/pdfcart" element={<PdfCart/>}/>
        <Route path='/pay/:total' element={<StripePayment/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
