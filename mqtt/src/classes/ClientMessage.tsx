export default class ClientMessage {
    
    public topic
    public content

    constructor(topic:string, content:string) {
        this.topic = topic
        this.content = content
    }
}