import { useNavigate } from "react-router";
import Button from "./Button.jsx";
import Form from "./Form.jsx";

function Logout() {
    const nav = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        nav("/");
    };

    return (
        <>
            <p></p>
            <Form onSubmit={handleLogout}>
                <Button type="submit" text="Log out" />
            </Form>
        </>
    );
}

export default Logout;
