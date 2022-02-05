import {Route, Switch} from "react-router-dom";
import Dashboard from "../../pages/Dashboard";

const PageRoutes = () => {
    return (
        <div className="content-wrapper">
            <Switch>
                {/* Dashboard */}
                <Route path="/" exact>
                    <Dashboard />
                </Route>
            </Switch>
        </div>
    );
}

export default PageRoutes;