import { FormEvent, useEffect, useState } from 'react'
import styles from './Client.module.css'
import useSubscribeToTopic from '../../hooks/useSubscribeToTopic'
import Chat from '../Chat/Chat'

const Client = ({client}:any) => {

    const {loading, message, subscribe, unsubscribe, subscribedTopics} = useSubscribeToTopic()

    useEffect(() => {
        console.log('subscribedTopics: ', subscribedTopics)
    }, [subscribedTopics])

    const [topic, setTopic] = useState<string>('')

    const handleSubmit = async(e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()
        await subscribe(topic, client)
    }

    const handleSubmitUnsubscribe = async(e:any):Promise<void> => {
        e.preventDefault()
        console.log('Unsubing from: ', e.target.id)
        await unsubscribe(e.target.id, client)
    }

    return (
        <div>
            {client && client.options &&

                <div>

                    <h1> User [ {client.options.clientId} ] connected. </h1>

                    <form onSubmit={handleSubmit} className={styles.form}>

                        <div>
                            <label htmlFor="topic">Topic:</label>

                            <input 
                                type="text"
                                name='topic'
                                onChange={(e) => setTopic(e.target.value)}
                                value={topic}
                            />

                            <input type="submit" value='Subscribe to topic'/>
                        </div>

                    </form>

                    {loading && 
                        <div>
                            <p>Subscribing to topic...</p>
                        </div>
                    }

                    {subscribedTopics.length > 0 && 
                        <div>
                            <div>
                                Subscribed topics:
                                {subscribedTopics && subscribedTopics.map((topic) => (
                                    <div key={topic}>
                                        <form onSubmit={handleSubmitUnsubscribe} id={topic}>
                                            <p>{topic}</p>
                                            <input type="submit" value='unsubscribe'/>
                                        </form>
                                    </div>
                                ))}
                            </div>

                            <Chat client={client} subscribedTopics={subscribedTopics}/>

                        </div>
                    
                    }

                    {message && 
                        <div>
                            <p>{message}</p>
                        </div>
                    }

                </div>
            }

        </div>
    )
}

export default Client