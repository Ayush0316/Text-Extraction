import styles from "./ImageEditor.module.css";
import TextExtraction from "../TextExtraction/TextExtraction";

const ImageEditor = () => {
  return (
    <div className={styles.ImageEditor}>
      <div className={styles.Header}>
        <h1>Image Editor</h1>
      </div>
      <TextExtraction />
    </div>
  );
};

export default ImageEditor;
