function Input({ type, labelName, name, id, defaultValue, defaultChecked }) {
    return (
        <>
            <p>
                <label htmlFor={id}>{labelName} </label>
                <input
                    id={id}
                    type={type}
                    name={name}
                    defaultValue={defaultValue}
                    defaultChecked={defaultChecked}
                />
            </p>
        </>
    );
}

export default Input;
