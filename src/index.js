import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import App from "./App";

if (
    localStorage.getItem("stock_name") !== null
) {
    ReactDOM.render(
        <BrowserRouter>
            <App
                name={localStorage.getItem("stock_name")}
            />
        </BrowserRouter>,
        document.getElementById("root")
    );
} else {
    ReactDOM.render(<Login />, document.getElementById("root"));
}
