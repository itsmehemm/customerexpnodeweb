import React from 'react';

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
            <span className="final-amount-text"> {cost.currency} {discountedAmount} </span>
            <span className="original-amount-text">{cost.currency} {amount}</span>
            <span className="amount-offer-text">
                &nbsp;({
                    discount.type === 'INSTANT' ?
                        `${cost.currency} ${discountValue} off` :
                        `${discountValue}% off`
                }) 
            </span>
        </div>
    )

};

export default Amount;