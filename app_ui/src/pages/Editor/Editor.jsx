import ImageEditor from '../../components/EditorComponenet/ImageEditor/ImageEditor';
import DataViewer from '../../components/EditorComponenet/DataViewer/DataViewer';
import styles from './Editor.module.css';

const Editor = () => {
    return (
        <div className={styles.Main}>
            <ImageEditor />
            <DataViewer />
        </div>
    )
}

export default Editor;