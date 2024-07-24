import React, { useEffect, useState, useRef } from "react";
import Tesseract from "tesseract.js";

import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";
import { DocActions } from "../../../store/slices/selectedDoc";
import { useDispatch, useSelector } from "react-redux";
import styles from "./TextExtraction.module.css";

import "react-image-crop/dist/ReactCrop.css";
import { alertClasses } from "@mui/material";
import Overlay from "../ImageEditor/Overlay/Overlay";
// import { get } from "immer/dist/internal";
import { Input } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function TextExtraction() {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const parentImgRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [key, setKey] = useState("");
  const [keyMetadata, setKeyMetadata] = useState({});
  const [value, setValue] = useState("");
  const [valueMetadata, setValueMetedata] = useState({});
  const [coOrdinates, setCoOrdinates] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const seletedIndex = useSelector(state => state.selectedDoc.seletedDataRow);
  const seletedData = useSelector(state => state.selectedDoc.dataList[seletedIndex]);

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale
        );
      }
    },
    100,
    [completedCrop, scale]
  );

  const addAsKey = () => {
    setLoading(true);
    const cb = (text) => {
      setKey(text);
      let keyMetadata = JSON.parse(JSON.stringify(coOrdinates));
      setKeyMetadata(keyMetadata);
      setLoading(false);
    };
    getCurrentText(cb);
  };

  const addAsValue = () => {
    setLoading(true);
    const cb = (text) => {
      setValue(text);
      console.log("value", value);
      let valueMetadata = JSON.parse(JSON.stringify(coOrdinates));
      setValueMetedata(valueMetadata);
      setLoading(false);
    };
    getCurrentText(cb);
  };

  const getCurrentText = (cb) => {
    if (!completedCrop) {
      cb();
      return;
    }
    console.log(previewCanvasRef);
    let can = previewCanvasRef.current;
    let ctx = can.getContext("2d");
    ctx.fillRect(50, 50, 50, 50);

    var img = new Image();
    img.src = can.toDataURL();
    Tesseract.recognize(img, "eng")
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        console.log(result);
        let newText = result.data.text;
        console.log(newText);
        cb(newText);
      });
  };

  const handleSave = () => {
    console.log(key, value);
    if (!value) {
      alert("Please select the value");
      return;
    }
    const newData = { title: key, value: value, keyMetadata, valueMetadata };
    console.log(newData);
    dispatch(DocActions.addData(newData));
  };

  const fillCoOrdinates = (c) => {
    const temp = {
      x: c.x,
      y: c.y,
      height: c.height,
      width: c.width,
    };
    console.log(temp);
    setCoOrdinates(temp);
  };


  const getOverlays = () => {
    console.log("calling get overlays");
    const overlays = [];

    console.log(seletedData)

    if(seletedData && seletedData.keyData.length != 0){
      const tData = seletedData.keyData;
      const nO = <Overlay x={tData.x} y={tData.y} height={tData.height} width={tData.width}/>
      overlays.push(nO);
    }

    if(seletedData && seletedData.valueData){
      const tData = seletedData.valueData;
      const nO = <Overlay x={tData.x} y={tData.y} height={tData.height} width={tData.width}/>
      overlays.push(nO);
    }

    console.log(overlays)
    return overlays;
  }

  return (
    <div className={styles.App}>
      <div className="Crop-Controls">
        <Input type="file" accept="image/*" onChange={onSelectFile} />
        <div>
          <label htmlFor="scale-input">Scale: </label>
          <input
            id="scale-input"
            type="number"
            step="0.1"
            value={scale}
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div>
      </div>
      {!!imgSrc && (
        <ReactCrop
          ref={parentImgRef}
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => {
            fillCoOrdinates(c);

            setCompletedCrop(c);
          }}
        >
          <img
            alt="Crop me"
            ref={imgRef}
            src={imgSrc}
            style={{ transform: `scale(${scale})` }}
          />
          {getOverlays()} 
        </ReactCrop>
      )}
      <div>
        {!!completedCrop && (
          <canvas
            ref={previewCanvasRef}
            style={{
              border: "1px solid black",
              objectFit: "contain",
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        )}
        <br />
        <div className={styles.buttonBox}>
          <LoadingButton
            loading={loading}
            onClick={addAsKey}
            variant="contained"
            color="primary"
          >
            add as Key
          </LoadingButton>
          <LoadingButton
            loading={loading}
            onClick={addAsValue}
            variant="contained"
            color="primary"
          >
            add as Value
          </LoadingButton>
          <LoadingButton
            loading={loading}
            onClick={handleSave}
            variant="contained"
            color="success"
          >
            Save to DB
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
