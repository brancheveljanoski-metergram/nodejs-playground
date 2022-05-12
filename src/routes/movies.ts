import express, { Request, Response } from "express";
import { EntityManager } from "typeorm";
const { wrap } = require("../lib/error-handler");
import { MovieManager } from "../models/movie-manager";

const router = express.Router()

router.get('/', wrap((_req: Request, _res: Response, tx: EntityManager) => {

    return new MovieManager(tx).getMovies();

}))

router.get('/:imbdID', wrap((_req: Request, _res: Response, tx: EntityManager) => {

        return new MovieManager(tx).getSpecificMovieById;
}))

router.get('/data', wrap((_req: Request, _res: Response, tx: EntityManager) => {

    return new MovieManager(tx).getMoviesData();
}))

router.post('/', wrap((req: Request, _res: Response, tx: EntityManager) => {


        return new MovieManager(tx).addNewMovie(req.body)
    

}))

router.put('/', wrap((_req: Request, _res: Response, tx: EntityManager) => {
    
    new MovieManager(tx).editExistingMovie(_req.body)
    
}))

router.delete('/:imbdID', wrap((_req: Request, _res: Response, tx: EntityManager) => {
    new MovieManager(tx).deleteMovie(_req.params.imbdID)

    return {success: true}
}))

module.exports = router 