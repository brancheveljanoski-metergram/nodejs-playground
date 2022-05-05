class CodeError extends Error {
    constructor(args, code) {
        super(args);
        this.code = code;
    }
}

module.exports = CodeError;