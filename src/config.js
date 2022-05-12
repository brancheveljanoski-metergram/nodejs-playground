const {
    PORT,
} = process.env;

const config = {
    PORT: parseInt(PORT) || 1000,
};

module.exports = {
    config
}


