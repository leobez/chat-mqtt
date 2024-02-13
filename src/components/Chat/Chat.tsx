import { FormEvent, useContext, useEffect, useRef, useState } from 'react'
import usePublishToTopic from '../../hooks/usePublishToTopic'
import styles from './Chat.module.css'
import useReadFromClient from '../../hooks/useReadFromClient'
import ClientMessage from '../../classes/ClientMessage'
import { MqttClient } from 'mqtt'
import FeedbackMessageContext from '../../context/FeedbackMessageContext'

type Props = {
    client:MqttClient,
    chosenTopic:string
}

const Chat = ({client, chosenTopic}: Props) => {

    const {feedbackMessage} = useContext(FeedbackMessageContext)
    const messagesRef:any = useRef()

    useEffect(() => {
        if (feedbackMessage.message.length <= 0) return;
        if (!messagesRef.current) return;
        if (feedbackMessage.message === 'Message published.') return;
        const P_feedbackMessage = document.createElement('p')
        const P_content = document.createTextNode(`${feedbackMessage.message}`)
        feedbackMessage.status === 'good' ? P_feedbackMessage.style.color = 'green' : P_feedbackMessage.style.color = 'red'
        P_feedbackMessage.style.fontWeight = 'bold'
        P_feedbackMessage.appendChild(P_content)
        messagesRef.current.appendChild(P_feedbackMessage)
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [feedbackMessage])

    useEffect(() => {
        console.log('chosen topic: ', chosenTopic)
        const P_feedbackMessage = document.createElement('p')
        const P_content = document.createTextNode(`Current topic: ${chosenTopic.length > 0 ? chosenTopic : '<none   >'}`)
        chosenTopic.length > 0 ? P_feedbackMessage.style.color = 'green' : P_feedbackMessage.style.color = 'red'
        P_feedbackMessage.style.fontWeight = 'bold'
        P_feedbackMessage.appendChild(P_content)
        messagesRef.current.appendChild(P_feedbackMessage)
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [chosenTopic])

    const {loading, publish} = usePublishToTopic()
    const {messages} = useReadFromClient(client)

    // Scroll message into view
    useEffect(() => {
        console.log(messages)
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }, [messages]);

    const [chatMessage, setChatMessage] = useState<string>('')

    const handleSubmit = async(e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()
        await publish(client, chosenTopic, chatMessage)
        setChatMessage('')
    }

    return (

        <div className={styles.chat}>

            {/* MESSAGES FROM TOPICS */}
            <div className={`${styles['messages']} ${styles['scrollable_container']}`} ref={messagesRef}>
                {messages && messages.map((msg:ClientMessage, index:number) => (
                    <p key={index}>
                        <span>[ {msg.topic} ]: </span> {msg.content}
                    </p>
                ))}
            </div>
            
            {/* FORM TO SUBMIT A MESSAGE */}
            <form onSubmit={handleSubmit} className={styles.sendmessage}>

                <div className={styles.send_message}>

                    <input 
                        type="text" 
                        name='chatmessage'
                        onChange={(e) => setChatMessage(e.target.value)}
                        value={chatMessage}
                    />

                    {loading && <input type="submit" value='Sending...' disabled/>}
                    {!loading && <input type="submit" value='Send'/>}

                </div>

            </form>
            
        </div>
    )
}

export default Chat