const { log } = console;

log('Starting app');

setTimeout(() => {
    log('Inside of callback');
}, 2000)

log('Finishing app');
