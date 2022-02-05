import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import PageRoutes from "../helpers/PageRoutes";
import Login from "../../pages/login/Login";

const Layout = () => {
    const logout = () => {
        if (typeof Storage !== "undefined") {
            localStorage.removeItem("name");
            ReactDOM.render(<Login/>, document.getElementById("root"));
        } else {
            console.log("could not save user data in local storage");
        }
    };
    return (
        <div className="hold-transition sidebar-mini layout-fixed layout-navbar-fixed">
            <div className="wrapper">
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a
                                href=""
                                className="nav-link"
                                data-widget="pushmenu"
                                role="button"
                            >
                                <i className="fas fa-bars"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <div className="sidebar">
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <span style={{margin: "10px", color: "white"}}>
                                    Welcome{" "}
                                    <span className="text-white">
                                        {localStorage.getItem("name")}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column"
                                data-widget="treeview" role="menu" data-accordion="false">
                                {/* logout */}
                                <li className="nav-item">
                                    <a className="nav-link">
                                        <button
                                            className="btn btn-danger col-md-3"
                                            onClick={logout}
                                        >
                                            Logout
                                        </button>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </aside>
                <div className="content-wrapper">
                    <div id="main">
                        <PageRoutes />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Layout;