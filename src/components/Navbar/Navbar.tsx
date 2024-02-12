import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <NavLink 
                        to='/' 
                        className={({isActive, isPending}) => 
                            isPending ? styles.isPending : isActive ? styles.isActive : ""
                        }
                    >
                    Application
                    </NavLink>
                </li>

                <li>
                <NavLink 
                        to='/about' 
                        className={({isActive, isPending}) => 
                            isPending ? styles.isPending : isActive ? styles.isActive : ""
                        }
                    >
                    About
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar