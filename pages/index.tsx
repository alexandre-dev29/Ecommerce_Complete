import type { NextPage } from "next";
import { Product, HerroBanner, FooterBanner } from "../components/Index";
import { client } from "../lib/client";
const Home: NextPage = ({ products, bannerData }: any) => {
  return (
    <>
      <HerroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className={"products-heading"}>
        <h2>Best selling products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className={"products-container"}>
        {products?.map((product: any) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData.length && bannerData[0]} />
    </>
  );
};
export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const bannerQuery = '*[_type == "banner"]';
  const products = await client.fetch(productQuery);
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};
export default Home;
