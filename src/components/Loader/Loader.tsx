import { useEffect } from "react";
import s from  './Loader.module.scss'

export const Loader = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={s.loaderOverlay}>
      <div className={s.loader}></div>
    </div>
  );
};
