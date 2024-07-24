import styles from './Button.module.css'

const Button = (props) => {
    return (
        <button style={props.style} className={styles.Button} onClick={props.onClick}>{props.text}</button>
    );
}

export default Button;