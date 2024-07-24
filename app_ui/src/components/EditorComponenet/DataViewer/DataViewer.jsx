import { useSelector } from "react-redux";
import DataRow from "./DataRow/DataRow";
import styles from "./DataViewer.module.css";

const DataViewer = () => {
  const dataList = useSelector((state) => state.selectedDoc.dataList);

  return (
    <div className={styles.DataViewer}>
      <div className={styles.Header}>
        <h1>Data Viewer</h1>
      </div>
      {dataList.map((data, ind) => {
        return (
          <DataRow
            data={data}
            key={ind}
            index={ind}
          />
        );
      })}
    </div>
  );
};

export default DataViewer;
