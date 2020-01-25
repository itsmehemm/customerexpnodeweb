import React from 'react';
import banner from '../../images/banner.jpg';

const HomeBanner = () => {
    return (
        <div className="in-content-wrapper">
            <div className="content">
                <img width="100%" src={banner} />
            </div>
        </div>
    );
}

export default HomeBanner;
