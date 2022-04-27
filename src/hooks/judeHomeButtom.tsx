/*
 * @Description: 通过当前路由判断homeButton是否显示
 * @Author: Jin
 * @Date: 2021-08-23 17:43:31
 * @LastEditors: Jin
 * @LastEditTime: 2021-09-09 10:17:21
 */
import { useEffect, useContext } from 'react';
import { useRouteMatch } from 'umi';
import appStore from '../stores/appStore';

const useJudeHomeButton = () => {
  const store = useContext(appStore);
  const match = useRouteMatch();

  // useEffect(() => {
  //   if (match.path === '/') {
  //     store.changeBH(false);
  //   } else {
  //     store.changeBH(true);
  //   }
  // }, []);
};

export default useJudeHomeButton;
