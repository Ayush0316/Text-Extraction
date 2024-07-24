import styles from './Modal.module.css'

const Modal = ({modal, hideModal, children}) => {
    return (
        <div className={modal?styles.show:styles.hide}>
            <div className={[styles.Backdrop, styles.BackdropShow].join(" ")} onClick={hideModal}></div>
            {children}
        </div>
    )
}

export default Modal