import { Navbar } from "../../components/Navbar"
import { WishListCart } from "../../components/WishListCart"
import { useCart } from "../../context/cart-context"
import { useNavigate } from "react-router-dom"

export const WishList = () => {

    const { wishlist } = useCart();
    const navigate = useNavigate()

    return (
        <>
             <Navbar />
                        <main className="flex flex-col items-center pt-6">
                            {
                                wishlist?.length > 0 ? (
                                    <>
                                        <h2 className="text-3xl">My Cart</h2>
            
                                        <div className="flex gap-8">
                                            <div className="pt-4 flex flex-col gap-4">
                                                {
                                                    wishlist?.length > 0 && wishlist.map(product => <WishListCart key={product.id} product={product} />)
                                                }
                                            </div>
            
                                        </div>
            
                                    </>
            
                                ) : <div>
                                    <h2 className="text-3xl">Favorite Empty</h2>
                                    <p className="text-green-950 hover:cursor-pointer underline " onClick={() => navigate('/')}>Click to add items to favorite</p>
                                </div>
                            }
            
                        </main>
        </>
    )

}