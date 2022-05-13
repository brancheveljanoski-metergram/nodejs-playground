import express, { Request, Response } from "express";
import { EntityManager } from "typeorm";
import { wrap } from "../lib/error-handler";
import { MovieManager } from "../models/movie-manager";

const router = express.Router()

router.get('/', wrap((_req: Request, _res: Response, tx: EntityManager) => {
    return new MovieManager(tx).getMovies();
}))

router.get('/:imbdID', wrap((req: Request, _res: Response, tx: EntityManager) => {

    return new MovieManager(tx).getSpecificMovieById(req.params.imbdID);
}))

router.get('/data', wrap((_req: Request, _res: Response, tx: EntityManager) => {

    return new MovieManager(tx).getMoviesData();
    
}))

router.post('/', wrap((req: Request, _res: Response, tx: EntityManager) => {

    return new MovieManager(tx).addNewMovie(req.body)

}))

router.put('/', wrap((req: Request, _res: Response, tx: EntityManager) => {

    new MovieManager(tx).editExistingMovie(req.body)

}))

router.delete('/delete/:imbdID', wrap((req: Request, _res: Response, tx: EntityManager) => {

    return new MovieManager(tx).deleteMovie(req.params.imbdID)

}))

export default router;