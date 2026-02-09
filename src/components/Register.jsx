import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./Register.module.css";

function Register() {
    const [errorMessage, setErrorMessage] = useState([]);
    const nav = useNavigate();
    const handleRegister = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get("username");
        const password = formData.get("password");
        const confirm = formData.get("confirm");
        try {
            const res = await fetch(import.meta.env.VITE_API + "users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    confirm,
                }),
            });
            if (res.ok) {
                let result = await res.json();
                nav("/");
                console.log(result);
            } else {
                let result = await res.json();
                console.log(result);
                let errs = [];
                for (const elem of result) {
                    errs.push(<p>{elem.msg}</p>);
                }
                setErrorMessage(errs);
            }
        } catch (err) {
            console.log(err);
            setErrorMessage("Failed to fetch from api");
            return;
        }
    };
    return (
        <div className={styles.register}>
            <p className={styles.title}>Register</p>
            {errorMessage}
            <Form onSubmit={handleRegister}>
                <Input
                    type="text"
                    labelName="Username"
                    name="username"
                    id={1}
                    required={true}
                />
                <Input
                    type="password"
                    labelName="Password"
                    name="password"
                    id={2}
                    required={true}
                    minLen={8}
                    maxLen={32}
                />
                <Input
                    type="password"
                    labelName="Confirm Password"
                    name="confirm"
                    id={3}
                    required={true}
                    minLen={8}
                    maxLen={32}
                />
                <Button
                    type="submit"
                    text="Submit"
                    className={styles.formLink}
                />
                <Link to="/" className={styles.formLink}>
                    <Button text="Back to login" className={styles.formLink} />
                </Link>
            </Form>
        </div>
    );
}

export default Register;
