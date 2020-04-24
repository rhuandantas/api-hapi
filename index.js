const init = require('./src/server');

const start = async () => {
    await init()
        .then((server) => server.start())
        .catch((err) => console.console.log(err));
}

start();