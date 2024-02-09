import { FormEvent, useEffect, useState } from 'react'
import styles from './Client.module.css'
import useSubscribeToTopic from '../../hooks/useSubscribeToTopic'
import Chat from '../Chat/Chat'

const Client = ({client}:any) => {

    const {loading, message, subscribe, subscribedTopics} = useSubscribeToTopic()

    useEffect(() => {
        console.log('subscribedTopics: ', subscribedTopics)
    }, [subscribedTopics])

    const [topic, setTopic] = useState<string>('')

    const handleSubmit = async(e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()
        await subscribe(topic, client)
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
                                        <p>{topic}</p>
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