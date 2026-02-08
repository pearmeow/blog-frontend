import styles from "./Form.module.css";

function Form({ onSubmit, children }) {
    return (
        <>
            <form onSubmit={onSubmit} className={styles.form}>
                {children}
            </form>
        </>
    );
}

export default Form;
