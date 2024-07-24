import styles from './Overlay.module.css';

const Overlay = ({x, y, height, width}) => {

    const BoxStyle={
        position:'absolute',
        top: y+'px',
        left: x+'px',
        height:height+'px',
        width:width+'px',
        border: '3px solid red'
    };

    return (
        <div className={styles.Overlay}>
            <div style={BoxStyle}></div>
        </div>
    )
}


export default Overlay;
