import { useContext, useEffect } from 'react'
import styles from './Feedback.module.css'
import MessageContext from '../../context/MessageContext'

const Feedback = () => {

    const {message} = useContext(MessageContext)

    return (
        <div>

            {message.length > 0 && 
                <div className='feedbackMessage'>
                    <h2>{message}</h2>
                </div>
            }

        </div>
    )
}

export default Feedback