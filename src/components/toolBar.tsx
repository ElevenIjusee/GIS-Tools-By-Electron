/*
 * @Description: 工具栏和那只可爱的猫
 * @Author: Jin
 * @Date: 2021-08-10 17:28:03
 * @LastEditors: Jin
 * @LastEditTime: 2021-08-31 14:33:30
 */
import { electron } from 'process';
import React, { useEffect, FC, useContext } from 'react';
import styles from './toolBarStyle.less';
import {ipcRenderer} from 'electron';
import appStore from '../stores/appStore';
import {history} from 'umi';
import { observer, useObserver } from "mobx-react-lite";

const ToolBar: FC<{}> = () => {

  const store = useContext(appStore);

  const miniEvent = () => {
    ipcRenderer.send('window-mini');
  };

  const maxEvent = () => {
    ipcRenderer.send('window-max');
  };

  const closeEvent = () => {
    // ipcRenderer.send('window-close'); 
    store.changeQW(true);
  };

  const backHomeEvent = () => {
    history.push('/');
    store.changeBH(false);
  };

  return (
    <div className={styles.toolBarContainer}>
      <div className={styles.blockDiv} />
      <img className={styles.catImg} src={require('imgs/ELevenCat.gif')} />
      <img className={styles.backHomeButton} src={require('imgs/backHome.png')} title='返回首页' onClick={backHomeEvent} style={{ display: store.BHstate ? "block" : "none" }} />
      <div className={styles.toolBarA} />
      <div className={styles.toolBarB} />
      <div className={styles.toolBarC}>
        <img className={styles.img} src={require('imgs/minisize.png')} onClick = {miniEvent}/>
        <img className={styles.img} src={require('imgs/maxsize.png')} onClick = {maxEvent} />
        <img className={styles.img} src={require('imgs/close.png')} onClick = {closeEvent}/>
      </div>
    </div>
  );
};

export default observer(ToolBar);