const HTTP = require("http-status-codes");

/**
 * Wraps a request handler or middleware in a way that should ensure that any errors are propagated correctly to the caller.
 * @param handler the handler to wrap. Must return a promise.
 * @return {Function} the wrapped handler function.
 */
function wrap(handler) {
    return async (req, res) => {
        try {
            const result = await handler(req, res);
            const responseBody = JSON.stringify(result);
            res.set({
                "Content-Type": "application/json",
                "Content-Length": responseBody.length
            });
            res.status(HTTP.StatusCodes.OK);
            return res.send(result);
        } catch (err) {
            return getErrorHandler(res, err);
        }
    };
}

/**
 * Generates an error handler for a response.
 * @param res the response to use to propagate the error.
 * @return {Function} the error handler function.
 */
function getErrorHandler(res, err) {
    let code = parseInt(err.statusCode || err.code);
    if (typeof code !== "number" || isNaN(code)) {

        code = HTTP.StatusCodes.INTERNAL_SERVER_ERROR;
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

module.exports = {
    wrap
};

