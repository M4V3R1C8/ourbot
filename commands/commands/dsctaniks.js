const Discord = require( 'discord.js' );
module.exports = {
  name: "dsctaniks",
  aliases: [ "dsc4, dscboss" ],
  description: "Callouts Map for DSC Taniks, final encounter",
  run: async ( bot, message, args ) => {
    const Embed = new Discord.MessageEmbed()
      .setTitle( `DSC Taniks Map` )
      .setThumbnail( 'https://i.imgur.com/huK9lrl.png' )
      .addFields(
        { name: 'Default Strat:', value: 'The Core Four Challenge Strat (Flawless runs will still use 2/2 for safety!)' },
        { name: 'Operator 1:', value: 'Shoots the purple orbs that spawn around players and ruins many flawless runs.' },
        { name: 'Supressor 1:', value: 'Stands under each of the three SUPRESSOR DRONES near the boss and shoots the boss. Does not stun the boss until after the second purple orb is shot by the Operator.' },
        { name: 'Scanner 1:', value: 'Alternate for default strategy, but usually calls out the 3 glowing CORE DEPOSITS based on their numbers 1-6 clockwise from spawn left.' },
        { name: 'Alternate:', value: 'Deposits cores from the boss into each of the 4 CORE DEPOSITS around the map. During 2/2 this is based on what is typed by the Scanner.' },
        { name: 'Organization:', value: 'Assign each player a number from 1-4. Each number is responsible for dropping their orb and helping anaother player: 1 front right, 2 back right, 3 front left, 4 back left. Just like the Shuro Chi Walls, players fill in the missing CORE DEPOSITS from left to right based on their number.' },
        { name: 'Divinity:', value: 'If there is a discpute, any player below 1250 is automatically nominated for Divinity since power level does not affect the debuff. Then this duty falls onto scanner 1 as they do not have to stun the boss or free players.'  },
      )
      .setColor( `0x46789d` );
    message.channel.bulkDelete( 1, true );
    let msg = await message.channel.send( Embed );
  }
};