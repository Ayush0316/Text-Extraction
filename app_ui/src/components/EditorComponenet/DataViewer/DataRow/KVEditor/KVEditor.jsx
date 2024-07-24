import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './KVEditor.module.css';
import TextArea from './TextArea';
import { DocActions } from '../../../../../store/slices/selectedDoc';

const KVEditor = ({index}) => {
    const data = useSelector(state => state.selectedDoc.dataList[index]);

    const dispatch = useDispatch();

    const updateData = (title, value) => {
        const updatedData = {title, value};
        console.log("updating data", updatedData)
        const newData = {index, updatedData};
        dispatch(DocActions.updateData(newData));
    }

    return (
        <div className={styles.KVEditor}>
            <div className={styles.Main}>   
                <TextArea value={data.title} css={{'flex':1}} onChange={(val) => updateData(val, data.value)}/>
                <TextArea value={data.value} css={{'flex':1}} onChange={(val) => updateData(data.title, val)}/>
            </div>
            <div className={styles.Footer}>
                {/* <Button variant="contained">Save</Button> */}
                <Button variant="contained" color="error" style={{marginLeft:"10px"}} onClick={() => {
                    dispatch(DocActions.deleteData({index}))
                }}>Delete</Button>
            </div>
        </div>
    )
}

export default KVEditor;