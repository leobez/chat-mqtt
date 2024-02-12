import { useContext } from 'react'
import styles from './Feedback.module.css'
import FeedbackMessageContext from '../../context/FeedbackMessageContext'

const Feedback = () => {

    const {feedbackMessage} = useContext(FeedbackMessageContext)

    return ( 
        <>
            {feedbackMessage.status === 'good' &&
                <div className={styles.good}>
                    <h1>{feedbackMessage.message}</h1>
                </div>
            }       
            {feedbackMessage.status === 'bad' &&
                <div className={styles.bad}>
                    <h1>{feedbackMessage.message}</h1>
                </div>
            }  
            {feedbackMessage.status === '' &&
                <div className={styles.neutral}>
                    <h1>{feedbackMessage.message}</h1>
                </div>
            }     
        </>
    )
}

export default Feedback