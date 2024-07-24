import styles from './IconButton.module.css';
const IconButton = ({children}) => {
    return (
        <div className={styles.IconButton}>
            {children}
        </div>
    )
}

export default IconButton;