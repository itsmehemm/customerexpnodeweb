import React, { Component } from 'react';
import { Slide } from 'react-slideshow-image';
import imageloader from '../../../images/default-product-image.png';

export default class ProductImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: (this.props.images || []).map(image => imageloader) || [imageloader]
        };
    }

    componentWillMount() {
        this.state.images.forEach((image, index) => {
            const src = this.props.images[index];
            let actualImage = new Image();
            actualImage.onload = () => {
                let { images } = this.state;
                images[index] = src;
                this.setState({
                    images
                });
            }
            actualImage.src = src;
        });
    }

    render() {
        const {
            style,
            onClick
        } = this.props;
        const {
            images
        } = this.state;
        return (
            <div>
                <Slide
                    duration="2000"
                    transitionDuration="500"
                    infinite={true}
                    indicators={false}
                    arrows={true}>
                    {
                        images.map((image, key) =>
                            <img
                                key={key}
                                src={image}
                                style={style}
                                onClick={onClick}
                            />)
                    }
                </Slide>
            </div>
        );
    }
};