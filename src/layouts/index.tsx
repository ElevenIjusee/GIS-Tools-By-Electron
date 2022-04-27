/*
 * @Description: 全局样式
 * @Author: Jin
 * @Date: 2021-08-10 21:30:31
 * @LastEditors: Jin
 * @LastEditTime: 2022-04-23 20:37:16
 */

import { FC, useEffect } from "react";
import ToolBar from "../components/toolBar";
import styles from "./indexStyles.less";
import QuitWindow from "../components/quitWindow";
import { Provider } from "mobx-react";
import appStore from "../stores/appStore";

const Layout: FC<{}> = (props: any) => {
  useEffect(() => {
    const remote = require("electron").remote;
    let win = remote.getCurrentWindow();
    window.addEventListener("mousemove", (event) => {
      let flag = event.target === document.documentElement;
      if (flag) {
        win.setIgnoreMouseEvents(true, { forward: true });
      } else {
        win.setIgnoreMouseEvents(false);
      }
    });
    win.setIgnoreMouseEvents(true, { forward: true });
  }, []);

  return (
    <Provider store={appStore}>
      <QuitWindow />
      <div className={styles.upContainer}></div>
      <ToolBar />
      <img className={styles.footerImg} src={require("imgs/footerImg.png")} />
      <div className={styles.belowContainer}>{props.children}</div>
    </Provider>
  );
};

export default Layout;
