
import React from "react";
import defaultImg from "../../images/default-product-image.png";
import { Slide } from 'react-slideshow-image';

const ProductImages = (props) => {
    let { images = [], style = {} } = props;

    if (images.length === 0)
        images.push(defaultImg);

    return (
        <div>
            <Slide
                duration={2000}
                transitionDuration={500}
                infinite={true}
                indicators={true}
                arrows={true}
            >
                {
                    images.map((image, key) =>
                        <img key={key} src={image} style={style} />)
                }
            </Slide>
        </div>
    );
};

export default ProductImages;