import { useContext, useState } from "react"
import mqtt from 'mqtt'
import { MqttClient } from "mqtt"
import FeedbackMessageContext from "../context/FeedbackMessageContext"
import FeedbackMessage from "../classes/FeedbackMessage"

const useConnectToBroker = () => {
    
    const {changeFeedbackMessage} = useContext(FeedbackMessageContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [client, setClient] = useState<MqttClient|null>(null)

    const connect = async(connectionString:string):Promise<void> => {

        if (connectionString.trim() === '') {
            changeFeedbackMessage(new FeedbackMessage('Connection string empty.', 'bad'))
            console.log('Connection string empty.')
            return;
        }

        if (client !== null) {
            changeFeedbackMessage(new FeedbackMessage('Already connected.', 'bad'))
            console.log('Already connected.')
            return;
        }

        try {
            setLoading(true)
            const mqttClient:MqttClient = mqtt.connect(connectionString)
            mqttClient.stream.on('error', async(err) => {
                if (err.message === 'WebSocket error') { 
                    changeFeedbackMessage(new FeedbackMessage('Connection failed.', 'bad'))
                } else {
                    changeFeedbackMessage(new FeedbackMessage('Something went wrong.', 'bad'))
                }
                await mqttClient.endAsync()
                setClient(null)
                setLoading(false)
            })

            mqttClient.stream.on('connect', () => {
                setClient(mqttClient)
                setLoading(false)
                changeFeedbackMessage(new FeedbackMessage('Connected.', 'good'))
            })  
            
        } catch (error:any) {
            setLoading(false)
            console.log(error)

            if (error.message === 'Missing protocol') {
                changeFeedbackMessage(new FeedbackMessage('Connection string is missing protocol.', 'bad'))
            } else {
                changeFeedbackMessage(new FeedbackMessage('Something went wrong.', 'bad'))
            }
        }
    }

    const disconnect = async(client:MqttClient|null):Promise<void> => {

        if (!client) {
            console.log('Already disconnected.')
            changeFeedbackMessage(new FeedbackMessage('Already disconnected.', 'bad'))
            return;
        }

        try {
            setLoading(true)
            await client.endAsync()
            setClient(null)
            setLoading(false)
            changeFeedbackMessage(new FeedbackMessage('Disconnected.', 'good'))
        } catch (error) {
            setLoading(false)
            console.log(error)
            changeFeedbackMessage(new FeedbackMessage('Something went wrong.', 'bad'))
        }
    }

    return {
        loading, 
        connect,
        disconnect,
        client
    }
}

export default useConnectToBroker;