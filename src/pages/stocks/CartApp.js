// import {useEffect, useState} from "react";
//
// const CartApp = () => {
//     //const commerce = new Commerce(process.env.REACT_APP_PUBLICKEY_SANDBOX)
//     const [cart, setCart] = useState();
//
//     useEffect(() => {
//         cart.retrieve()
//             .then(res => {
//                 setCart(res)
//             })
//     },[])
//
//     const addToCart = (productId, variantInfo) => {
//
//         // if(variantInfo) {
//         //     commerce.cart.add(productId, 1, variantInfo)
//         //         .then(res => {
//         //             setCart(res.cart)
//         //         })
//         // } else {
//         //     window.alert('Please Select Product')
//         // }
//     }
//     return (
//         <div className="App">
//             {/*<Nav cart={cart} emptyCart={emptyCart}/>*/}
//             {/*<Grid centered stackable padded relaxed>*/}
//             {/*    <Grid.Column className='left-column' width={5}>*/}
//             {/*        <LeftPanel />*/}
//             {/*    </Grid.Column>*/}
//             {/*    <Grid.Column width={9}>*/}
//             {/*        <ProductContainer*/}
//             {/*            addToCart={addToCart}*/}
//             {/*        />*/}
//             {/*    </Grid.Column>*/}
//             {/*</Grid>*/}
//             {/*<Footer />*/}
//         </div>
//     )
// }
// export default CartApp;