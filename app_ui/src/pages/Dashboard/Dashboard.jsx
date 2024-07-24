import styles from "./Dashboard.module.css";

import Modal from "../../components/Modal/Modal";
import InputBox from "../../components/InputBox/InputBox";
import Button from "../../components/Button/Button";
import DropZone from "../../components/DropZone/DropZone";
import Document from "../../components/Document/Document";

import axios from "../../baseAxios";

import { useEffect, useRef, useState } from "react";

const PDFJS = window.pdfjsLib;

const readFileData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = (err) => {
      reject(err);
    };
    reader.readAsDataURL(file);
  });
};

const Dashboard = () => {
  const [user, changeUser] = useState({});
  const [docs, setDocs] = useState([]);
  const [modal, displayModal] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // (async () => {
    //   const res = await axios.get("/api/users");
    //   changeUser(res.data.user);
    // })();
  }, []);

  const addFile = (acceptedFile) => {
    docs.push(acceptedFile[0]);
    setDocs([...docs]);
    console.log(docs);
  };

  const convertPdfToImageUrl = async (file) => {
    let imageurl = "";
    const data = await readFileData(file);
    const pdf = await PDFJS.getDocument(data).promise;
    const canvas = document.createElement("canvas");
    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const viewport = page.getViewport({ scale: 1 });
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport: viewport }).promise;
      imageurl = canvas.toDataURL();
    }
    canvas.remove();
    return imageurl;
  };


  const saveFile = async () => {
    const images = [];
    for (let i = 0; i < docs.length; i++) {
      if (docs[i].type === "application/pdf") {
        const imageurl = await convertPdfToImageUrl(docs[i]);
        images.push(imageurl);
      } else {
        const imageUrl = await readFileData(docs[i]);
        images.push(imageUrl);
      }
    }

    console.log("loaded all images", images)

    try {
      const res = await axios.post("/api/users/addDocument", {
        images,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <h1>{`Welcome, ${user.name}`}</h1>
        <button className={styles.logOut}>Log out</button>
      </div>

      <Modal modal={modal} hideModal={() => displayModal(false)}>
        <div className={styles.modal}>
          <div style={{ display: "flex" }}>
            <InputBox placeholder={"Enter Doc Name"}></InputBox>
          </div>
          <DropZone addFiles={addFile}></DropZone>
          <div style={{ display: "flex" }}>
            <Button
              style={{ width: "150px", backgroundColor: "#00ab41" }}
              text="Save"
              onClick={saveFile}
            ></Button>
            <Button
              style={{ width: "150px", backgroundColor: "#ff2c2c" }}
              text="Discard"
              onClick={(e) => {
                displayModal(false);
              }}
            ></Button>
          </div>
        </div>
      </Modal>

      <div className={styles.docs}>
        {/* {
                    user.docs.map(el => {
                        return <docs image={"image"} text={el.name}></docs>
                    })
                } */}
        <Document
          image={"image"}
          text="Add new docs."
          handleClick={(e) => displayModal(true)}
        ></Document>
        <img src="" ref={imgRef} />
      </div>
    </div>
  );
};

export default Dashboard;
