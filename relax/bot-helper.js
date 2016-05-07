var assign = require('lodash/object/assign');
var UUID = require('uuid');
var Redis = require('./redis');

function BotHelper() {
  this.redis = Redis;
}

assign(BotHelper.prototype, {

  startBot: function (teamUid, token, options) {
    options = options || {};
    this.ensureProperConfigsExist();

    var namespace;
    var hsetPayload = { team_id: teamUid, token: token };
    var pubsubPayload = { team_id: teamUid, type: 'team_added' }

    if (options.namespace) {
      namespace = options.namespace.toString().trim();
      hsetPayload.namespace = namespace;
      pubsubPayload.namespace = namespace;
    }

    var key = namespace ? (namespace + '-' + teamUid) : teamUid;

    this.redis.multi()
      .hset(process.env.RELAX_BOTS_KEY, key, JSON.stringify(hsetPayload))
      .publish(process.env.RELAX_BOTS_PUBSUB, JSON.stringify(pubsubPayload))
      .exec();
  },

  startTyping: function (teamUid, channelUid) {
    this.ensureProperConfigsExist();

    var messageId = UUID.v4();

    var payload = JSON.stringify({
      id: messageId,
      type: 'typing',
      channel: channelUid
    });

    this.redis.publish(
      process.env.RELAX_BOTS_PUBSUB,
      JSON.stringify({
        type: 'message',
        team_id: teamUid,
        id: messageId,
        payload: payload
      })
    )
  },

  ensureProperConfigsExist: function () {
    if (!process.env.RELAX_BOTS_KEY) {
       throw 'Environment Variable RELAX_BOTS_KEY is not set'
    }
    if (!process.env.RELAX_BOTS_PUBSUB) {
       throw 'Environment Variable RELAX_BOTS_PUBSUB is not set'
    }
  },

});

module.exports = BotHelper;