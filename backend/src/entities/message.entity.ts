import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('messages')
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    sender: string

    @Column({default: () => "CURRENT_TIMESTAMP"})
    time: Date

    @Column({default: () => "CURRENT_TIMESTAMP"})
    last_edit: Date
    
    @Column()
    message: string
    
    @Column({default:  0})
    vote: number
    
    @Column({default: false})
    is_edited: boolean
}