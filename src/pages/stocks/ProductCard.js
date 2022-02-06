import React, {useEffect, useState} from 'react';
import CartApp from "./CartApp";
import {getData, postData} from "../../components/helpers/Data";
import Modal2 from "../../components/helpers/Modal2";

const ProductCard = () => {
    const [category, setCategory] = useState([])
    const [sizesData, setSizesData] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [hidden, setHidden] = useState({
        card2: true,
    });
    const [sizes, setSizes] = useState([])
    const [variantInfo, setVariantInfo] = useState()
    const [productIds, setProductIds] = useState([])
    const [newProductIds, setNewProductIds] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [message, setmessage] = useState([]);

    useEffect(() => {
        getData('fetch_departments').then((data) => {
            setCategory(data)
        });
        getData('fetch_sizes').then((data) => {
            setSizesData(data)
        });
        getData('fetch_suppliers').then((data) => {
            setSuppliers(data)
        });
    }, [])

    // useEffect((props) => {
    //
    //     let finalSizeArray = props.product.variants[0].options.map(option => {
    //         let sizeInfo = {}
    //
    //         sizeInfo.key = sizesData.name
    //         sizeInfo.text = option.name
    //         sizeInfo.value = option.id
    //
    //         return sizeInfo
    //     })
    //
    //     setSizes(finalSizeArray)
    // }, [])

    //
    // //handle on change of size
    // const handleSize = (e,props, {value}) => {
    //     setVariantInfo({[props.product.variants[0].id]: value})
    // }
    // const handleButtonAddCart = e => {
    //     e.preventDefault()
    //     setHidden({card2: false})
    //     //generate product id
    //
    //     //props.addToCart(props.product.id, variantInfo)
    // }

    const addToCart = (e) => {
        e.preventDefault();
        const frmData = new FormData(document.getElementById('stock_inventory_form'))
        var table = document.getElementById("tableId");
        var totalRowCount = table.rows.length;
        console.log(totalRowCount);
        postData(frmData, 'add_individual_product_to_cart').then((data) => {
            console.log(data);
            if (totalRowCount <= 1) {
                setProductIds(data.response);
            } else {
                const rowData = data.response.map((data) => {
                    return (
                        <>
                            <td className={"text-center"}>
                                <input className={"form-control"} value={data.category}
                                       name={"category[]"}/>
                            </td>
                            <td className={"text-center"}>
                                <input className={"form-control"} value={data.quantity}
                                       name={"quantity[]"}/>
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
            //setProductIds(data.category);
        })
    }
    const saveStockInventory = (e) => {
        e.preventDefault();
        const frmData = new FormData(document.getElementById('stock_submit_form'))
        postData(frmData, 'submit_stock_inventory').then((data) => {
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
                <h4 className="fs-title">Stock Inventory</h4>
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
                                        <select className={"form-control"} id={"category"} name={"category"}>
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
                                    <label htmlFor={"size"}
                                           className="col-form-label col-md-2 label-right pr-3 pl-3">Size:
                                    </label>
                                    <div className={"col-md-4"}>
                                        <select className={"form-control"} id={"size"} name={"size"}
                                        >
                                            <option>-- Select Size--</option>
                                            {sizesData.map((data) => {
                                                return (
                                                    <option value={data.code}>{data.size}</option>
                                                )
                                            })}
                                        </select>
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
                                    <label htmlFor={"supplier"}
                                           className="col-form-label col-md-2 label-right pr-3 pl-3">Size:
                                    </label>
                                    <div className={"col-md-4"}>
                                        <select className={"form-control"} id={"supplier"} name={"supplier"}>
                                            <option>-- Select Supplier--</option>
                                            {suppliers.map((data) => {
                                                return (
                                                    <option value={data.code}>{data.supplier_name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className={"row justify-content-center mt-2"}>
                                    <button className={"btn btn-outline-primary col-md-3 offset-md-1"}
                                            type={"button"} onClick={addToCart}>
                                        Add To Stock
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card mt-0 pb-4" id={""}>
                            <form id={"stock_submit_form"} onSubmit={saveStockInventory}>
                                <div className={"row table-responsive"}>
                                    <table className={"table "} id={"tableId"}>
                                        <thead>
                                        <tr>
                                            <th>Product_Id</th>
                                            <th>Quantity</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {productIds.map((data) => {
                                            return (
                                                <tr>
                                                    <td className={"text-center"}>
                                                        <input className={"form-control"} value={data.category}
                                                               name={"category[]"}/>
                                                    </td>
                                                    <td className={"text-center"}>
                                                        <input className={"form-control"} value={data.quantity}
                                                               name={"quantity[]"}/>
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
                                    <button type={"submit"} className={"btn btn-outline-success btn-sm col-md-3"}>
                                        Submit Inventory
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
export default ProductCard;