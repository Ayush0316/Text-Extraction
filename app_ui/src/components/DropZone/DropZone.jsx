import styles from "./DropZone.module.css";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropZone = ({ addFiles }) => {
  let accept;
  const onDrop = useCallback(addFiles, []);

  const accpetTypes  = {
    "image/png": [".png", ".jpg"],
    "application/pdf": [".pdf"],
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accpetTypes,
  });

  return (
    <div {...getRootProps()} className={styles.Container}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default DropZone;
