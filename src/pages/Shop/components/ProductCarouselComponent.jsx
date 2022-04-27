// import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
export default function ProductCarouselComponent({ items }) {
  const options = {
    loop: true,
    margin: 0,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 2,
      },
      300: {
        items: 2,
      },
      600: { 
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };

  return (
    <div style={{ maxWidth: 768, width: "100%" }}>
      <OwlCarousel className="owl-theme" {...options}>
        {items.map((item, v) => (
          <div className="product-item">
            <div className="product-item-content">
              <img src={item.img} alt={item.name} className="product-image" />
            </div>
          </div>
        ))}
      </OwlCarousel>
    </div>
  );
}
