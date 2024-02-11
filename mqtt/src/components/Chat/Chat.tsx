import { FormEvent, useContext, useEffect, useRef, useState } from 'react'
import usePublishToTopic from '../../hooks/usePublishToTopic'
import styles from './Chat.module.css'
import useReadFromClient from '../../hooks/useReadFromClient'
import ClientMessage from '../../classes/ClientMessage'
import { MqttClient } from 'mqtt'
import FeedbackMessageContext from '../../context/FeedbackMessageContext'

type Props = {
    client:MqttClient,
    subscribedTopics:string[]
}

const Chat = ({client, subscribedTopics}: Props) => {

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


    }, [feedbackMessage])

    const {loading, publish} = usePublishToTopic()
    const {messages} = useReadFromClient(client)

    const [chatMessage, setChatMessage] = useState<string>('')
    const [chosenTopic, setChosenTopic] = useState<string>('')

    const handleSubmit = async(e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()
        await publish(client, chosenTopic, chatMessage)
        setChatMessage('')
    }

    return (

        <div className={styles.chat}>

            {/* MESSAGES FROM TOPICS */}
            <div className={styles.messages} ref={messagesRef}>
                {messages && messages.map((msg:ClientMessage, index) => (
                    <p key={index}>
                        <span>[ {msg.topic} ] : {msg.content}</span>
                    </p>
                ))}
            </div>
            
            {/* FORM TO SUBMIT A MESSAGE */}
            <form onSubmit={handleSubmit}>

                <div className={styles.send_message}>

                    <input 
                        type="text" 
                        name='chatmessage'
                        onChange={(e) => setChatMessage(e.target.value)}
                        value={chatMessage}
                    />

                    {loading && <input type="submit" value='Sending message...' disabled/>}
                    {!loading && <input type="submit" value='Send'/>}

                </div>

                <div className={styles.choose_topic}>
                    {subscribedTopics && subscribedTopics.map((topic) => (
                        <div key={topic}>
                            <input 
                            type="radio" 
                            name='chosenTopic' 
                            value={topic}
                            checked={chosenTopic === topic}
                            onChange={(e)=>setChosenTopic(e.target.value)}/>
                            <label htmlFor={topic}>{topic}</label>
                        </div>
                    ))}
                </div>

            </form>
            
        </div>
    )
}

export default Chat