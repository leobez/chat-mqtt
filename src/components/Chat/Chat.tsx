import { FormEvent, useContext, useEffect, useRef, useState } from 'react'
import usePublishToTopic from '../../hooks/usePublishToTopic'
import styles from './Chat.module.css'
import ClientContext from '../../context/ClientContext'
import { MQTTClientContextType, Message } from '../../@types/mqtt'

type Props = {
    chosenTopic:string
}

const Chat = ({chosenTopic}: Props) => {

    // Context
    const {messages} = useContext(ClientContext) as MQTTClientContextType

    // Component stuff
    const messagesRef:any = useRef()

    const {loading, publish} = usePublishToTopic()

    // Scroll message into view
    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }, [messages]);

    const [chatMessage, setChatMessage] = useState<string>('')

    const handleSubmit = async(e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()
        await publish(chosenTopic, chatMessage)
        setChatMessage('')
    }

    return (

        <div className={styles.chat}>

            {/* MESSAGES FROM TOPICS */}
            <div className={`${styles['messages']} ${styles['scrollable_container']}`} ref={messagesRef}>
                {messages && messages.map((msg:Message, index:number) => (
                    <p key={index}>
                        {msg.topic === '' ? (
                            <>
                                <span className={styles.system}> {msg.message} </span>
                            </>
                        ) : (
                            <>
                                <span>[ {msg.topic} ]: </span> {msg.message}
                            </>
                        )}
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