import { MqttClient } from "mqtt"

export interface Message {
    topic: string,
    message: string,
} 

export type MQTTClientContextType = {

    client: MqttClient|null;
    updateClient: (client:MqttClient|null) => void;
    
    topics: string[];
    updateTopics: (topic:string, action:string) => void;

    messages: Message[];
    addSystemMessage: (message:string) => void;
}