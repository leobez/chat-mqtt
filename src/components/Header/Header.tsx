import styles from './Header.module.css'

const Header = () => {
    return (
        <div className={styles.header}>

            <h1>
                <a href="/">CHAT MQTT</a>
            </h1>
            
        </div>
    )
}

export default Header