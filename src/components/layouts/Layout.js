import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import PageRoutes from "../helpers/PageRoutes";
import Login from "../../pages/login/Login";

const Layout = () => {
    const logout = () => {
        if (typeof Storage !== "undefined") {
            localStorage.removeItem("name");
            ReactDOM.render(<Login />, document.getElementById("root"));
        } else {
            console.log("Could not save user data in local storage");
        }
    };
    return (
        <div className="hold-transition sidebar-mini layout-fixed layout-navbar-fixed">
            <div className="wrapper">
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href="" className="nav-link" data-widget="pushmenu" role="button">
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
                                <li className="nav-item">
                                    <a className="nav-link">
                                        <i className="nav-icon fas fa-coins"></i>
                                        <p>
                                            Stock
                                            <i className="right fas fa-angle-left"></i>
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview ml-3">
                                        <li className="nav-item">
                                            <Link to="/product-card" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>Add Products</p>
                                            </Link>
                                        </li>
                                    </ul>
                                    <ul className="nav nav-treeview ml-3">
                                        <li className="nav-item">
                                            <Link to="/remove-products" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>Remove Products</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link to="/report" className="nav-link">
                                        <i className="nav-icon fas fa-file-invoice-dollar"></i>
                                        <p>Daily Reports</p>
                                    </Link>

                                </li>
                                {/* logout */}
                                <li className="nav-item">
                                    <a className="nav-link">
                                        <button className="btn btn-danger col-md-3"
                                            onClick={logout}>Logout
                                        </button>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </aside>
                <div className="content-wrapper">
                    {/* <!-- Content Header (Page header) --> */}
                    <div className="content-header p-0">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    {/* <!-- find use for this line --> */}
                                    {/* <!-- <h1 className="m-0">Report</h1> --> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /.content-header -->*/}
                    <div id="main">
                        <PageRoutes/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Layout;