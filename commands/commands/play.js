const ytdl = require('ytdl-core');
module.exports = {
  name: "play",
  aliases: [ "music" ],
  description: "",
  usage: "link",
  run: async ( bot, message, args, db ) => {
    if(!args[0]) return message.channel.send("Don't forget to include a youtube link!");
    if(!ytdl.validateURL(args[0])) return message.channel.send("Don't forget to include a youtube link!");
    if(!message.member.voice.channel) return message.channel.send("Join a voice channel first!");
    const connection = await message.member.voice.channel.join();
    var url = args[0];
    const dispatcher = connection.play(await ytdl(url), { type: 'opus' });
    dispatcher.on('finish', () => {message.guild.me.voice.channel.leave()});
    dispatcher.on('error', () => {message.channel.send("Only youtube links work for now!")});
  }
}