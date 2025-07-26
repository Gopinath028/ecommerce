import { useNavigate } from "react-router-dom"

export const Navbar = () => {

    const navigate = useNavigate();

    return (
        <header className="flex bg-green-900 py-4 px-6 text-slate-50">
            <div>
                <h1 onClick={()=> navigate('/')} className="text-5xl hover:cursor-pointer">Shop It</h1>
            </div>
            <nav className="ml-auto flex gap-4 ">
                <span onClick={() => navigate('/wishlist')} class="material-icons-outlined text-3xl hover:cursor-pointer">
                    favorite
                </span>

                <span onClick={() => navigate('/cart')} class="material-icons-outlined text-3xl hover:cursor-pointer">
                    shopping_cart
                </span>

                <span class="material-icons-outlined text-3xl hover:cursor-pointer">
                    account_circle
                </span>
            </nav>
        </header>
    )
}