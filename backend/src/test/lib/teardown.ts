import { spawn } from 'child_process'

const teardown = async () => {
    const process = spawn('docker-compose', ['stop', 'database-test']);    
    process.on('close', (code) => {
        if (code === 0) {
            console.info(`Database-test container stopped succesfull`);
        } else {
            console.info(`Database-test container failed to stop with code - ${code}`);
        }
    });
}

module.exports = teardown;