import { MqttClient } from "mqtt"

export interface MQTTClient {
    client: MqttClient|null
}

export type MQTTClientContextType = {
    client: MqttClient|null;
    updateClient: (client:MqttClient|null) => void
}