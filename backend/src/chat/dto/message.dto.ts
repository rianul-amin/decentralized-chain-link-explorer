export class MessageDTO {
    id: string
    sender: string
    time: Date
    last_edit: Date
    message: string
    vote: number
    is_edited: boolean
}