/*
 * @Description: 3D_tiles转换的全局路由
 * @Author: Jin
 * @Date: 2021-08-24 15:17:28
 * @LastEditors: Jin
 * @LastEditTime: 2022-04-23 19:36:18
 */
import { FC, useState } from "react";
import styles from "./_layoutStyle.less";
import NavigationItem, { T_itemProp } from "../../components/navigationItem";
import { history } from "umi";

const Layout_3Dtile: FC<{}> = (props) => {
  const [isClick, changeClick] = useState("osgbPage");

  const mainFun = (value: string) => {
    changeClick(value);

    value = value === "/" ? value : `/tilePage/${value}`;
    history.push(value);
  };

  const data: Array<T_itemProp> = [
    {
      text: "返回首页",
      imgUrl: require("imgs/wallCat.gif"),
      main: true,
      value: "/",
    },
    // {text:"OSGB转3D_tiles", imgUrl: require('imgs/6.png'), value: 'osgbPage'},
    // {text:"shp转3D_tiles", imgUrl: require('imgs/2.png'), value: 'shpPage'},
    // {text:"FBX等转3D_tiles", imgUrl: require('imgs/4.png'), value: 'fbxPage'},
  ];

  return (
    <div className={styles.container}>
      <div className={styles.leftNavigation}>
        {data.map((item) => {
          return (
            <NavigationItem
              key={item.value}
              {...item}
              isClicked={isClick === item.value}
              clickFun={() => {
                mainFun(item.value);
              }}
            />
          );
        })}
      </div>
      <div className={styles.sideImg} />
      <div className={styles.childrenContainer}>{props.children}</div>
    </div>
  );
};

export default Layout_3Dtile;
