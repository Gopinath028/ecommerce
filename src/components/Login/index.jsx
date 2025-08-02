import { useLogin } from "../../context/login-context";
import { userLogin } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const { loginDispatch, email, password } = useLogin();
    const navigate = useNavigate();

    const onFormSubmit = async (e) => {
    e.preventDefault();

    try {
        const data = await userLogin(email, password);
        console.log("Login response:", data);

        if (data.access_token) {
            loginDispatch({
                type: 'TOKEN',
                payload: { token: data.access_token }
            });

            alert("Login successful!");
            navigate('/');
            

        } else {
            alert("Login failed. Invalid credentials.");
        }
    } catch (error) {
        alert("Login error: " + error.message);
    }
};


    const onEmailChange = (e) => {
        loginDispatch({
            type: 'EMAIL',
            payload: {
                value: e.target.value
            }
        })
    }

    const onPasswordChange = (e) => {
        loginDispatch({
            type: 'PASSWORD',
            payload: {
                value: e.target.value
            }
        })
    }

    return (
        <form onSubmit={onFormSubmit} className="bg-white shadow-md w-[400px] p-10">
            <h2 className="flex justify-center text-3xl">Login</h2>
            <div className="flex flex-col gap-2">
                <span>Email *</span>
                <input className="border-b-2" onChange={onEmailChange} type="email" required placeholder="Sample12@gmail.com" />
            </div>
            <div className="flex flex-col gap-2">
                <span>password *</span>
                <input className="border-b-2" onChange={onPasswordChange} type="password" required placeholder="password" />
            </div>
            <div className="mx-4">
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded mt-4">
                    Login
                </button>

            </div>
            <div className="text-center">
                <p>
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-green-600 font-semibold cursor-pointer hover:underline">
                        Create one
                    </span>
                </p>
            </div>
        </form>
    )
}