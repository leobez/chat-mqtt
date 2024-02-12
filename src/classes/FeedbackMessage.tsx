export default class FeedbackMessage {
    public message
    public status 

    constructor(message: string, status:string) {
        this.message = message
        this.status = status
    }
}