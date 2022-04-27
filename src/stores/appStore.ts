/*
 * @Description: 全局store
 * @Author: Jin (https://github.com/ElevenIjusee?tab=repositories)
 * @Date: 2021-08-17 15:33:41
 * @LastEditors: Jin
 * @LastEditTime: 2022-04-27 22:17:15
 */
import { observable, action, makeAutoObservable } from "mobx";
import { createContext } from "react";

class appStore {
  // 整个程序退出弹窗的状态
  QWstate = false;

  // 控制返回主页的按钮显示隐藏
  // BHstate = false;

  constructor() {
    makeAutoObservable(this);
  }

  changeQW = (state: boolean) => {
    this.QWstate = state;
  };

  // changeBH = (state: boolean) => {
  // 	this.BHstate = state;
  // }
}

export default createContext(new appStore());
