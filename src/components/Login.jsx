import styles from "./Login.module.css";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

function Login() {
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const handleLogin = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get("username");
        const password = formData.get("password");
        try {
            const token = await fetch(
                import.meta.env.VITE_API + "tokens/users",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                },
            );
            if (token.ok) {
                const jwt = await token.json();
                localStorage.setItem("token", jwt);
                // setErrorMessage("Username or password is right");
                navigate("/posts");
            } else {
                setErrorMessage("Username or password is wrong");
            }
        } catch (err) {
            console.log(err);
            setErrorMessage("Failed to fetch from api");
            return;
        }
    };
    return (
        <div className={styles.loginPage}>
            <p className={styles.login}>Login</p>
            {errorMessage}
            <Form onSubmit={handleLogin}>
                <Input
                    type="text"
                    labelName="Username"
                    name="username"
                    id={1}
                />
                <Input
                    type="password"
                    labelName="Password"
                    name="password"
                    id={2}
                />
                <Button type="submit" text="Log in" />
            </Form>
            <Link to="/register" className="fakeButton">
                Register
            </Link>
        </div>
    );
}

export default Login;
