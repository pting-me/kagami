import styles from "./CaretIcon.module.css";

export function CaretIcon() {
  return (
    <svg
      className={styles.icon}
      width="6"
      height="6"
      viewBox="0 0 6 6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 3L1 0v6l4-3z" fill-rule="nonzero" stroke="none"></path>
    </svg>
  );
}
