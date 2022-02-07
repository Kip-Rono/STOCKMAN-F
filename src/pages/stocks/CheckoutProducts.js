import React, {useEffect, useState} from 'react';
import {getData, postData} from "../../components/helpers/Data";
import Modal2 from "../../components/helpers/Modal2";

const CheckoutProducts = () => {
    const [category, setCategory] = useState([])
    const [sizesData, setSizesData] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [foodTypes, setFoodTypes] = useState([])
    const [foodSuppliers, setFoodSuppliers] = useState([])
    const [productIds, setProductIds] = useState([])
    const [newProductIds, setNewProductIds] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [message, setmessage] = useState([]);
    const [calculations, setCalculations] = useState({
        amount: 0.0,

    });
    const [hidden, setHidden] = useState({
        clothes: false, food: true,
    });


    useEffect(() => {
        getData('fetch_departments').then((data) => {
            setCategory(data)
        });
        getData('fetch_sizes').then((data) => {
            setSizesData(data)
        });
        getData('fetch_food_types').then((data) => {
            setFoodTypes(data)
        });
        getData('fetch_suppliers').then((data) => {
            setSuppliers(data)
        });
        getData('fetch_suppliers').then((data) => {
            setSuppliers(data)
        });
        getData('fetch_food_suppliers').then((data) => {
            setFoodSuppliers(data)
        });
    }, [])

    useEffect(() => {
        let amt = 0.0;

        const tbl = document.querySelector("#tableId tbody").children;
        for (let trs of tbl) {
            const quantity = trs.children[1].children[0].value;
            const unit_price = trs.children[2].children[0].value;

            const total_amt = parseFloat(quantity) * parseFloat(unit_price);

            trs.children[3].children[0].value = total_amt;
        }
        }, [calculations]);
    const selectedOption = () => {
        const option = document.getElementById('category').value;
        switch (option){
            case '1':
                setHidden({clothes: false, food: true})
                break;
            case '2':
                setHidden({clothes: true, food: false})
                break;
            default:
                break;
        }
    }

    const removeStock = (e) => {
        e.preventDefault();
        const frmData = new FormData(document.getElementById('stock_inventory_form'))
        var table = document.getElementById("tableId");
        var totalRowCount = table.rows.length;
        console.log(totalRowCount);
        postData(frmData, 'checkout_individual_product_to_cart').then((data) => {
            console.log(data);
            if (totalRowCount <= 1) {
                setProductIds(data.response);
            } else {
                const rowData = data.response.map((data) => {
                    return (
                        <>
                            <td className={"text-center"}>
                                <input className={"form-control"} value={data.department}
                                       name={"department[]"}/>
                            </td>
                            <td className={"text-center"}>
                                <input className={"form-control"} value={data.category}
                                       name={"category[]"}/>
                            </td>
                            <td className={"text-center"}>
                                <input className={"form-control"} defaultValue={data.quantity}
                                       type={"number"} name={"quantity[]"}
                                       onChange={(e) =>
                                           setCalculations({ ...calculations, quantity: e.target.value })
                                       }/>
                            </td>
                            <td className={"text-center"}>
                                <input className={"form-control"} value={data.unit_price}
                                       type={"number"} name={"unit_price[]"}/>
                            </td>
                            <td className={"text-center"}>
                                <input className={"form-control"} value={data.amount}
                                       type={"number"} name={"amount[]"}/>
                            </td>
                        </>
                    )
                })
                const exStocks = {
                    id: new Date().getTime().toString(),
                    new: (<>{rowData}</>),
                };
                setNewProductIds((appended) => {
                    return [...appended, exStocks];
                });
            }
            //remove benefit row
            const removeProductRow = async (id, e) => {
                e.preventDefault();
                setNewProductIds((deletedRow) => {
                    return deletedRow.filter((row) => row.id !== id)
                });
            };
        })
    }
    //save chcekout
    const saveCheckoutInventory = (e) => {
        e.preventDefault()

        const frmData = new FormData(document.getElementById('checkout_stock_form'))
        postData(frmData, 'save_checkout_stock').then((data) => {
            console.log(data);
            setModalIsOpen(true);
            setmessage(data.message);
        })
    }
    const closeModal = () => {
        setModalIsOpen(false);
    };
    return (
        <div>
            <div className={"row"}>
                <h4 className="fs-title">Checkout Products</h4>
                <hr/>
            </div>
            <section id="stock_inventory" className="project-tab">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card mt-0 pb-4" id={""}>
                            <form id={"stock_inventory_form"}>
                                <div className={"row justify-content-center mt-2"} id={"card"}>
                                    <label htmlFor={"category"}
                                           className="col-form-label col-md-2 label-right pr-3 pl-3">Category:
                                    </label>
                                    <div className={"col-md-4"}>
                                        <select className={"form-control"} id={"category"} name={"category"}
                                                onChange={selectedOption}>
                                            <option>-- Select Category--</option>
                                            {category.map((data) => {
                                                return (
                                                    <option value={data.code}>{data.department}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className={"row justify-content-center mt-2"}>
                                    <div className={"col-md-12"} hidden={hidden.clothes}>
                                        <div className={"row justify-content-center"}>
                                            <label htmlFor={"size"}
                                                   className="col-form-label col-md-2 label-right pr-3 pl-3">Size:
                                            </label>
                                            <div className={"col-md-4"}>
                                                <select className={"form-control"} id={"size"} name={"size"}
                                                >
                                                    <option>-- Select Cloth Size--</option>
                                                    {sizesData.map((data) => {
                                                        return (
                                                            <option value={data.code}>{data.size}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"col-md-12"} hidden={hidden.food}>
                                        <div className={"row justify-content-center"}>
                                            <label htmlFor={"type"}
                                                   className="col-form-label col-md-2 label-right pr-3 pl-3">Food:
                                            </label>
                                            <div className={"col-md-4"}>
                                                <select className={"form-control"} id={"type"} name={"type"}
                                                >
                                                    <option>-- Select Food Type --</option>
                                                    {foodTypes.map((data) => {
                                                        return (
                                                            <option value={data.code}>{data.type}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"row justify-content-center mt-2"}>
                                    <label htmlFor={"quantity"}
                                           className="col-form-label col-md-2 label-right pr-3 pl-3">Quantity:
                                    </label>
                                    <div className={"col-md-4"}>
                                        <input className={"form-control"} type={"number"}
                                               id={"quantity"} name={"quantity"}/>
                                    </div>
                                </div>
                                <div className={"row justify-content-center mt-2"}>
                                    <div className={"col-md-12"} hidden={hidden.clothes}>
                                        <div className={"row justify-content-center"}>
                                            <label htmlFor={"supplier"}
                                                   className="col-form-label col-md-2 label-right pr-3 pl-3">Supplier:
                                            </label>
                                            <div className={"col-md-4"}>
                                                <select className={"form-control"} id={"supplier"} name={"supplier"}>
                                                    <option>-- Select Clothes Supplier--</option>
                                                    {suppliers.map((data) => {
                                                        return (
                                                            <option value={data.code}>{data.supplier_name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={"col-md-12"} hidden={hidden.food}>
                                        <div className={"row justify-content-center"}>
                                            <label htmlFor={"supplier"}
                                                   className="col-form-label col-md-2 label-right pr-3 pl-3">Supplier:
                                            </label>
                                            <div className={"col-md-4"}>
                                                <select className={"form-control"} id={"supplier"} name={"supplier"}>
                                                    <option>-- Select Food Supplier--</option>
                                                    {foodSuppliers.map((data) => {
                                                        return (
                                                            <option value={data.code}>{data.supplier_name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"row justify-content-center mt-2"}>
                                    <button className={"btn btn-outline-danger col-md-4 offset-md-2"}
                                            type={"button"} onClick={removeStock}>
                                        Remove From Stock
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6" >
                        <div className="card mt-0 pb-4" id={""}>
                            <form id={"checkout_stock_form"} onSubmit={saveCheckoutInventory}>
                                <div className={"row table-responsive"}>
                                    <table className={"table "} id={"tableId"}>
                                        <thead>
                                        <tr>
                                            <th>Department</th>
                                            <th>Product_Id</th>
                                            <th>Quantity</th>
                                            <th>Unit Price</th>
                                            <th>Amount</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {productIds.map((data) => {
                                            return (
                                                <tr>
                                                    <td className={"text-center"}>
                                                        <input className={"form-control"} value={data.department}
                                                               name={"department[]"}/>
                                                    </td>
                                                    <td className={"text-center"}>
                                                        <input className={"form-control"} value={data.category}
                                                               name={"category[]"}/>
                                                    </td>
                                                    <td className={"text-center"}>
                                                        <input className={"form-control"} defaultValue={data.quantity}
                                                               type={"number"} name={"quantity[]"}
                                                               onChange={(e) =>
                                                                   setCalculations({ ...calculations, quantity: e.target.value })
                                                               }/>
                                                    </td>
                                                    <td className={"text-center"}>
                                                        <input className={"form-control"} value={data.unit_price}
                                                               type={"number"} name={"unit_price[]"}/>
                                                    </td>
                                                    <td className={"text-center"}>
                                                        <input className={"form-control"} value={data.amount}
                                                               type={"number"} name={"amount[]"}/>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        {newProductIds.map((newRow) => {
                                            {
                                                return <tr key={newRow.id}>{newRow.new}</tr>
                                            }
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className={"row justify-content-center"}>
                                    <button type={"submit"} className={"btn btn-outline-warning btn-sm col-md-3"}>
                                        Checkout Inventory
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Modal2
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                body={
                    <span className="h4 text-white font-weight-bold text-center">
            {message}
          </span>
                }
                background={
                    message.length > 0 ? message[0].includes("Sorry") ? "#d9534f" : "#105878" : ""
                }
            />
        </div>
    )
}
export default CheckoutProducts;