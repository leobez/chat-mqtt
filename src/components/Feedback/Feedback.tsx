import { useContext, useEffect, useRef } from 'react'
import styles from './Feedback.module.css'
import FeedbackMessageContext from '../../context/FeedbackMessageContext'

const Feedback = () => {

    /* SAMPLE SCROLLBAR
    
    {feedbackMessage.status === 'good' &&
                <div className={`${styles['scrollable-container']} ${styles['good']}`}>
                    <h1>{feedbackMessage.message}</h1>
                </div>
            }     
    */

    const {feedbackMessage} = useContext(FeedbackMessageContext)
    const feedbackRef:any = useRef()        

    useEffect(() => {

        if (feedbackMessage.message === '') return;

        const DIV_feedback:HTMLElement = feedbackRef.current
        const TEXT_content:any = document.createTextNode(`${feedbackMessage.message}`)
        const H1_message:HTMLElement = document.createElement('h1')
        H1_message.appendChild(TEXT_content)

        const status = feedbackMessage.status
        DIV_feedback.appendChild(H1_message)
        DIV_feedback.classList.add(`${styles[status]}`)

        // Remove class to make element disappear
        setTimeout(() => {
            feedbackRef.current.classList.remove(`${styles[status]}`)
            DIV_feedback.removeChild(H1_message)
        }, 2000)

    }, [feedbackMessage])
        

    return ( 
        <>
            <div className={styles.feedback} ref={feedbackRef}>
            </div>  
        </>
    )
}

export default Feedback