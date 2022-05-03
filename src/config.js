const {
    PORT,
} = process.env;

const config = {
    PORT: parseInt(PORT) || 3000,
};

module.exports = {
    config
}
