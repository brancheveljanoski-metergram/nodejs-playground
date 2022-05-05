const { response } = require("express");

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

            successResponse = {};

            if (Object.keys(result).length > 0) {
                successResponse.response = result;
            } else {
                successResponse.success = true;
            }

            return res.send(successResponse);

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