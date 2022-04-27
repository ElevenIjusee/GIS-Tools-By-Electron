/*
 * @Description: OSGB转换3D_tiles页面
 * @Author: Jin (https://github.com/ElevenIjusee?tab=repositories)
 * @Date: 2021-08-24 17:03:09
 * @LastEditors: Jin
 */
import { FC, useState, useEffect } from "react";
import styles from "./osgbPageStyle.less";
import FileInput from "../../components/fileInput";
import { ipcRenderer } from "electron";
import ConfirmButton from "../../components/confirmButton";
import LoadingELe from "../../components/loading";

// const spawn = require('child_process')
// const { spawn } = require('child_process');

const OSGBPage: FC<{}> = () => {
  const [inputPath, changeInputPath] = useState("");
  const [outPutPath, changeOutputPath] = useState("");
  const [logText, changeLogText] = useState("转换开始...");
  const [loadStatus, changeLoadStatus] = useState(false);
  const [isComplete, changeComplete] = useState(false);

  const changeInput = (): void => {
    ipcRenderer.send("open-fileInput-dialog");
  };

  const changeOutput = (): void => {
    ipcRenderer.send("open-fileOutput-dialog");
  };

  const processEvent = (event: any, message: string): any => {
    console.log(message);
    message === "www.ijusee.com"
      ? changeLoadStatus(false)
      : changeLogText(message);
  };

  useEffect(() => {
    ipcRenderer.on("selected-input-directory", (event, path) => {
      changeInputPath(path);
    });

    ipcRenderer.on("selected-output-directory", (event, path) => {
      changeOutputPath(path);
    });

    ipcRenderer.on("dir", processEvent);

    return () => {
      ipcRenderer.removeAllListeners("selected-input-directory");
      ipcRenderer.removeAllListeners("selected-output-directory");
      ipcRenderer.removeAllListeners("dir");
    };
  }, []);

  const confirmFun = (): void => {
    if (inputPath && outPutPath) {
      changeLoadStatus(true);

      const finalCommand: string = ` -f osgb -i ${inputPath} -o ${outPutPath}`;

      ipcRenderer.send("osgb-to-3dtile", finalCommand);
    }
  };

  const cancelFun = (): void => {
    ipcRenderer.send("cancelShell");
  };

  return (
    <div className={styles.container}>
      <div className={styles.blockDiv} />
      <LoadingELe
        text={logText}
        clickFun={cancelFun}
        display={loadStatus}
        isComplete={isComplete}
      />
      <FileInput
        key={1}
        filePath={inputPath}
        desText={"输入文件夹："}
        changeEvent={changeInput}
      />
      <FileInput
        key={2}
        filePath={outPutPath}
        desText={"输出文件夹："}
        changeEvent={changeOutput}
      />
      <ConfirmButton text="开始转换" clickFun={confirmFun} />
    </div>
  );
};

export default OSGBPage;
