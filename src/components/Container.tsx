import styles from "../styles/Container.module.css";
function Container({ children }: { children: JSX.Element[] }) {
  return <div className={styles.Container}>{children}</div>;
}

export default Container;
