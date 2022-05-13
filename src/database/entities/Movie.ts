import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Movie {

    @PrimaryColumn()
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
