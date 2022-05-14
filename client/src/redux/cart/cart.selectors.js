import { createSelector } from "reselect";

/*  There's actually two types of selectors we can write, the first type is called an input selector
    that doesn't use 'createSelector', and the second type is called an output selector that does use
    input selectors and createSelector to build themselves. 
*/
// INPUT SELECTOR is a function that gets the whole state and just returns a slice of it, "One layer deep", usually.

const selectCart = (state) => state.cart;

// OUTPUT SELECTOR

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => 
        cartItems.reduce(
            (accumulatedQuantity, cartItem) => 
                accumulatedQuantity + cartItem.quantity,
            0
        )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => 
        cartItems.reduce(
            (accumulatedQuantity, cartItem) => 
                accumulatedQuantity + cartItem.quantity * cartItem.price,
            0
        )
)