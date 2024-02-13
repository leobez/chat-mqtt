export default class FeedbackMessage {
    public message
    public status 
    public source

    constructor(message: string, status:string, source:string = '') {
        this.message = message
        this.status = status
        this.source = source
    }
}