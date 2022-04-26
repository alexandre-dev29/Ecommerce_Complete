import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./Index";
import { useStateContext } from "../context/StateContext";

const NavBar = () => {
  // @ts-ignore
  const { totalQuantities, setShowCart, showCart } = useStateContext();
  return (
    <div className={"navbar-container"}>
      <p className={"logo"}>
        <Link href={"/"}>AM Headphones</Link>
      </p>
      <button
        type={"button"}
        className={"cart-icon"}
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className={"cart-item-qty"}>{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default NavBar;
