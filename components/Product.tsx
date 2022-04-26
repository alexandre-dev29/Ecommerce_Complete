import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";

interface ProductPropsDescription {
  product: any;
}

const Product = ({
  product: { image, name, slug, price },
}: ProductPropsDescription) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className={"product-card"}>
          <img
            src={`${urlFor(image && image[0])}`}
            width={250}
            height={250}
            className={"product-image"}
            alt={name}
          />
          <p className={"product-name"}>{name}</p>
          <p className={"product-price"}>${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
