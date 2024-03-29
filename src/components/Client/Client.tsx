import { FormEvent, useContext, useState } from 'react'
import styles from './Client.module.css'
import useSubscribeToTopic from '../../hooks/useSubscribeToTopic'
import Chat from '../Chat/Chat'
import ClientContext from '../../context/ClientContext'
import { MQTTClientContextType } from '../../@types/mqtt'

const Client = () => {

    // Client context
    const {client, topics, updateMessage} = useContext(ClientContext) as MQTTClientContextType

    // Sub hook
    const {subscribe, subLoading, unsubscribe, unsubLoading} = useSubscribeToTopic()

    // Component states
    const [topic, setTopic] = useState<string>('')
    const [chosenTopic, setChosenTopic] = useState<string>('')

    const handleSubscribe = async(e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()
        await subscribe(topic)
    }

    const handleUnsubscribe = async(e:any):Promise<void> => {
        e.preventDefault()
        const selectedTopic = e.target.id

        if (chosenTopic === selectedTopic) {
            setChosenTopic('')
        }

        await unsubscribe(selectedTopic)
    }

    const handleSelect = (e:any):void => {
        e.preventDefault()
        
        const selectedTopic = e.target.id
    
        // Verify if there are no other topics selected
        if (chosenTopic === '') {
            setChosenTopic(selectedTopic)
            e.target.classList.add(`${styles['selected']}`)
            updateMessage(`Current topic: '${selectedTopic}' .`, 'addSystem')
        } else {
            // Verify if clicked the same
            if (chosenTopic === selectedTopic) {
                e.target.classList.remove(`${styles['selected']}`)
                setChosenTopic('')
                updateMessage(`Current topic: <none>`, 'addSystem')
            } else {
                // Is clicking other, therefore, unselect previous one and select current one
                const DIV_previous = document.querySelector(`form#${chosenTopic}`)
                DIV_previous?.classList.remove(`${styles['selected']}`)
                e.target.classList.add(`${styles['selected']}`)
                setChosenTopic(selectedTopic)
                updateMessage(`Current topic: '${selectedTopic}' .`, 'addSystem')
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

                                {subLoading && <input type="submit" value='Subscribing to topic...' disabled/>}
                                {unsubLoading && <input type="submit" value='Unsubscribing from topic...' disabled/>}
                                {!subLoading && !unsubLoading && <input type="submit" value='Subscribe to topic'/>}

                            </form>

                        </div>

                        <div className={styles.verticalseparator_flex}></div>

                        <div className={styles.subscribedtopicscontainer}>

                            {topics.length > 0 && 
                                <>
                                    <div className={styles.subscribed_topics}>
                                        <h2>Subscribed topics:</h2>
                                        {topics && topics.map((topic) => (
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
                                {subLoading && <div><p>Subscribing to topic...</p></div>}
                                {unsubLoading && <div><p>Unsubscribing from topic...</p></div>}
                            </div>

                        </div>

                    </div>

                    <div className={styles.chatcontainer}>
                        <Chat chosenTopic={chosenTopic}/>
                    </div>
                </>
            }
            
        </div>
    )
}

export default Client