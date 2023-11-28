import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css';
import { Navbar } from "./components/navbar"
import { AuthPage } from "./pages/auth";
import { CheckoutPage } from "./pages/checkout";
import { PurchasedItemsPage } from "./pages/purchased-items";
import { ShopPage } from "./pages/shop";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<ShopPage/>}/>
          <Route path="/auth" element={<AuthPage/>}/>
          <Route path="/checkout" element={<CheckoutPage/>}/>
          <Route path="/purchased-items" element={<PurchasedItemsPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;