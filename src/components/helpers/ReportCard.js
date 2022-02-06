import "../../css/report.css";

const ReportCard = (props) => {
    return (
        <div className="col-lg-4">
            <div
                className="small-box"
                style={{ backgroundColor: props.color }}
                id="dash"
            >
                <div className="inner">
                    <h3
                        style={{ color: "black", fontSize: "2rem", fontWeight: "bolder" }}
                    >
                        {props.dt}
                    </h3>

                    <p
                        style={{ color: "white", fontSize: "1.7rem", fontWeight: "bolder" }}
                    >
                        {props.name}
                    </p>
                </div>
                <div className="icon">{props.icon}</div>
                {props.btn}
            </div>
        </div>
    );
};

export default ReportCard;
