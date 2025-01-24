import axios from "axios";
import styles from "./Person.module.css";

interface Asset {
  ticker: string;
  numberOfShares: number;
  exerciseOptionPrice: number;
}

async function getBillion(id: string) {
  const response = await axios.get(
    `https://billions-api.nomadcoders.workers.dev/person/${id}`
  );

  return response.data;
}

export default async function Person({ params }: { params: { id: string } }) {
  const billion = await getBillion(params.id);

  return (
    <main className={styles.main}>
      <div className={styles.info}>
        {billion.squareImage === "https:undefined" ? (
          <div className={styles.alterImg}></div>
        ) : (
          <img
            src={billion.squareImage}
            alt="Profile Image"
            className={styles.img}
          />
        )}
        <div className={styles.texts}>
          <p className={styles.name}>{billion.name}</p>
          <p>NetWorth: {billion.netWorth}</p>
          <p>Country: {billion.country}</p>
          <p>
            Industry:{" "}
            {billion.industries.map((industry: string) => (
              <span key={industry}>industry</span>
            ))}
          </p>
        </div>
      </div>
      <p className={styles.bio}>{billion.bio.map((text: string) => text)}</p>
      <ul className={styles.ul}>
        {billion.financialAssets
          ? billion.financialAssets.map((asset: Asset, index: number) => (
              <li key={index}>
                {asset.ticker ? <p>Tickers: {asset.ticker}</p> : null}
                {asset.numberOfShares ? (
                  <p>Shares: {asset.numberOfShares}</p>
                ) : null}
                {asset.exerciseOptionPrice ? (
                  <p>Exercise Price: ${asset.exerciseOptionPrice}</p>
                ) : null}
              </li>
            ))
          : null}
      </ul>
    </main>
  );
}
