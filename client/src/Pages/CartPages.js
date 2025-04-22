import React, { useState, useEffect, useRef } from "react";
import Layout from "../Components/layout/Layout";
import { useCart } from "../Context/Cart";
import { useAuth } from "../Context/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyle.css";
import { AiFillWarning } from "react-icons/ai";
import dropin from "braintree-web-drop-in";

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [braintreeLoading, setBraintreeLoading] = useState(true);
    const [braintreeError, setBraintreeError] = useState(null);
    const navigate = useNavigate();
    const dropinContainerRef = useRef(null);

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.forEach((item) => {
                total += item.price;
            });
            return total.toLocaleString("en-US", { style: "currency", currency: "USD" });
        } catch (error) {
            console.log(error);
        }
    };

    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    const getToken = async () => {
        try {
            setBraintreeLoading(true);
            setBraintreeError(null);
            const { data } = await axios.get("/api/v1/product/braintree/token");
            setClientToken(data?.clientToken);
            setBraintreeLoading(false);
        } catch (error) {
            console.log("Braintree token error:", error);
            setBraintreeError("Failed to load payment system");
            setBraintreeLoading(false);
        }
    };

    useEffect(() => {
        if (auth?.token) getToken();
    }, [auth?.token]);

    useEffect(() => {
        if (!clientToken || !dropinContainerRef.current) return;

        dropin.create({
            authorization: clientToken,
            container: dropinContainerRef.current,
            //paypal: { flow: "vault" },
        }, (err, dropinInstance) => {
            if (err) {
                console.error("DropIn error:", err);
                setBraintreeError("Payment system error. Please refresh and try again.");
            } else {
                setInstance(dropinInstance);
            }
        });

        return () => {
            if (instance) {
                instance.teardown().catch(err => console.error("Teardown error:", err));
            }
        };
    }, [clientToken]);

    const handlePayment = async () => {
        try {
            setLoading(true);
            if (!instance) {
                toast.error("Payment instance not available");
                setLoading(false);
                return;
            }
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post("/api/v1/product/braintree/payment", {
                nonce,
                cart,
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully");
        } catch (error) {
            console.log("Payment error:", error);
            setLoading(false);
            toast.error("Payment failed. Please try again.");
        }
    };

    return (
        <Layout>
            <div className="cart-page" style={{ marginTop: "0px" }}>
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {!auth?.user ? "Hello Guest" : `Hello ${auth?.user?.name}`}
                            <p className="text-center">
                                {cart?.length
                                    ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"}`
                                    : "Your Cart Is Empty"}
                            </p>
                        </h1>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 p-0 m-0">
                            {cart?.map((p) => (
                                <div className="row card flex-row" key={p._id}>
                                    <div className="col-md-4">
                                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} width="100%" height="130px" />
                                    </div>
                                    <div className="col-md-4">
                                        <p>{p.name}</p>
                                        <p>{p.description.substring(0, 30)}</p>
                                        <p>Price: {p.price}</p>
                                    </div>
                                    <div className="col-md-4 cart-remove-btn">
                                        <button className="btn btn-danger" onClick={() => removeCartItem(p._id)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-5 cart-summary">
                            <h2>Cart Summary</h2>
                            <p>Total | Checkout | Payment</p>
                            <hr />
                            <h4>Total: {totalPrice()}</h4>
                            {auth?.user?.address ? (
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className="btn btn-outline-warning" onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                                </div>
                            ) : (
                                <div className="mb-3">
                                    {auth?.token ? (
                                        <button className="btn btn-outline-warning" onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                                    ) : (
                                        <button className="btn btn-outline-warning" onClick={() => navigate("/login", { state: "/cart" })}>Please Login to checkout</button>
                                    )}
                                </div>
                            )}
                            <div className="mt-2">
                                {braintreeLoading ? (
                                    <p className="text-center">Loading payment options...</p>
                                ) : braintreeError ? (
                                    <div className="alert alert-danger"><AiFillWarning /> {braintreeError}</div>
                                ) : (!clientToken || !auth?.token || !cart?.length) ? (
                                    <div className="alert alert-info">
                                        {!auth?.token ? "Please login to proceed with payment" : !cart?.length ? "Add items to cart to proceed with payment" : "Payment system not available"}
                                    </div>
                                ) : (
                                    <>
                                        <div ref={dropinContainerRef} style={{ minHeight: "200px" }}></div>
                                        <button className="btn btn-primary" onClick={handlePayment} disabled={loading || !instance || !auth?.user?.address}>
                                            {loading ? "Processing ...." : "Make Payment"}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
