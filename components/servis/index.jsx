import Link from "next/link"
import styles from "./Servis.module.scss"

const Servis = () => {
    return (
        <div className={styles.servis}>
            <div className={styles.servis__text}>
                <h2>Сервисное обслуживание</h2>
                <p>Гарантия производителя 12 месяцев</p>
            </div>
            <div className={styles.servis__box}>

                <div className={styles.servis__box__block}>
                    <p>365 дней обмен и возврат</p>
                    <span>Вы можете вернуть товар, который не был использован</span>
                   <div> <Link href="/"> Подробнее</Link></div>

                </div>
                <div className={styles.servis__box__block}>
                    <p>Ремонт за 20 дней</p>
                    <span>Устраним любую неисправность по гарантии в нашем сервисе</span>
                   <div> <Link href="/"> Подробнее</Link></div>

                </div>
                <div className={styles.servis__box__block}>
                    <p>Сервисы по всей России</p>
                    <span>Обращайтесь за обслуживанием в авторизованные сервисы производителя</span>
                   <div> <Link href="/"> Подробнее</Link></div>

                </div>
            </div>
        </div>
    )
}
export default Servis