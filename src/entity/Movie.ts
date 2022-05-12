import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Movie {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    year: number

    @Column()
    runtime: number

    @Column()
    imdbRating: number

    @Column()
    imdbVotes: number

}
