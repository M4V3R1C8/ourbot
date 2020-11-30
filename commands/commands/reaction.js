const Discord = require( 'discord.js' );
module.exports = {
  name: "reaction",
  description: "Mod feature, don't worry about it",
  run: async ( bot, message, args ) => {
    const Embed = new Discord.MessageEmbed()
      .setTitle( `React below to assign your roles.` )
      .addFields(
        { name: `\u200b`, value: 'React with 1️⃣ to be notified for DSC, GOS, and LW raids. @raiders' },
        { name: `\u200b`, value: 'React with 2️⃣ to be notified for Deep Stone Crypt farms. @dscfarm' },
        { name: `\u200b`, value: 'React with 3️⃣ to be notified for Garden of Salvation farms. @gosfarm' },
        { name: `\u200b`, value: 'React with 4️⃣ to be notified for Last Wish farms. @lwfarm' },
        { name: `\u200b`, value: 'React with 5️⃣ to be notified for Strikes and Nightfalls. @strikes' },
        { name: `\u200b`, value: 'React with 6️⃣ to be notified for Crucible, Iron Banner, and Trials. @crucible' },
        { name: `\u200b`, value: 'React with 7️⃣ to be notified for Gambit. @gambit' },
        { name: `\u200b`, value: 'React with 8️⃣ to be notified for Dungeons. @dungeons' },
        { name: `\u200b`, value: 'React with 9️⃣ to be notified for hunts and other seasonal content. @seasonal' },
      )
      .setColor( `0x46789d` );
    message.channel.bulkDelete( 1, true );
    let msg = await message.channel.send( Embed );
    await msg.react( "1️⃣" );
    await msg.react( "2️⃣" );
    await msg.react( "3️⃣" );
    await msg.react( "4️⃣" );
    await msg.react( "5️⃣" );
    await msg.react( "6️⃣" );
    await msg.react( "7️⃣" );
    await msg.react( "8️⃣" );
    await msg.react( "9️⃣" );
  }
};