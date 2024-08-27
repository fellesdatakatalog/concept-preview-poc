import React, { FC, PropsWithChildren } from "react";
import styles from "./layout.module.css";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    return <main className={styles.main}>{children}</main>;
};

export default Layout;
