import { FormEvent, useEffect, useState } from 'react'
import styles from './Client.module.css'
import useSubscribeToTopic from '../../hooks/useSubscribeToTopic'
import Chat from '../Chat/Chat'

const Client = ({client}:any) => {

    const {loading, subscribe, unsubscribe, subscribedTopics} = useSubscribeToTopic()

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

        <div className={styles.client}>

            {client && client.options &&

                <>

                    <h1> User [ {client.options.clientId} ] connected. </h1>

                    <form onSubmit={handleSubmit} className={styles.form}>

                        <h2>Enter the topics you want to subscribe: </h2>

                        <div>
                            <label htmlFor="topic">Topic:</label>
                            <input 
                                type="text"
                                name='topic'
                                onChange={(e) => setTopic(e.target.value)}
                                value={topic}
                            />
                        </div>

                        <input type="submit" value='Subscribe to topic'/>

                    </form>

                    {loading && <div><p>Subscribing to topic...</p></div>}

                    {subscribedTopics.length > 0 && 
                        <>
                            <div className={styles.subscribed_topics}>
                                <h2>Subscribed topics:</h2>
                                {subscribedTopics && subscribedTopics.map((topic) => (
                                    <div key={topic} className={styles.topics}>
                                        <form onSubmit={handleSubmitUnsubscribe} id={topic}>
                                            <div>
                                                <p>{topic}</p>
                                                <input type="submit" value='unsubscribe'/>
                                            </div>                     
                                        </form>
                                    </div>
                                ))}
                            </div>

                            <Chat client={client} subscribedTopics={subscribedTopics}/>

                        </>
                    }
                    

                </>
            }

        </div>
    )
}

export default Client