import styles from './Document.module.css';

const Document = ({text, handleClick}) => {
    return (
        <div className={styles.Container}>
            <div style={{width:"220px", height:"250px", border:"1px solid black", marginBottom:"10px"}} onClick={handleClick}></div>
            <div style={{textAlign:"center", fontSize:"0.8rem"}} onClick={handleClick}>{text}</div>
        </div>
    )
}

export default Document;