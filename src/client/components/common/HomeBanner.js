import React from 'react';
import banner from '../../images/banner.jpg';

const HomeBanner = () => {
    return (
        <div className="content-wrapper">
            <div className="content">
                <img src={banner} />
            </div>
        </div>
    );
}

export default HomeBanner;
