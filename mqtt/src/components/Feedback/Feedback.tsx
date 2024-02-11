import { useContext } from 'react'
import styles from './Feedback.module.css'
import FeedbackMessageContext from '../../context/FeedbackMessageContext'

const Feedback = () => {

    const {feedbackMessage} = useContext(FeedbackMessageContext)

    return (
        <div className={styles.feedback}>

            {feedbackMessage.message.length > 0 && 
                <>
                    {feedbackMessage.status === 'good' ? (
                        <div className={styles.goodfeedback}>
                            <h1>{feedbackMessage.message}</h1>
                        </div>
                    ) : (
                        <div className={styles.badfeedback}>
                            <h1>{feedbackMessage.message}</h1>
                        </div>
                    )}
                </>
                
            }

        </div>
    )
}

export default Feedback