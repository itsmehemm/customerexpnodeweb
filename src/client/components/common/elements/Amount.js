import React from 'react';
import { currencyCodeMapper } from '../../../lib/mappers';
import {
    INSTANT_PERCENTAGE,
    NO_DISCOUNT,
    INSTANT_AMOUNT
} from '../../../lib/constants';

const Amount = (props) => {
    const { cost = {}, discount = {}, style = {} } = props;
    let amount = parseInt(cost.amount);
    const discountValue = parseInt(discount.value);
    let discountedAmount;
    if (discount.type === INSTANT_AMOUNT) {
        discountedAmount = amount - discountValue;
    }
    if (discount.type === INSTANT_PERCENTAGE) {
        discountedAmount = amount - (amount * discountValue / 100);
    }
    if (discount.type === NO_DISCOUNT) {
        discountedAmount = amount;
    }
    return (
        <div className="amount-section" style={style}>
            <span className="final-amount-text"> {currencyCodeMapper[cost.currency]}{discountedAmount} </span>
            {discountedAmount !== amount && <span className="original-amount-text">{currencyCodeMapper[cost.currency]}{amount}</span>}
            {
                discountValue !== 0 &&
                <span className="amount-offer-text">
                    {discount.type === INSTANT_AMOUNT && ` Flat ${currencyCodeMapper[cost.currency]}${discountValue} off`}
                    {discount.type === INSTANT_PERCENTAGE && ` ${discountValue}% off`}
                </span>
            }
        </div>
    );
};

export default Amount;