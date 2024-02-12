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

        const message = feedbackMessage.message
        const status = feedbackMessage.status
        if (message === '') return;

        // Full div
        const DIV_feedbackscreen:HTMLElement = feedbackRef.current

        // Div that contains the feedback message
        const DIV_feedback:HTMLElement = document.createElement('div')
        DIV_feedback.classList.add(`${styles['feedback']}`)
        DIV_feedback.classList.add(`${styles[status]}`)

        // Text and h1 components of the div
        const TEXT_content:any = document.createTextNode(`${message}`)
        const H1_message:HTMLElement = document.createElement('h1')
        H1_message.appendChild(TEXT_content)

        DIV_feedback.appendChild(H1_message)
        DIV_feedbackscreen.appendChild(DIV_feedback)

        // Remove class to make element disappear
        setTimeout(() => {
            DIV_feedbackscreen.removeChild(DIV_feedback)
        }, 3000)

    }, [feedbackMessage])
        

    return ( 
        <div className={styles.feedbackscreen} ref={feedbackRef}>

        </div>
    )
}

export default Feedback