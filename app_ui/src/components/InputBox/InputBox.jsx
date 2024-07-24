import styles from './InputBox.module.css';

const InputBox = (props) => {
    return(
        <>
            <input className={styles.InputBox} type={props.type} placeholder={props.placeholder} onChange={(e) => props.onChange(e.target.value) }></input>
        </>
    )
}

export default InputBox;