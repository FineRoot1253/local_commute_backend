const redis = require('redis');
const redisClient = redis.createClient({
    host: "redis",
    port: process.env.REDIS_PORT
});

module.exports = {redis,redisClient};