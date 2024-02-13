import { FormEvent, useState } from 'react'
import styles from './Client.module.css'
import useSubscribeToTopic from '../../hooks/useSubscribeToTopic'
import Chat from '../Chat/Chat'
import { MqttClient } from 'mqtt'

type Prop = {
    client:MqttClient
}

const Client = ({client}:Prop) => {

    const {loading, subscribe, unsubscribe, subscribedTopics, unsubLoading} = useSubscribeToTopic()

    const [topic, setTopic] = useState<string>('')
    const [chosenTopic, setChosenTopic] = useState<string>('')

    const handleSubscribe = async(e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()
        await subscribe(topic, client)
    }

    const handleUnsubscribe = async(e:any):Promise<void> => {
        e.preventDefault()
        const selectedTopic = e.target.id
        console.log('Unsubing from: ', selectedTopic)

        if (chosenTopic === selectedTopic) {
            setChosenTopic('')
        }

        await unsubscribe(selectedTopic, client)
    }

    const handleSelect = (e:any):void => {
        e.preventDefault()
        
        const selectedTopic = e.target.id
    
        // Verify if there are no other topics selected
        if (chosenTopic === '') {
            setChosenTopic(selectedTopic)
            e.target.classList.add(`${styles['selected']}`)
        } else {
            // Verify if clicked the same
            if (chosenTopic === selectedTopic) {
                e.target.classList.remove(`${styles['selected']}`)
                setChosenTopic('')
            } else {
                // Is clicking other, therefore, unselected previous one and selected current one
                const DIV_previous = document.querySelector(`form#${chosenTopic}`)
                DIV_previous?.classList.remove(`${styles['selected']}`)

                e.target.classList.add(`${styles['selected']}`)
                setChosenTopic(selectedTopic)
            }
        }

    }

    return (

        <div className={styles.client}>

            {client && client.options &&
                <>
                    <div className={styles.topicscontainer}>

                        <div className={styles.topicsform}>
                            <h2>Current user: {client.options.clientId}</h2>

                            <h2>Current server: {client.options.host}</h2>

                            <form onSubmit={handleSubscribe} className={styles.form}>

                                <p>Enter the topic you want to subscribe: </p>

                                <div>
                                    <label htmlFor="topic"></label>
                                    <input 
                                        type="text"
                                        name='topic'
                                        onChange={(e) => setTopic(e.target.value)}
                                        value={topic}
                                    />
                                </div>

                                {loading        && <input type="submit" value='Subscribing to topic...' disabled/>}
                                {unsubLoading   && <input type="submit" value='Unsubscribing from topic...' disabled/>}
                                {!loading && !unsubLoading && <input type="submit" value='Subscribe to topic'/>}

                            </form>

                        </div>

                        <div className={styles.verticalseparator_flex}></div>

                        <div className={styles.subscribedtopicscontainer}>

                            {subscribedTopics.length > 0 && 
                                <>
                                    <div className={styles.subscribed_topics}>
                                        <h2>Subscribed topics:</h2>
                                        {subscribedTopics && subscribedTopics.map((topic) => (
                                            <div key={topic} className={styles.topics}>

                                                <p className={styles.scrollable_container}>{topic}</p>

                                                <form onSubmit={handleSelect} id={topic}>                                              
                                                    <input type="submit" value='use'/>                 
                                                </form>
                                                <form onSubmit={handleUnsubscribe} id={topic}>
                                                    <input type="submit" value='unsub'/>       
                                                </form>

                                            </div>
                                        ))}
                                    </div>
                                </>
                            }

                            <div className={styles.loadingcontainer}>
                                {loading && <div><p>Subscribing to topic...</p></div>}
                                {unsubLoading && <div><p>Unsubscribing from topic...</p></div>}
                            </div>

                        </div>

                    </div>

                    <div className={styles.chatcontainer}>
                        <Chat client={client} chosenTopic={chosenTopic}/>
                    </div>
                </>
            }

        </div>
    )
}

export default Client