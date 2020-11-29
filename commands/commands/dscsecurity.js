const Discord = require( 'discord.js' );
module.exports = {
  name: "dscsecurity",
  aliases: [ "dsc1" ],
  description: "Callouts Map for DSC Security, first encounter",
  run: async ( bot, message, args ) => {
    const Embed = new Discord.MessageEmbed()
      .setTitle( `DSC Security` )
      .setThumbnail( 'https://i.imgur.com/B1ulucc.png' )
      .addFields(
        { name: 'Operator 1:', value: 'Picks up buff from terminal to start encounter, waits for Dark callouts then goes below to shoot 4 pads' },
        { name: 'Operator 2:', value: 'Picks up red buff from terminal when OP1 puts it in. Either places red buff back in terminal after DPS and after yellow buff is removed or replaces OP1 down below.' },
        { name: 'Scanner OOB:', value: 'Magically calls out pads from below and what fuses to hit. Needs 1 person to pick up yellow buff on dark and put it into the terminal.' },
        { name: 'Scanner Solo:', value: 'Picks up yellow buff on Dark side, types D1-5 based on map, goes with Operator to type L1-5 based on map, sends yellow buff after red buff is removed and picks up the buff again after DPS.' },
        { name: `Scanner 1 / Dark Scanner:`, value: 'Picks up yellow buff on Dark side, types D1-5 based on map, sends yellow buff to Light Side, and then picks up yellow buff from the terminal after DPS.' },
        { name: `Scanner 2 / Light Scanner:`, value: 'Picks up yellow buff from terminal, types L1-5 then sends yellow buff to Operator AFTER the red buff has been placed and removed.' },
      )
      .setColor( `0x46789d` );
    message.channel.bulkDelete( 1, true );
    let msg = await message.channel.send( Embed );
  }
};