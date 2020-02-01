
import React from "react";
import defaultImg from "../../images/default-product-image.png";
import { Slide } from 'react-slideshow-image';

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    onChange: (oldIndex, newIndex) => {
    }
}

/**
 * Given a list of product images, this component will display them as a slide show.1
 */
const ProductImages = (props) => {
    let { images = [] } = props;

    if (images.length === 0)
        images.push(defaultImg);

    return (
        <div>
            <Slide {...properties}>
                {
                    images.map((image, key) =>
                        <div key={key} className="product-image">
                            <img src={image} />
                        </div>
                    )}
            </Slide>
        </div>
    );
};

export default ProductImages;