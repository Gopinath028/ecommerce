import { useCart } from "../../context/cart-context";
import { findProductInCart } from "../../utils/findProductInCart";
import { useNavigate } from "react-router-dom";
import { findProductInWishlist } from "../../utils/findProductInWishlist";


export const ProductCard = ({ product }) => {


    const { cart, wishlist, cartDispatch } = useCart();

    const navigate = useNavigate();

    const isProductInCart = findProductInCart(cart, product.id)
    const isProductInWishList = findProductInWishlist(wishlist, product.id)

    const onCartClick = (product) => {
        !isProductInCart ?
            cartDispatch({
                type: 'ADD_TO_CART',
                payload: { product }
            }) : navigate('/cart')
    }

    const onFavoriteClick = (product) => {
        !isProductInWishList ?
            cartDispatch({
                type: 'ADD_TO_WISHLIST',
                payload: { product }
            }) : navigate('/wishlist')
    }


    return (
        <div className="card card-vertical d-flex direction-column relative shadow">
            <div className="card-image-container">
                <img
                    className="card-image"
                    src={product.images[0]}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                />
            </div>
            <div className="card-details">
                <div className="card-des">{product.title}</div>
                <div className="card-description">
                    <p className="card-price">
                        Rs. {product.price}
                    </p>
                </div>
                <div className="cta-btn">
                    <button
                        onClick={() => onFavoriteClick(product)}
                        className="button btn-primary btn-icon cart-btn d-flex align-center justify-center cursor btn-margin"
                        style={{ gap: '0.5rem' }} 
                    >
                        <div className="d-flex align-center justify-center gap">
                            <span className="material-icons-outlined">
                                {isProductInWishList ? 'favorite' : 'favorite_border'}
                            </span>
                            <span>
                                {isProductInWishList ? 'Go to Wishlist' : 'Add To Wishlist'}
                            </span>
                        </div>
                    </button>

                    <button onClick={() => onCartClick(product)} className="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin">
                        <span className="material-icons-outlined">
                            {
                                isProductInCart ? 'shopping_cart_checkout' : 'shopping_cart'
                            }
                        </span>
                        {
                            isProductInCart ? 'Go to Cart' : 'Add To Cart'
                        }

                    </button>
                </div>
            </div>
        </div>
    );
};
