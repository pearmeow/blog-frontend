import styles from "./Input.module.css";

function Input({
    type,
    labelName,
    name,
    id,
    defaultValue,
    defaultChecked,
    required,
    minLen,
    maxLen,
}) {
    return (
        <>
            <p className={styles.container}>
                <label htmlFor={id} className={styles.label}>
                    {labelName}
                </label>
                <input
                    id={id}
                    type={type}
                    name={name}
                    defaultValue={defaultValue}
                    defaultChecked={defaultChecked}
                    required={required}
                    minLength={minLen}
                    maxLength={maxLen}
                />
            </p>
        </>
    );
}

export default Input;
