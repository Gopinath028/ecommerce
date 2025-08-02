import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useLogin } from "../../context/login-context";

export const Navbar = () => {

    const navigate = useNavigate();
    const [isAccountDropDownOpen, setIsAccountDroupDownOpen] = useState(false);
    const { token, loginDispatch } = useLogin();

    const onLoginClick = ()=> {
      if (token?.access_token) {
            navigate('auth/login')             
         } else {
            loginDispatch({
               type: 'LOGOUT' 
            })
            navigate('auth/login')
         }
    }

    return (
        <header className="flex bg-green-900 py-4 px-6 text-slate-50">
            <div>
                <h1 onClick={() => navigate('/')} className="text-5xl hover:cursor-pointer">Shop It</h1>
            </div>
            <nav className="ml-auto flex gap-4 ">
                <span onClick={() => navigate('/wishlist')} class="material-icons-outlined text-3xl hover:cursor-pointer">
                    favorite
                </span>

                <span onClick={() => navigate('/cart')} class="material-icons-outlined text-3xl hover:cursor-pointer">
                    shopping_cart
                </span>

                <div className="relative">
                    <span onClick={()=> setIsAccountDroupDownOpen(!isAccountDropDownOpen)} class="material-icons-outlined text-3xl hover:cursor-pointer">
                        account_circle
                    </span>
                    {
                        isAccountDropDownOpen && <div className="absolute bg-green-400">
                            <button onClick={onLoginClick}>
                                {
                                    token?.access_token ? 'Logout' : 'Login'
                                }
                            </button>
                        </div>

                    }
                </div>
            </nav>
        </header>
    )
}