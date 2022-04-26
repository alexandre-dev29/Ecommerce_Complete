import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./Index";
import { useStateContext } from "../context/StateContext";

const NavBar = () => {
  const { totalQuantities, setShowCart, showCart }: any = useStateContext();
  return (
    <div className={"navbar-container"}>
      <div className={"logo"}>
        <Link href={"/"}>AM Headphones</Link>
      </div>
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
