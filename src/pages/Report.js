import ReportCard from "../components/helpers/ReportCard";
import {useState, useEffect} from 'react';
import {getData, getOneData} from "../components/helpers/Data";

const Report = () => {
    const [reportsData, setReportsData] = useState([]);
    useEffect(() => {
        getData("fetch_reports_data").then((data) => {
            setReportsData(data);
        });
    }, []);

    const generateDailyReport = (e) => {
        e.preventDefault();
        const date = document.getElementById('date').value;
        getOneData('generate_daily_report', date).then((data) => {
            console.log(data);
            setReportsData(data);
        })
    }
    return (
        <div>
            <div className="row">
                <ReportCard
                    dt={reportsData.purchase_amount ? reportsData.purchase_amount.toLocaleString() : ""}
                    color="lightblue" name="P. ORDERS"
                    icon={<i className="fas fa-hand-holding"></i>}/>
                <ReportCard
                    dt={reportsData.sales ? reportsData.sales.toLocaleString() : ""}
                    color="lightgreen" name="SALES" type={"number"}
                    icon={<i class="fas fa-money-bill"></i>}/>
                <ReportCard
                    dt={reportsData.profit ? reportsData.profit.toLocaleString() : ""}
                    color="lightgrey" name="PROFIT"
                    icon={<i class="fas fa-hand-holding-usd "></i>}/>
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
                <label htmlFor={"date"} className={"col-form-label col-md-1 label-right"}>On: </label>
                <input type={"date"} name={"date"} id={"date"} maxLength={"4"}
                       max={"9999-12-31"} className={"form-control col-md-2 m-0"}/>
                <button className={"btn btn-outline-primary btn-sm col-md-3 ml-1"}
                onClick={generateDailyReport}>
                    Generate Daily Report
                </button>
            </div>
        </div>
    )
}
export default Report;