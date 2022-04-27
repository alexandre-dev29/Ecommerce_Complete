import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
  AiOutlineMinus,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { urlFor } from "../lib/client";
import toast from "react-hot-toast";
import getStripe from "../lib/getStripe";
import { useECommerceStore } from "../context/productStates";

const Cart = () => {
  const cartRef: any = useRef();
  const {
    totalQuantities,
    setShowCart,
    cardItems,
    totalPrice,
    toggleCartItemQuantity,
    onRemove,
  } = useECommerceStore();
  const [isSSR, setIsSSR] = useState(true);
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardItems),
    });
    if (response.status === 5000) return;
    const data = await response.json();
    toast.loading("Redirecting...");
    stripe?.redirectToCheckout({ sessionId: data.id });
  };

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <div className={"cart-wrapper"} ref={cartRef}>
      <div className={"cart-container"}>
        <button
          type={"button"}
          className={"cart-heading"}
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className={"heading"}>Your Cart</span>
          <span className={"cart-num-items"}>({totalQuantities} items)</span>
        </button>
        {!isSSR && cardItems.length < 1 && (
          <div className={"empty-cart"}>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href={"/"}>
              <button
                type={"button"}
                className={"btn"}
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className={"product-container"}>
          {cardItems.length >= 1 &&
            cardItems.map((item: any) => (
              <div className={"product"} key={item._id}>
                <img
                  src={`${urlFor(item?.image[0])}`}
                  className={"cart-product-image"}
                  alt={`${item.name}`}
                />
                <div className={"item-desc"}>
                  <div className={"flex top"}>
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className={"flex bottom"}>
                    <div>
                      <div className={"quantity-desc"}>
                        <span
                          className={"minus"}
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className={"num"}>{item.quantity}</span>
                        <span
                          className={"plus"}
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </div>
                    </div>
                    <button
                      type={"button"}
                      className={"remove-item"}
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cardItems.length >= 1 && (
          <div className={"cart-bottom"}>
            <div className={"total"}>
              <h3>SubTotal</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className={"btn-container"}>
              <button
                type={"button"}
                className={"btn"}
                onClick={handleCheckout}
              >
                Pay With Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
