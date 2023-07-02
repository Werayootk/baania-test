import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class House {
   /**
    * id
    * name
    * desc
    * price
    * post_code
    */
   @PrimaryGeneratedColumn()
   id: number
    
   @Column()
   name: string
    
   @Column()
   desc: string
    
   @Column()
   price: string
    
   @Column()
   post_code: string

}