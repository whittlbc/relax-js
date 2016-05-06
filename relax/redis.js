var redis = require('redis');

var Redis = {

  getConnection: function () {
    this.redis = this.redis || redis.createClient({ url: this.getRedisUrl() });
    return this.redis;
  },

  getRedisUrl: function () {
    return process.env.REDISCLOUD_URL
      || process.env.REDISTOGO_URL
      || process.env.REDIS_URL
      || 'redis://localhost:6379';
  }

};

module.exports = Redis.getConnection();
