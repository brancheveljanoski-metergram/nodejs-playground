
function wrap(handler) {
    return async (req, res) => {
        try {
            const result = await handler(req, res);
            const responseBody = JSON.stringify(result);
            res.set({
                "Content-Type": "application/json",
                "Content-Length": responseBody.length
            });
            res.status(200);
            return res.send({
                success: true,
                response: result
            });
        } catch (err) {
            return getErrorHandler(res, err);
        }
    };
}

function getErrorHandler(res, err) {
    let code = parseInt(err.statusCode || err.code);

    if (typeof code !== "number" || isNaN(code)) {

        code = 500;
        console.error([
            "Unexpected error thrown",
            "Code 500",
            `Message ${err.message}`,
            `Stack ${err.stack}`,
            `Raw ${err}`,
        ].join("\n"));
    }
    res.status(code);
    res.send({
        success: false,
        code: code,
        error: err.message
    });
}

module.exports = {
    wrap
};