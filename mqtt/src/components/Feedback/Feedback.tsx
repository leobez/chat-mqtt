import { useContext } from 'react'
import styles from './Feedback.module.css'
import MessageContext from '../../context/MessageContext'

const Feedback = () => {

    const {messageAndStatus} = useContext(MessageContext)

    return (
        <div className={styles.feedback}>

            {messageAndStatus.message.length > 0 && 
                <>
                    {messageAndStatus.status === 'good' ? (
                        <div className={styles.goodfeedback}>
                            <h1>{messageAndStatus.message}</h1>
                        </div>
                    ) : (
                        <div className={styles.badfeedback}>
                            <h1>{messageAndStatus.message}</h1>
                        </div>
                    )}
                </>
                
            }

        </div>
    )
}

export default Feedback