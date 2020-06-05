
import React from 'react';
import { Slide } from 'react-slideshow-image';
import defaultImg from '../../../images/default-product-image.png';

const properties = {
    duration: 2000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
}

const ProductImages = (props) => {
    let { images = [], style = {}, default_properties = {}, onClick = () => {} } = props;
    if (images.length === 0)
        images.push(defaultImg);
    return (
        <div style={style}>
            <Slide {...properties} {...default_properties}>
                {
                    images.map((image, key) =>
                        <div key={key}>
                            <img onClick={onClick} src={image} style={style} />
                        </div>
                    )}
            </Slide>
        </div>
    );
};

export default ProductImages;