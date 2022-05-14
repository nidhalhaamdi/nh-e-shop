import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;  // Stripe wants price in cents instead of USD
    const publishableKey = 'pk_test_51KrM8ADgALshoSlnMYA4cvnP2Mw0BjTyji52AXh0dXoLmOSow8QBMJRGYZzNR5RzkYKvNC0i3uzP1iZ2WwFUKisw00vYSfOzZz';

    // With token, we would pass this to the backend in which then creates the charge.
    const onToken = token => {
        // making a post request to /payment route passing in the token:
        // axios is a function that receives an object that has all of the actual properties
        // that we want to pass in order for axios to know what kind of requests we're trying to make
        // & it gives us back a PROMISE
        axios({ 
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
         })
            .then(response => {
                alert('Payment successful');
            })
            .catch(error => {
                console.log('Payment error: ', JSON.parse(error));
                alert(
                    'There was an issue with your payment. Please make sure you use the provided credit card.'
                );
            });
    };

    return (
        <StripeCheckout 
        name='Nidhal Clothing Ltd.'    
        label='Pay Now'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;