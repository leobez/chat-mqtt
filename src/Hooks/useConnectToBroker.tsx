import { useContext, useEffect, useState } from "react"
import mqtt from 'mqtt'
import { MqttClient } from "mqtt"
import FeedbackMessageContext from "../context/FeedbackMessageContext"
import FeedbackMessage from "../classes/FeedbackMessage"
import ClientContext from "../context/ClientContext"
import { MQTTClientContextType } from "../@types/mqtt"

const useConnectToBroker = () => {
    
    // Feedback message -> change later
    const {changeFeedbackMessage} = useContext(FeedbackMessageContext)

    // Loading states
    const [connectLoading, setConnectLoading] = useState<boolean>(false)
    const [disconnectLoading, setDisconnectLoading] = useState<boolean>(false)

    // Client context
    const {client, updateClient} = useContext(ClientContext) as MQTTClientContextType
    
    useEffect(() => {
        console.log('client: ', client)
    }, [client])

    const connect = async(connectionString:string):Promise<void> => {

        if (connectionString.trim() === '') {
            changeFeedbackMessage(new FeedbackMessage('Connection string empty.', 'bad', 'connection'))
            console.log('Connection string empty.')
            return;
        }

        if (client!==null) {
            changeFeedbackMessage(new FeedbackMessage('Already connected.', 'bad', 'connection'))
            console.log('Already connected.')
            return;
        }

        try {

            setConnectLoading(true)
            
            // Create connection
            const mqttClient:MqttClient = mqtt.connect(connectionString)

            // Listener if conection fails
            mqttClient.stream.on('error', async(err) => {

                if (err.message === 'WebSocket error') { 
                    changeFeedbackMessage(new FeedbackMessage('Connection failed.', 'bad', 'connection'))
                } else {
                    changeFeedbackMessage(new FeedbackMessage('Something went wrong.', 'bad', 'connection'))
                }

                await mqttClient.endAsync()
                updateClient(null)
                setConnectLoading(false)
            })

            // Listener if conection succeeds
            mqttClient.stream.on('connect', () => {
                updateClient(mqttClient)
                setConnectLoading(false)
                changeFeedbackMessage(new FeedbackMessage('Connected.', 'good', 'connection'))
            })  
            
        } catch (error:any) {
            setConnectLoading(false)

            console.log(error)

            if (error.message === 'Missing protocol') {
                changeFeedbackMessage(new FeedbackMessage('Connection string is missing protocol.', 'bad', 'connection'))
            } else {
                changeFeedbackMessage(new FeedbackMessage('Something went wrong.', 'bad', 'connection'))
            }

        }
    }

    const disconnect = async():Promise<void> => {

        if (!client) {
            console.log('Already disconnected.')
            changeFeedbackMessage(new FeedbackMessage('Already disconnected.', 'bad', 'connection'))
            return;
        }

        try {
            setDisconnectLoading(true)

            // End connection
            await client.endAsync()

            updateClient(null)

            setDisconnectLoading(false)

            changeFeedbackMessage(new FeedbackMessage('Disconnected.', 'bad', 'connection'))

        } catch (error) {
            setDisconnectLoading(false)

            console.log(error)

            changeFeedbackMessage(new FeedbackMessage('Something went wrong.', 'bad', 'connection'))
        }
    }

    return { 
        connect,
        connectLoading,
        disconnect,
        disconnectLoading,
    }
}

export default useConnectToBroker;