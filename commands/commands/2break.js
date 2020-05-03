const Discord = require( 'discord.js' );
module.exports = {
  name: "2break",
  aliases: [ "eow2" ],
  description: "Provides details about the double shield break method.",
  run: async ( bot, message, args ) => {
    const Embed = new Discord.MessageEmbed()
      .setTitle( `Underbelly Map and Routes!` )
      .setThumbnail( 'https://i.imgur.com/Q6fi0Kz.jpg' )
      .addFields(
        { name: `\u200b`, value: `Legend: Phase 01 is what you currently see. Phase 02 represents the orbs required to break the shield a second time. You have 30s to break the shield the first time in order for this to work.` },
        { name: `\u200b`, value: 'Runners: Charge the orbs based on Phase 02. If you are solar runner and you see a solar orb then leave your cranium to charge at the arc plate, go pick up the cranium from solar plate, and get to damage asap. If you do not see a solar orb then charge the duplicate based on Phase 02. So if there are 2 arc you will charge at the void plate.' },
        { name: `\u200b`, value: 'Defenders: Leave your cranium to charge at the plates that coorrespond to the orbs you see. If you do not see your color then charge the duplicate color, and then clear adds at the damage plate. The damage plate is the plate where you can clearly see all three orbs.' },
      )
      .setFooter( 'this strat should only be used in speeds or practice. It allows you to do extra damage before the platforms appear in case you do no one phase the boss.' )
      .setColor( `0x46789d` );
    message.channel.bulkDelete( 1, true );
    let msg = await message.channel.send( Embed );
  }
};