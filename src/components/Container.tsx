import styles from "../styles/Container.module.css";
function Container({ children }: { children: JSX.Element[] }) {
  return <section className={styles.Container}>{children}</section>;
}

export default Container;
