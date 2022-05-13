import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DatabaseConnection } from "../database/connection";

/**
 * Wraps a request handler or middleware in a way that should ensure that any errors are propagated correctly to the caller.
 * @param handler the handler to wrap. Must return a promise.
 * @return {Function} the wrapped handler function.
 */
export function wrap(handler: any) {
    return async (req: Request, res: Response) => {
        try {            
            const entityManager = await new DatabaseConnection().getEntityManager();
            const result = await handler(req, res, entityManager);
            const responseBody = JSON.stringify(result);
            res.set({
                "Content-Type": "application/json",
                "Content-Length": responseBody.length
            });
            res.status(StatusCodes.OK);
            return res.send(result);
        } catch (err) {            
            console.error(err);
            return getErrorHandler(res, err);
        }
    };
}

/**
 * Generates an error handler for a response.
 * @param res the response to use to propagate the error.
 * @return {Function} the error handler function.
 */
function getErrorHandler(res: any, err: any) {
    let code = parseInt(err.statusCode || err.code);
    if (typeof code !== "number" || isNaN(code)) {

        code = StatusCodes.INTERNAL_SERVER_ERROR;
        console.error([
            "Unexpected error thrown",
            "Code 500",
            `Message ${err.message}`,
            `Stack ${err.stack}`,
            `Raw ${err}`,
        ].join("\n"));
    }
    res.status(code);
    res.send(err);
}