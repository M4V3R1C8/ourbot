const Discord = require( 'discord.js' );
module.exports = {
  name: "dscsatalite",
  aliases: [ "dsc3" ],
  description: "Callouts Map for DSC Satalite, thrid encounter",
  run: async ( bot, message, args ) => {
    const Embed = new Discord.MessageEmbed()
      .setTitle( `DSC Satalite` )
      .setThumbnail( 'https://i.imgur.com/24coVZ0.png' )
      .addFields(
        { name: 'Default Strat:', value: 'Chaos Method: Everyone picks up the first buff they see and everyone tries to pick up Deactivated Augments' },
        { name: 'Operator:', value: 'Shoots the red glowing pads above each of the CORE SPAWN locations.' },
        { name: 'Scanner:', value: 'Type 1 of 4 callouts in chat based on which set of CORE DEPOSITS are glowing (2, L, R, 1). 2 is Left 2 and Right 2. 1 is Left 1 and Right 1. L is Left 1 and Left 2. R is Right 1 and Right 2. The buffs cannot cross unless something has gone wrong.' },
        { name: 'Supressor:', value: 'Stands under each of the three SUPRESSOR DRONES and shoots the boss until the boss stops glowing blue.' },
        { name: 'Alternate:', value: 'Deposits cores from each of the 4 CORE SPAWN locations to the correct CORE DEPOSIT sets as typed by the Scanner. ALSO picks up any Deactivated Augments that show up in the AUGMENT TERMINALS.' },
      )
      .setColor( `0x46789d` );
    message.channel.bulkDelete( 1, true );
    let msg = await message.channel.send( Embed );
  }
};