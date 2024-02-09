import { FormEvent, useEffect, useState } from 'react'
import usePublishToTopic from '../../hooks/usePublishToTopic'
import styles from './Chat.module.css'
import useReadFromClient from '../../hooks/useReadFromClient'
import Message from '../../classes/Message'

type Props = {
    client:any,
    subscribedTopics:string[]
}

const Chat = ({client, subscribedTopics}: Props) => {

    const {loading, message, publish} = usePublishToTopic()
    const {messages} = useReadFromClient(client)

    const [chatMessage, setChatMessage] = useState<string>('')
    const [chosenTopic, setChosenTopic] = useState<string>('')

    const handleSubmit = async(e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()
        await publish(client, chosenTopic, chatMessage)
    }

    return (
        <div>

            <div>
                {/* MESSAGES FROM TOPICS */}
                {messages && messages.map((msg:Message, index) => (
                    <p key={index}>
                        <span>[ {msg.topic} ] : {msg.content}</span>
                    </p>
                ))}
            </div>
                    
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="chatmessage">Mensagem:</label>
                    <input 
                        type="text" 
                        name='chatmessage'
                        onChange={(e) => setChatMessage(e.target.value)}
                        value={chatMessage}
                    />
                </div>
                
                <div>
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
                
                {loading && <input type="submit" value='sending message...' disabled/>}
                {!loading && <input type="submit" value='send message'/>}

            </form>

            {message && <div className='feedbackMessages'><h2>{message}</h2></div>}

        </div>
    )
}

export default Chat