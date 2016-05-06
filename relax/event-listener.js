var assign = require('lodash/object/assign');
var inherits = require('inherits');
var Redis = require('./redis');
var EventEmitter = require('events').EventEmitter;

function EventListener() {
  this.redis = Redis;
}

inherits(EventListener, EventEmitter);

assign(EventListener.prototype, {

  listen: function () {
    if (!process.env.RELAX_EVENTS_QUEUE) {
       throw 'Environment Variable RELAX_EVENTS_QUEUE is not set'
    }

    console.log('Listening for Relax Events...');

    this.checkEventQueue();
  },

  checkEventQueue: function () {
    var self = this;

    this.redis.blpop(process.env.RELAX_EVENTS_QUEUE, 0, function (err, queue) {
      queue = queue || [];

      if (queue[0] == process.env.RELAX_EVENTS_QUEUE) {
        self.emit('event', JSON.parse(queue[1]));
      }

      self.checkEventQueue();
    });
  },

});

module.exports = EventListener;
