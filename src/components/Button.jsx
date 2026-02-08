import "./Button.module.css";

function Button({ type, text, className }) {
    return (
        <>
            <button type={type} className={className}>
                {text}
            </button>
        </>
    );
}

export default Button;
