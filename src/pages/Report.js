import ReportCard from "../components/helpers/ReportCard";
import {useState, useEffect} from 'react';
import {getData} from "../components/helpers/Data";

const Report = () => {
    const [reportsData, setReportsData] = useState([]);
    useEffect(() => {
        getData("fetch_reports_data").then((data) => {
            setReportsData(data);
        });
    }, []);

    const generateDailyReport = () => {

    }
    return (
        <div>
            <div className="row">
                <ReportCard
                    dt={reportsData.purchase_orders ? reportsData.purchase_orders.toLocaleString() : ""}
                    color="lightblue" name="P. ORDERS"
                    icon={<i className="fas fa-hand-holding"></i>}/>
                <ReportCard
                    dt={reportsData.sales ? reportsData.sales.toLocaleString() : ""}
                    color="lightgreen" name="SALES"
                    icon={<i class="fas fa-hand-holding-usd"></i>}/>
                <ReportCard
                    dt={reportsData.sales_amount ? reportsData.sales_amount.toLocaleString() : ""}
                    color="lightgrey" name="SALES AMOUNT"
                    icon={<i class="fas fa-money-bill"></i>}/>
            </div>
            <div className="row">
                <ReportCard
                    dt={reportsData.suppliers ? reportsData.suppliers.toLocaleString() : ""}
                    color="lightgrey" name="SUPPLIERS"
                    icon={<i className="fas fa-shipping-fast"></i>}/>
                <ReportCard
                    dt={reportsData.department ? reportsData.department.toLocaleString() : ""}
                    color="lightblue" name="DEPARTMENTS"
                    icon={<i className="fas fa-building"></i>}/>
                <ReportCard
                    dt={reportsData.users ? reportsData.users.toLocaleString() : ""}
                    color="lightgreen" name="USER(s)"
                    icon={<i className="fas fa-users"></i>}/>
            </div>
            <div className={"row"}>
                <button className={"btn btn-outline-primary btn-sm col-md-3"}
                onClick={generateDailyReport}>
                    Generate Daily Report
                </button>
            </div>
        </div>
    )
}
export default Report;