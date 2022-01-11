import { Ipokemon } from "../types";
import styles from "../styles/Card.module.css";

function Card({ id, name, types, image }: Ipokemon) {
  return (
    <article className={styles.Card}>
      <section className={styles.CardHeader}>
        <p className={styles.CardId}>{id}</p>
        <p className={styles.CardTitle}>{name}</p>
      </section>
      <img
        loading="lazy"
        src={image !== null ? image : ""}
        alt={`${name}`}
        className={styles.CardImage}
      />
      <section className={styles.CardFooter}>
        {types.map((type, i) => (
          <div className={styles.CardType} key={i}>
            {type}
          </div>
        ))}
      </section>
    </article>
  );
}

export default Card;
