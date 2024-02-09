import { useContext, useEffect } from 'react'
import styles from './Feedback.module.css'
import MessageContext from '../../context/MessageContext'

const Feedback = () => {

    const {message} = useContext(MessageContext)

    return (
        <div className={styles.feedback}>

            {message.length > 0 && 
                <div className='feedbackMessage'>
                    <h1>{message}</h1>
                </div>
            }

        </div>
    )
}

export default Feedback