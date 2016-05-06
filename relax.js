var assign = require('lodash/object/assign');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;
var EventListener = require('./relax/event-listener');
var BotHelper = require('./relax/bot-helper');

function Relax() {
  var self = this;

  this.eventListener = new EventListener();

  this.eventListener.on('event', function (data) {
    self.emit('event', data);
  });

  this.botHelper = new BotHelper();
}

inherits(Relax, EventEmitter);

assign(Relax.prototype, {

  start: function () {
    this.eventListener.listen();
  },

  createBot: function (teamUid, token, options) {
    this.botHelper.startBot(teamUid, token, options);
  },

});

module.exports = Relax;