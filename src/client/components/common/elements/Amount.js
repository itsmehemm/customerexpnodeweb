import React from 'react';
import { currencyCodeLabel } from '../../../client-lib/mappers';

const Amount = (props) => {

    const { cost, discount } = props;

    let amount = parseInt(cost.amount);
    const discountValue = parseInt(discount.value);
    let discountedAmount = amount;

    if (discount.type === 'INSTANT') {
        discountedAmount = amount - discountValue;
    } if (discount.type === 'PERCENTAGE') {
        discountedAmount = amount - (amount * discountValue / 100);
    }

    return (
        <div className="amount-section">
            <span className="final-amount-text"> {currencyCodeLabel[cost.currency]}{discountedAmount} </span>
            &ensp;
            <span className="original-amount-text">{currencyCodeLabel[cost.currency]}{amount}</span>
            &ensp;
            <span className="amount-offer-text">
                &nbsp;{
                    discount.type === 'INSTANT' ?
                        `Flat ${currencyCodeLabel[cost.currency]}${discountValue} off` :
                        `${discountValue}% off`
                }
            </span>
        </div>
    )

};

export default Amount;