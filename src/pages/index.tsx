import styles from "./index.less";
import { useEffect, FC, useContext } from "react";
import { history } from "umi";
import useJudeHomeButton from "../hooks/judeHomeButtom";

const IndexPage: FC<{}> = () => {
  useEffect(() => {
    document.getElementsByTagName("img")[0].onmousedown = function (e) {
      e.preventDefault();
    };
  }, []);

  useJudeHomeButton();

  const leavePageEvent = (url: string) => {
    history.push(url);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.itemContainer}
        onClick={() => {
          leavePageEvent("/tilePage/osgbPage");
        }}
      >
        <img className={styles.tileCat} src={require("imgs/444.png")} />
        <div className={styles.describeText}>转换成3D-tiles</div>
      </div>
      <div
        className={styles.itemContainer}
        onClick={() => {
          leavePageEvent("/gltfPage/");
        }}
      >
        <img className={styles.terrainCat} src={require("imgs/666.png")} />
        <div className={styles.describeText}>转换成gltf/glb</div>
      </div>
      <div
        className={styles.itemContainer}
        onClick={() => {
          leavePageEvent("/terrainPage/demPage");
        }}
      >
        <img className={styles.gltfCat} src={require("imgs/555.png")} />
        <div className={styles.describeText}>dem生成地形</div>
      </div>
    </div>
  );
};

export default IndexPage;
