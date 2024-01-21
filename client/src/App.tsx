import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.scss';
import { Navbar } from "./components/navbar"
import { AuthPage } from "./pages/auth";
import { CheckoutPage } from "./pages/checkout";
import { PurchasedItemsPage } from "./pages/purchased-items";
import { ShopPage } from "./pages/shop";
import { IShopContext, ShopContext, ShopContextProvider } from "./context/shop-context";
import { useContext, useState } from "react";


function App() {
  // const { isAuthenticated } = useContext<IShopContext>(ShopContext);
  // const [user, setUser] = useState<any>(null)

  // if (isAuthenticated) {
  //   setUser(true)
  // }

  return (
    <div className="App">
      <Router>
        <ShopContextProvider>
        <Navbar/>
        <Routes>
          <Route path="/auth" element={<AuthPage/>}/>
          <Route path="/" element={<ShopPage />}/>
          <Route path="/checkout" element={<CheckoutPage/>}/>
          <Route path="/purchased-items" element={<PurchasedItemsPage/>}/>
        </Routes>
        </ShopContextProvider>
      </Router>
    </div>
  );
}

export default App;
