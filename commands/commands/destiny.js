const Discord = require( 'discord.js' );
module.exports = {
  name: "destiny",
  aliases: [ "ghosts, nodes, sites, eggs, chests, patrol, patrols, more" ],
  description: "A complete guide to all things collectible.",
  usage: "use any of the aliases: ghosts, nodes, sites, eggs, chests, patrol, patrols, more",
  run: async ( bot, message, args ) => {
    const Embed = new Discord.MessageEmbed()
      .setTitle( `Amazing Resources:` )
      .setThumbnail( 'https://www.pngfind.com/pngs/m/18-184370_destiny-destiny-2-logo-transparent-hd-png-download.png' )
      .addFields(
        { name: `Destiny Item Manager`, value: `https://app.destinyitemmanager.com/` },
        { name: `Anything regarding patrols, eggs, chests, ghosts, lore, etc.`, value: `https://braytech.org/` },
        { name: `Alternative:`, value: 'https://www.d2checklist.com/' },
        { name: `Weapon rolls`, value: 'https://www.light.gg/db/category/1/weapons/' },
      )
      .setFooter( 'Let me know if you have another great resource!' )
      .setColor( `0x46789d` );
    message.channel.bulkDelete( 1, true );
    let msg = await message.channel.send( Embed );
  }
};