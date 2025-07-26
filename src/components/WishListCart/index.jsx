import { useCart } from "../../context/cart-context";
import { findProductInCart } from "../../utils/findProductInCart";
import { findProductInWishlist } from "../../utils/findProductInWishlist";
import { useNavigate } from "react-router-dom";

export const WishListCart = ({ product }) => {
    const {cart, wishlist, cartDispatch } = useCart();

     const isProductInCart = findProductInCart(cart, product.id)
    const isProductInWishList = findProductInWishlist(wishlist, product.id)
    const navigate = useNavigate();

    const onRemoveFavorite = (product) => {
        cartDispatch({
            type: 'REMOVE_FROM_FAVORITE',
            payload: { id: product.id }
        })
    }

    const onCartClick = (product) => {
        isProductInWishList ?
            cartDispatch({
                type: 'ADD_TO_CART',
                payload: { product }
            }) : navigate('/cart')
    }





    return (
        <div class="card-horizontal d-flex shadow">
            <div class="card-hori-image-container relative">
                <img class="card-image" src={product.images[0]} alt={product.title} referrerPolicy="no-referrer" />
            </div>
            <div class="card-details d-flex direction-column">
                <div class="card-title">{product.title}</div>
                <div class="card-description">
                    <p class="card-price">Rs. {product.price}  </p>
                </div>
                <div class="quantity-container d-flex gap">
                    <p class="q-title">Quantity: </p>
                    <div class="count-container d-flex align-center gap">
                        <button class="count">-</button>
                        <span class="count-value">1</span>
                        <button class="count">+</button>
                    </div>
                </div>
                <div class="cta-btn d-flex gap">
                    <div class="cta-btn">
                        <button onClick={() => onRemoveFavorite(product)} class="button hori-btn btn-primary btn-icon d-flex align-center justify-center gap cursor btn-margin">Remove From Favorite</button>
                    </div>
                    <div class="cta-btn">
                        <button onClick={() => onCartClick(product)}  className="button hori-btn btn-outline-primary btn-icon d-flex align-center justify-center gap cursor btn-margin">
                            <span className="material-icons-outlined" onClick={()=>navigate('/cart')}>
                                {isProductInCart ? 'shopping_cart_checkout' : 'shopping_cart'}
                            </span>
                            { isProductInCart ? 'Go to Cart' : 'Add To Cart'}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}