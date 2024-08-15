'use client'
import React, { useReducer } from "react"

export const CartContext = React.createContext()


function CartContextProvider({ children }) {


    function cartFunction(state, action) {
        switch (action.type) {
            case "setCart": {
                return action.data
            }
            case "add":
                return add(action, state)
            case "sub":
                return sub(action, state)
            case "addToCart":
                return addToCart(action, state)
            case "clearCart":
                return clearCart()
            default:
                return state
        }

    }




    function sub(action, state) {
        return state.map(map => {
            if (map.id === action.id) {
                return { ...map, quantity: map.quantity - 1 }
            }
            return map
        })
    }

    function addToCart(action, state) {
        const itemInCart = state?.find((i) => i.id === action.id)
        if (!itemInCart) {
            return [...state, { id: action.id, quantity: 1, price: action.price, name: action.name, slug: action.slug }]
        }

    }

    function clearCart(action, state) {
        return []
    }



    const localState = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("cart")) : null

    const [cart, dispatch] = useReducer(cartFunction, localState || [])


    React.useEffect(() => {

        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (

        < CartContext.Provider value={{ data: cart, dispatch }
        }>
            {children}
        </CartContext.Provider >
    )
}

export default CartContextProvider