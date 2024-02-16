import { MqttClient } from "mqtt"

export type MQTTClientContextType = {
    client: MqttClient|null;
    updateClient: (client:MqttClient|null) => void
}