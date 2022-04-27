/*
 * @Description: dem转cesium的地形
 * @Author: Jin
 * @Date: 2021-08-31 09:46:05
 * @LastEditors: Jin
 * @LastEditTime: 2021-09-07 09:52:53
 */
import { FC, useState, useEffect } from 'react';
import styles from './demPageStyle.less';
import FileInput from '../../components/fileInput';
import { ipcRenderer } from 'electron';
import ConfirmButton from '../../components/confirmButton';

const DEMPage: FC<{}> = () => {
  const [inputPath, changeInputPath] = useState('');
  const [outPutPath, changeOutputPath] = useState('');

  const changeInput = (): void => {
    ipcRenderer.send('open-fileInput-dialog');
  };

  const changeOutput = (): void => {
    ipcRenderer.send('open-fileOutput-dialog');
  };

  useEffect(() => {
    ipcRenderer.on('selected-input-directory', (event, path) => {
      changeInputPath(path);
    });

    ipcRenderer.on('selected-output-directory', (event, path) => {
      changeOutputPath(path);
    });

    ipcRenderer.on('dir', (event, message) => {
      console.log(message);
      if (message === '完成转换') {
        console.log(352452);
      }
    });

    return () => {};
  }, []);

  const confirmFun = (): void => {
    if (inputPath && outPutPath) {
      const finalCommand: string = `./3dtile.exe -f osgb -i ${inputPath} -o ${outPutPath}`;

      ipcRenderer.send('osgb-to-3dtile', finalCommand);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.blockDiv} />
      <FileInput
        key={1}
        filePath={inputPath}
        desText={'输入文件夹：'}
        changeEvent={changeInput}
      />
      <FileInput
        key={2}
        filePath={outPutPath}
        desText={'输出文件夹：'}
        changeEvent={changeOutput}
      />
      <ConfirmButton text="开始转换" clickFun={confirmFun} />
    </div>
  );
};

export default DEMPage;
