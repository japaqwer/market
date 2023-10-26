import styles from './Cer.module.scss'

const Cer = () => {
    return (
        <main>
            <div className={styles.cer}>
                <div className={styles.cer__text}>
                    <h2>Наши сертификаты</h2>
                    <br />
                    <p>Компания «ВсеИнструменты.ру» предлагает только качественный инструмент и оборудование от ведущих мировых производителей.</p>
                    <br />
                    <p>Мы являемся официальным дилером десятков компаний, представляющих бренды: Bosch, Metabo, Makita, Husqvarna, Hitachi, Mitsubishi Electric, Electrolux, Samsung, Panasonic, Jet, Fubag, Ресанта, Энкор, Интерскол, Калибр и другие.</p>
                </div>
                
                <div className={styles.cer__image}>
                    <img src="/skidki.png" alt="" />
                    <img src="/skidki.png" alt="" />
                    <img src="/skidki.png" alt="" />
                    <img src="/skidki.png" alt="" />
                    
                </div>
            </div>
        </main>
    )
}
export default Cer;