import DataCell from "../DataCell/DataCell";
import styles from "./DataRow.module.css";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import KVEditor from "./KVEditor/KVEditor";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { DocActions } from "../../../../store/slices/selectedDoc";

const DataRow = ({ data, index }) => {
  const [viewEdit, setViewEdit] = useState(false);
  const dispatch = useDispatch();

  const updateSeletedIndex = () => {
    dispatch(DocActions.updateSelectedDataRow(index));
  }

  return (
    <div className={styles.DataRow}>
      <div className={styles.Main}>
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          onClick={() => setViewEdit(!viewEdit)}
        >
          <RemoveRedEyeIcon />
        </IconButton>
        <p className={styles.SampleData} onClick={updateSeletedIndex}>{data.title}</p>
        <p className={styles.SampleData} onClick={updateSeletedIndex}>{data.value}</p>
      </div>
      {viewEdit && <KVEditor index={index} />}
    </div>
  );
};

export default DataRow;
