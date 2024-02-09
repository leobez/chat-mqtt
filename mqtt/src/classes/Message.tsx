export default class Message {
    public topic
    public content

    constructor(topic:string, content:string) {
        this.topic = topic
        this.content = content
    }
}