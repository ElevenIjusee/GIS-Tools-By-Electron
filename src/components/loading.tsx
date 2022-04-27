/*
 * @Description: 转换时的loading
 * @Author: Jin （https://github.com/ElevenIjusee?tab=repositories）
 * @Date: 2021-09-07 20:46:33
 * @LastEditors: Jin
 * @LastEditTime: 2022-04-27 22:17:07
 */
import { FC, useState } from "react";
import styles from "./loadingStyle.less";
import ConfirmButton from "./confirmButton";
import { T_cfButton } from "./confirmButton";

type T_Load = T_cfButton & {
  display: boolean;
  isComplete: boolean;
};

const LoadingEle: FC<T_Load> = (props) => {
  const { text, clickFun, display, isComplete } = props;

  return (
    <div
      className={styles.container}
      style={{ display: display ? "flex" : "none" }}
    >
      <img
        className={styles.complete}
        style={{ display: isComplete ? "block" : "none" }}
        src={require("imgs/complete.png")}
      />
      <div
        className={styles.cat}
        style={{ display: isComplete ? "none" : "flex" }}
      >
        {/* <div className={styles.cat} > */}
        <div className={styles.catBody}></div>
        <div className={styles.catBody}></div>
        <div className={styles.catTail}></div>
        <div className={styles.catHead}></div>
      </div>
      <input className={styles.outLog} type="text" value={text} />
      {/* <ConfirmButton text="取消" clickFun={clickFun} /> */}
    </div>
  );
};

export default LoadingEle;
