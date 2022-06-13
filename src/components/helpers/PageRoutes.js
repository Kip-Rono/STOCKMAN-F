import {Route, Switch} from "react-router-dom";
import Dashboard2 from "../../pages/Report";
import ProductCard from "../../pages/stocks/ProductCard";
import CheckoutProducts from "../../pages/stocks/CheckoutProducts";
import Report from "../../pages/Report";
import Dashboard from "../../pages/Dashboard";
import Login from "../../pages/login/Login";

const PageRoutes = () => {
    return (
        <div className="container-fluid" id="content" style={{marginTop:"80px"}}>
            <Switch>

                {/* Login */}
                <Route path={"/login"} exact>
                    <Login/>

                </Route>
                {/*Product card*/}
                <Route path="/product-card" exact>
                    <ProductCard />
                </Route>
                {/* Dashboard */}
                <Route path="/" exact>
                    <Dashboard/>
                </Route>
                {/* Reports*/}
                <Route path="/report">
                    <Report/>
                </Route>

                {/*Checkout Products*/}
                <Route path="/checkout-products">
                    <CheckoutProducts/>
                </Route>
            </Switch>
        </div>
    );
}

export default PageRoutes;
