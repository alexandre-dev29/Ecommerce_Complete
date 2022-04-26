import React from "react";
import Head from "next/head";

import { Footer, NavBar } from "./Index";

const Layout = ({ children }: any) => {
  return (
    <div className={"layout"}>
      <Head>
        <title>Alexandre Store</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main className={"main-container"}>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
