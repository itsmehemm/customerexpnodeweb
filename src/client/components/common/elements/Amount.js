import React from 'react';
import { currencyCodeMapper } from '../../../lib/mappers';
import {
    INSTANT_PERCENTAGE,
    INSTANT_AMOUNT
} from '../../../lib/constants';

const Amount = (props) => {
    const { amount, style } = props;
    if (!amount) return <div />
    const { maximum_retail_price, discount, subtotal, correction, currency } = amount;
    return (
        <div className="amount-section" style={style}>
            <span className="final-amount-text"> {currencyCodeMapper[currency]}{subtotal} </span>
            {subtotal !== maximum_retail_price && <span className="original-amount-text">{currencyCodeMapper[currency]}{maximum_retail_price}</span>}
            {
                parseInt(discount.value) > 0 &&
                <span className="amount-offer-text">
                    {discount.type === INSTANT_AMOUNT && ` Flat ${currencyCodeMapper[currency]}${discount.value} off`}
                    {discount.type === INSTANT_PERCENTAGE && ` ${discount.value}% off`}
                </span>
            }
        </div>
    );
};

export default Amount;