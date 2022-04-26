import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div className={"footer-container"}>
      <p>2022 alexandre All Right Reserved</p>
      <div>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </div>
    </div>
  );
};

export default Footer;
