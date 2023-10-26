import Link from "next/link";
import styles from "./Infoinvester.module.scss"

const Infoin = () => {
    return (
        <main>
       <div className={styles.recvi}>
        <h1>Инвесторам</h1>
            <div className={styles.recvi__wrapper} >
                <h2>Для раскрытия информации на странице в сети Интернет Эмитент использует страницу в сети Интернет, предоставляемую одним из распространителей информации на рынке ценных бумаг:</h2>
              <br/>
             <a href="https://www.e-disclosure.ru/portal/company.aspx?id=37626"> Перейти </a>
              
            </div>
       </div>
        </main>
    )
}
export default Infoin;