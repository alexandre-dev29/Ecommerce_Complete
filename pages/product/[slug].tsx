import { urlFor, client } from "../../lib/client";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components/Index";
import { useState } from "react";
import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ product, products }: any) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);

  // @ts-ignore
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  function handleBuyNow() {
    onAdd(product, qty);
    setShowCart(true);
  }

  return (
    <div>
      <div className={"product-detail-container"}>
        <div>
          <div className={"container"}>
            <img
              src={`${urlFor(image && image[index])}`}
              className={"product-detail-image"}
              alt={"image"}
            />
          </div>
          <div className={"small-images-container"}>
            {image?.map((item: any, i: number) => (
              <img
                src={`${urlFor(item)}`}
                key={i}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
                alt={item.name}
              />
            ))}
          </div>
        </div>
        <div className={"product-detail-desc"}>
          <h1>{name}</h1>
          <div className={"reviews"}>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className={"price"}>${price}</p>
          <div className={"quantity"}>
            <h3>Quantity</h3>
            <p className={"quantity-desc"}>
              <span className={"minus"} onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className={"num"}>{qty}</span>
              <span className={"plus"} onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className={"buttons"}>
            <button
              type={"button"}
              className={"add-to-cart"}
              onClick={() => onAdd(product, qty)}
            >
              Add To Cart
            </button>
            <button
              type={"button"}
              className={"buy-now"}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className={"maylike-products-wrapper"}>
        <h2>You may also like</h2>
        <div className={"marquee"}>
          <div className={"maylike-products-container track"}>
            {products?.map((prod: any) => (
              <Product product={prod} key={prod._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ params: { slug } }: any) => {
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productQuerySimilar = `*[_type == "product"]`;
  const product = await client.fetch(productQuery);
  const products = await client.fetch(productQuerySimilar);

  return {
    props: { product, products },
  };
};
export const getStaticPaths = async () => {
  const productQuery = `*[_type == "product"]{
    slug{
      current
    }
  }`;
  const products = await client.fetch(productQuery);
  const paths = products.map((product: any) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export default ProductDetails;
