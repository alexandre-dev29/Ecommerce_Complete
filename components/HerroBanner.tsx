import Link from "next/link";
import { urlFor } from "../lib/client";
import { Banner } from "../SanityTypes";
interface HerroBannerTypes {
  heroBanner: any | Banner;
}
function HerroBanner({ heroBanner }: HerroBannerTypes) {
  return (
    <div className={"hero-banner-container"}>
      <div>
        <p className={"beats-solo"}>{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img
          src={`${urlFor(heroBanner.image)}`}
          alt={"Headphones"}
          className={"hero-banner-image"}
        />
        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type={"button"}>Button Text</button>
          </Link>
          <div className={"desc"}>
            <h5>DESCRIPTION</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HerroBanner;
