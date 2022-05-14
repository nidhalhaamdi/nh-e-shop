/* We're going to set it to the value of existingCartItem.
If cartItems.find() is true, it will return us the first item found in our array based of a condition that we pass in.
And the condition is based of this function, where we get each individual carItem and we'll check
the cartItems IDs if it matches the item "we're trying to add" ID.
If it matches, it will set that cartItem where this condition is 'true' to our constant 'existingCartItem', if it doesn't
find anything after looping through all of it, it will be undefined. So then we're going to check.
Well, if existingCarItem exists, then what we're going to return from our entire function is carItems.map() 
because carItems.map() will return us a 'new array' properly.
And what we're going to pass is: carItem, right inside of our map.
So again, each car item and we will do the same thing where if cartItem.id is equal to our cartItemToAdd.id.
Then we will create a new object where we have the cartItem, except the quantity will be cartItem.quantity + 1.
Now, we don't have a quantity yet.
But we're going to solve that after so first what we'll do is: If that item doesn't match, 
we just want to return the original car item because there's no need to update */

export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ) 
    }
    return [...cartItems, { ...cartItemToAdd, quantity: 1}]
}

export const removeItemFromCart = ( cartItems, cartItemToRemove ) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    );

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(
            cartItem => cartItem.id !== cartItemToRemove.id
        )
    }
    return cartItems.map(
        cartItem =>
        cartItem.id === cartItemToRemove.id ?
        { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
}