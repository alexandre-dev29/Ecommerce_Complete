import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";
import { useRouter } from "next/router";
import { BsBagCheckFill } from "react-icons/bs";
import Link from "next/link";
import { runFireworks } from "../lib/urils";

const Success = () => {
  const { setCartItems, setTotalQuantities, setTotalPrice }: any =
    useStateContext();

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
        <p className={"description"}>
          if your have any question please email{" "}
          <a href={"mailto:axel.business29@gmail.com"} className={"email"}>
            axel.business29@gmail.com
          </a>{" "}
        </p>
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
