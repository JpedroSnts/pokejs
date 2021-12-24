import React from "react";
import styles from "../styles/Card.module.css";

function Card({ id, title, types, image }) {
  return (
    <div className={styles.Card}>
      <div className={styles.CardHeader}>
        <div className={styles.CardId}>{id}</div>
        <div className={styles.CardTitle}>{title}</div>
      </div>
      <img src={image} alt={`${title}`} className={styles.CardImage} />
      <div className={styles.CardFooter}>
        {types.map((type, i) => (
          <div className={styles.CardType} key={i}>
            {type}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
