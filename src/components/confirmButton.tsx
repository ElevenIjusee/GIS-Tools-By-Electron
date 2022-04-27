/*
 * @Description: 确认按钮
 * @Author: Jin
 * @Date: 2021-08-30 16:03:01
 * @LastEditors: Jin
 * @LastEditTime: 2022-04-13 16:06:26
 */
import { FC } from "react";
import styles from "./confirmButtonStyle.less";

export type T_cfButton = {
  text: string;
  clickFun: () => void;
};

const ConfirmButton: FC<T_cfButton> = (props) => {
  const { text, clickFun } = props;

  return (
    <div className={styles.container}>
      <div className={styles.confirmButton} onClick={clickFun}>
        {text}
      </div>
    </div>
  );
};

export default ConfirmButton;
