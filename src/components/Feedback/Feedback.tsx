import { useContext, useEffect, useRef } from 'react'
import styles from './Feedback.module.css'
import { FeedbackContext } from '../../context/FeedbackContext'
import { FeedbackType } from '../../@types/feedback'

const Feedback = () => {

    const {feedback} = useContext(FeedbackContext) as FeedbackType

    const feedbackRef:any = useRef()        

    const add_element = (PARENT:HTMLElement, CHILD:HTMLElement):void => {
        CHILD.classList.add(`${styles['fade-in']}`)
        PARENT.appendChild(CHILD)

        setTimeout(function () {
            remove_element(PARENT, CHILD);
        }, 2500);
    }

    const remove_element = (PARENT:HTMLElement, CHILD:HTMLElement):void => {
        CHILD.classList.add(`${styles['fade-out']}`)

        CHILD.addEventListener("animationend", function () {
            PARENT.removeChild(CHILD)
        }, { once: true });
    }

    useEffect(() => {

        if (!feedback) return;

        const message = feedback.message
        const status = feedback.status
        const source = feedback.source

        if (message === '' || source !== 'connection' ) return;

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

        add_element(DIV_feedbackscreen, DIV_feedback)
        
    }, [feedback])
        
    return ( 
        <div className={styles.feedbackscreen} ref={feedbackRef}>
        </div>
    )
}

export default Feedback