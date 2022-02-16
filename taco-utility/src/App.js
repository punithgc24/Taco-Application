import {
  BrowserRouter as Router,
  Switch,                                                               
  Route,
  Redirect
} from "react-router-dom"; 
import './App.css';
import Footer from "./main/components/footer/Footer";
import Header from './main/components/header/Header';
import Cart from "./main/components/pages/cart/Cart";
import { CartProvider } from "./main/components/pages/cart/CartContext";
import Design from "./main/components/pages/design/Design";
import Home from "./main/components/pages/home/Home";
import Locations from "./main/components/pages/locations/Locations";
import Recents from "./main/components/pages/recents/Recents";
import Specials from "./main/components/pages/specials/Specials";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Header/>
        </div>
        <div className="content">
          <Switch>
            <Route path="/home" exact component={Home}/>
            <Route path="/design" exact component={Design}/>
            <Route path="/specials" exact component={Specials}/>
            <Route path="/locations" exact component={Locations}/>
            <Route path="/recents" exact component={Recents}/>
            <Route path="/cart" exact component={Cart}/>
            <Redirect from="/" to="/home"/>
          </Switch>
        </div>
        <div>
          <Footer/>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
