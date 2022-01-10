import { Ipokemon } from "../types";
import styles from "../styles/Card.module.css";

function Card({ id, name, types, image }: Ipokemon) {
  return (
    <div className={styles.Card}>
      <div className={styles.CardHeader}>
        <div className={styles.CardId}>{id}</div>
        <div className={styles.CardTitle}>{name}</div>
      </div>
      <img src={image as never} alt={`${name}`} className={styles.CardImage} />
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
