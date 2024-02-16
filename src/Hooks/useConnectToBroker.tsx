import { useContext, useEffect, useState } from "react"
import mqtt from 'mqtt'
import { MqttClient } from "mqtt"
import FeedbackMessageContext from "../context/FeedbackMessageContext"
import FeedbackMessage from "../classes/FeedbackMessage"
import ClientContext from "../context/ClientContext"
import { MQTTClientContextType } from "../@types/mqtt"

const useConnectToBroker = () => {
    
    const {changeFeedbackMessage} = useContext(FeedbackMessageContext)
    const [loading, setLoading] = useState<boolean>(false)

    /* UPDATE CLIENT CONTEXT */
    const {client, updateClient} = useContext(ClientContext) as MQTTClientContextType

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

            setLoading(true)

            const mqttClient:MqttClient = mqtt.connect(connectionString)

            mqttClient.stream.on('error', async(err) => {

                if (err.message === 'WebSocket error') { 
                    changeFeedbackMessage(new FeedbackMessage('Connection failed.', 'bad', 'connection'))
                } else {
                    changeFeedbackMessage(new FeedbackMessage('Something went wrong.', 'bad', 'connection'))
                }

                await mqttClient.endAsync()
                updateClient(null)
                setLoading(false)
            })

            // If connection succeeds
            mqttClient.stream.on('connect', () => {
                updateClient(mqttClient)
                setLoading(false)
                changeFeedbackMessage(new FeedbackMessage('Connected.', 'good', 'connection'))
            })  
            
        } catch (error:any) {
            setLoading(false)
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
            setLoading(true)
            await client.endAsync()
            updateClient(null)
            setLoading(false)
            changeFeedbackMessage(new FeedbackMessage('Disconnected.', 'bad', 'connection'))
        } catch (error) {
            setLoading(false)
            console.log(error)
            changeFeedbackMessage(new FeedbackMessage('Something went wrong.', 'bad', 'connection'))
        }
    }

    return {
        loading, 
        connect,
        disconnect,
    }
}

export default useConnectToBroker;