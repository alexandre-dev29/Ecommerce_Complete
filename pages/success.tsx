import React, { useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import Link from "next/link";
import { runFireworks } from "../lib/urils";
import { useECommerceStore } from "../context/productStates";

const Success = () => {
  const { setCartItems, setTotalQuantities, setTotalPrice } =
    useECommerceStore();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className={"success-wrapper"}>
      <div className={"success"}>
        <p className={"icon"}>
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order</h2>
        <p className={"email-msg"}>Check your email inbox for the receipt.</p>
        <div className={"description"}>
          if your have any question please email{" "}
          <a href={"mailto:axel.business29@gmail.com"} className={"email"}>
            axel.business29@gmail.com
          </a>{" "}
        </div>
        <Link href={"/"}>
          <button type={"button"} className={"btn"} style={{ width: "300px" }}>
            {" "}
            Continue Shopping{" "}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
