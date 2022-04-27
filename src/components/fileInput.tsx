/*
 * @Description: 文件输入框
 * @Author: Jin
 * @Date: 2021-08-24 11:35:38
 * @LastEditors: Jin
 * @LastEditTime: 2022-04-25 19:53:20
 */
import { createRef, FC, RefObject, useRef } from "react";
import styles from "./fileInputStyle.less";

export type T_FileIput = {
  filePath: string;
  desText: string;
  changeEvent: () => void;
};

const FileInput: FC<T_FileIput> = (props) => {
  const inputDom: RefObject<HTMLInputElement> = createRef();

  const clickFun = () => {
    props.changeEvent();
    inputDom.current!.focus();
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <div className={styles.inputText}>{props.desText}</div>
        <input
          className={styles.inputPath}
          type="text"
          value={props.filePath}
          ref={inputDom}
        />
        <img
          className={styles.fileIcon}
          src={require("imgs/fileIco.png")}
          onClick={clickFun}
        />
      </div>
    </div>
  );
};

export default FileInput;
