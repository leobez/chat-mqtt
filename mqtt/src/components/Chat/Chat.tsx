import { FormEvent, useEffect, useState } from 'react'
import usePublishToTopic from '../../Hooks/usePublishToTopic'
import styles from './Chat.module.css'

class Message {

    public topic
    public content

    constructor(topic:string, content:string) {
        this.topic = topic
        this.content = content
    }

}

const Chat = (client:any, subscribedTopics:string[]) => {

    const {loading, message, publish} = usePublishToTopic()
    const [messages, setMessages] = useState<Message[]>([])
    const [chatMessage, setChatMessage] = useState<string>('')
    const [chosenTopic, setChosenTopic] = useState<string>('')

    useEffect(() => {
        client.on('message', (topic:string, content:any) => {
            const message = new Message(topic, content.toString())
            console.log('New message: ', message)
            setMessages((prev) => [...prev, message])
        })
    }, [])
        
    const handleSubmit = async(e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()
        console.log('Sending: ', chatMessage, ' to topic: ', chosenTopic)
        await publish(client, chosenTopic, chatMessage)
    }

    return (
        <div>

            <div>
                {/* MESSAGES FROM TOPICS */}
                {messages && messages.map((msg:Message, index) => (
                    <p key={index}>
                        <span>{msg.topic}:/{msg.content}</span>
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
                    {subscribedTopics.map((topic) => (
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

                <input type="submit" value='enviar' />

            </form>
            
            {loading &&
                <div>
                    <p>Sending message...</p>
                </div>
            }

            {message && 
                <div>
                    <p>{message}</p>
                </div>
            }

        </div>
    )
}

export default Chat