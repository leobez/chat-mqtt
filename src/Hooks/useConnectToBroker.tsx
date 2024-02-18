import { useContext, useEffect, useState } from "react"
import mqtt from 'mqtt'
import { MqttClient } from "mqtt"
import ClientContext from "../context/ClientContext"
import { MQTTClientContextType } from "../@types/mqtt"
import FeedbackContext from "../context/FeedbackContext"
import { FeedbackType, ITFeedback } from "../@types/feedback"

const useConnectToBroker = () => {

    // Context
    const {client, updateClient, updateTopics, resetMessages} = useContext(ClientContext) as MQTTClientContextType
    const {updateFeedback} = useContext(FeedbackContext) as FeedbackType

    // Loading states
    const [connectLoading, setConnectLoading] = useState<boolean>(false)
    const [disconnectLoading, setDisconnectLoading] = useState<boolean>(false)
    
    useEffect(() => {
        console.log('client: ', client)
    }, [client])

    const createFeedback = (message:string, status:string, source:string|null=null) => {

        const newFeedback:ITFeedback = {
            message,
            status,
            source
        }

        console.log(message)

        updateFeedback(newFeedback)
    }

    const connect = async(connectionString:string):Promise<void> => {

        if (connectionString.trim() === '') {
            createFeedback('Connection string empty.', 'bad', 'connection')
            return;
        }

        if (client!==null) {
            createFeedback('Already connected.', 'bad', 'connection')
            return;
        }

        try {

            setConnectLoading(true)


            // Create connection
            const mqttClient:MqttClient = mqtt.connect(connectionString, {protocol: 'ssl'})

            // Listener if conection fails
            mqttClient.stream.on('error', async(err) => {

                if (err.message === 'WebSocket error') { 
                    createFeedback('Connection failed.', 'bad', 'connection')
                } else {
                    createFeedback('Something went wrong.', 'bad', 'connection')
                }

                await mqttClient.endAsync()
                updateClient(null)
                setConnectLoading(false)
            })

            // Listener if conection succeeds
            mqttClient.stream.on('connect', () => {
                updateClient(mqttClient)
                setConnectLoading(false)
                createFeedback('Connected.', 'good', 'connection')
            })  
            
        } catch (error:any) {
            setConnectLoading(false)

            console.log(error)

            if (error.message === 'Missing protocol') {
                createFeedback('Connection string is missing protocol.', 'bad', 'connection')
            } else {
                createFeedback('Something went wrong.', 'bad', 'connection')
            }

        }
    }

    const disconnect = async():Promise<void> => {

        if (!client) {
            console.log('Already disconnected.')
            createFeedback('Already disconnected.', 'bad', 'connection')
            return;
        }

        try {
            setDisconnectLoading(true)

            // End connection
            await client.endAsync()
            
            updateClient(null)
            updateTopics('', 'reset')
            resetMessages()
            setDisconnectLoading(false)
            createFeedback('Disconnected.', 'bad', 'connection')

        } catch (error) {
            setDisconnectLoading(false)
            console.log(error)
            createFeedback('Something went wrong.', 'bad', 'connection')
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