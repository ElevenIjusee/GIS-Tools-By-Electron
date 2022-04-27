/*
 * @Description: 左侧导航栏单元
 * @Author: Jin
 * @Date: 2021-08-23 16:08:28
 * @LastEditors: Jin
 * @LastEditTime: 2021-08-30 16:15:15
 */
import React, { useState, FC } from 'react';
import styles from './navigationItemStyle.less';

export type T_itemProp = {
  imgUrl?: string;
  text: string;
	main?: boolean;
  isClicked?: boolean;
  value: string;
  clickFun?: ()=> void;
};

const NavigationItem: FC<T_itemProp> = (props) => {
  
  const { imgUrl, text, main, isClicked, clickFun } = props;

  return (
    <div className={ isClicked ? styles.containerClicked : styles.container } onClick={clickFun}>
      <img className={ main ? styles.imgItemMain : styles.imgItem } src={imgUrl} />
      <div className={ main ? styles.describeTextMain : styles.describeText }>{text}</div>
    </div>
  );
};

export default NavigationItem;