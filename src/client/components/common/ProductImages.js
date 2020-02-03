
import React from 'react';
import defaultImg from "../../images/default-product-image.png";
import { Slide } from 'react-slideshow-image';

const properties = {
    duration: 2000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
}

const ProductImages = (props) => {
    let { images = [], style = {} } = props;

    if (images.length === 0)
        images.push("https://i.ibb.co/xM1v6ts/Whats-App-Image-2020-01-25-at-20-30-54.jpg");

    return (
        <div style={style}>
            <Slide {...properties}>
                {
                    images.map((image, key) =>
                        <div key={key}>
                            <img src={image} style={style} />
                        </div>
                    )}
            </Slide>
        </div>
    );
};

export default ProductImages;