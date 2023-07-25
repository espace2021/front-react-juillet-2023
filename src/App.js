
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
import ArticlesCards from './components/articlesRedux/ArticlesCards';
import PageCache from './components/fonctionsCacheRedis/PageCacheSansRedis';
import ProductsAppAdmin from './admin/components/articles/ProductsAppAdmin'
import  Dashboard  from './admin/components/Dashboard'

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
        <Route path="/articlesCardsPag" element={<ArticlesCards/>}/>
        <Route path="/pageCache" element={<PageCache/>}/> 
        <Route path='/articlesadmin' element={<ProductsAppAdmin/>}/> 
        <Route path='/dashboard' element={<Dashboard/>}/> 
      </Routes>
      </Router>
    </div>
  );
}

export default App;
