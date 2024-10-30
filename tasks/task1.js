const https = require('https');

function fetchUsers() {
    const options = {
        hostname: 'jsonplaceholder.typicode.com',
        path: '/users',
        method: 'GET'
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const users = JSON.parse(data);
                    const result = users.map(user => ({ id: user.id, name: user.name }));
                    resolve(result);
                } catch (error) {
                    reject(error);  
                }
            });
        });

        req.on('error', (error) => {
            reject(error);  
        });

        req.end();
    });
}
console.log(fetchUsers())

module.exports = fetchUsers;
