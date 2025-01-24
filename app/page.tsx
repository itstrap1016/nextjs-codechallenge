import axios from "axios";
import Link from "next/link";
import styles from "./Home.module.css";

interface Billion {
  id: string;
  squareImage: string;
  name: string;
  netWorth: number;
  industries: string[];
}

async function getBillions() {
  const response = await axios.get(
    "https://billions-api.nomadcoders.workers.dev/"
  );
  return response.data;
}

export default async function Home() {
  const billions = await getBillions();

  return (
    <main className={styles.main}>
      <ul className={styles.ul}>
        {billions.map((billion: Billion) => (
          <li key={billion.id} className={styles.li}>
            <Link href={`/person/${billion.id}`} className={styles.link}>
              <div>
                {billion.squareImage === "https:undefined" ? (
                  <div className={styles.alterImg}></div>
                ) : (
                  <img
                    src={billion.squareImage}
                    alt="Profile Image"
                    className={styles.img}
                  />
                )}
                <p className={styles.name}>{billion.name}</p>
                <div className={styles.info}>
                  <p>{Math.floor(billion.netWorth / 1000)} billion</p>
                  <p className={styles.slash}>/</p>
                  <ul>
                    {billion.industries.map((industry: string) => (
                      <li> {industry}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
