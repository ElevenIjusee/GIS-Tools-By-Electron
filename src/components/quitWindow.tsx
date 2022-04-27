/*
 * @Description: 退出时的弹窗
 * @Author: Jin
 * @Date: 2021-08-13 15:46:22
 * @LastEditors: Jin
 * @LastEditTime: 2021-08-19 15:36:29
 */
import { FC, useEffect, useState, useContext } from 'react';
import styles from './quitWindowStyle.less'
import { observer, useObserver } from "mobx-react-lite";
import appStore from '../stores/appStore';
import {ipcRenderer} from 'electron';

const QuitWindow: FC<{}> = () => {

	const store = useContext(appStore);

	const quitEvent = () => {
		ipcRenderer.send('window-close');
	};

	const cancelEvent = () => {
		store.changeQW(false)
	};

	return (
		<div className={styles.quitContainer} style={{ display: store.QWstate ? "block" : "none" }}>
			<img className={styles.catBox} src={require('imgs/catBox.png')} />
			<img className={styles.catImg} src={require('imgs/c2e2.gif')} />
			<img className={styles.quitButton} src={require('imgs/quitButton.png')} onClick={quitEvent}/>
			<img className={styles.cancelButton} src={require('imgs/cancelButton.png')} onClick={cancelEvent}/>
		</div>
	)
};

export default observer(QuitWindow);