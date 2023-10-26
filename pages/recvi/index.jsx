import styles from "./Recvi.module.scss"

const Recvi = () => {
    return (
        <main>
       <div className={styles.recvi}>
        <h1>Реквизиты и уставные документы</h1>
            <div className={styles.recvi__wrapper} >
                <img src="https://cdn.vseinstrumenti.ru/res/img/services/requisites.png" alt="qweqweqweqweqwe" />
              <div>
              <h2> ООО «ВсеИнструменты.ру»</h2>
              <br/>
                <p>Почтовый адрес: 109451, Россия, Москва, улица Братиславская, дом 16, корпус 1, помещение 3</p>
              <br/>
                <p>ИНН 7722753969</p>
              <br/>
                <p>КПП 997750001</p>
              <br/>
                <p>ОГРН 1117746646269</p>
              </div>
            </div>
       </div>
        </main>
    )
}
export default Recvi;