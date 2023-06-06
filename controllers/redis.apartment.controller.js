const axios = require('axios');
const redis = require('redis');

let redisClient;

(async () => {
    redisClient = redis.createClient();

    redisClient.on('error', (error) => {
        console.error(`Error: ${error}`)
    });

    await redisClient.connect();
})();

async function fetchApartmentsApiData() {
    const apiResponse = await axios.get(
        `http://localhost:3000/apartments`
    );

    return apiResponse.data;
}

async function getApartmentsData(req, res) {
    const key = req.params.key;

    let results;
    let isCached = false;

    try {
        const cacheResults = await redisClient.get(key);

        if (cacheResults) {
            isCached = true;
            results = JSON.parse(cacheResults);
        } else {
            results = await fetchApartmentsApiData();

            if (results.length === 0) {
                return res.status(404).send({
                    message: 'API returned an empty array'
                });
            }

            await redisClient.set(key, JSON.stringify(results), {
                EX: 60,
                NX: true,
            });
        }

        return res.send({
            fromCache: isCached,
            data: results,
        });
    } catch (error) {
        return res.status(404).send(error);
    }
}

module.exports = {
    getApartmentsData
};
