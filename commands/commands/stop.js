module.exports = {
  name: "stop",
  aliases: [ "pause" ],
  description: "",
  usage: "link",
  run: async ( bot, message, args, db ) => {
    message.guild.me.voice.channel.leave();
  }
}