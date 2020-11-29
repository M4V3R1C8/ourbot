const Discord = require( 'discord.js' );
module.exports = {
  name: "dscatraks",
  aliases: [ "dscatracks, dscatrax, dsc2" ],
  description: "Callouts Map for DSC Atraks, second encounter",
  run: async ( bot, message, args ) => {
    const Embed = new Discord.MessageEmbed()
      .setTitle( `DSC Atraks-1` )
      .addFields(
        { name: 'Default Strategy:', value: '4/2: Reduces potential for wipes while still allowing 1 phase. If after first phase boss has 1/3rd health everyone stays upstairs and waits.' },
        { name: 'Operator:', value: 'Starts Bottom, picks up buff from below then heads upstairs. If doing challenge, they kill the middle servitor before going up. Sends down all pods, shoots purple buff of heads when it is large and changes to a lighter color. Directs buffed players to a unique airlock to trap buff inside.' },
        { name: 'Scanner 1 / Scanner Top:', value: 'Top Left, picks up yellow buff immediately, callouts out yellow checkerboard glowing atraks, countsdown from 3 to kill, then sends buff down. Picks buff up to repeat. obtains yellow buff for final stand.' },
        { name: 'Scanner 2 / Scanner Bottom:', value: 'Bottom Left, picks up yellow buff from terminal, callouts out yellow checkerboard glowing atraks, countsdown from 3 to kill, then sends buff up. Picks buff up to repeat. Sends yellow buff for final stand. If gets purple buff, sends scan, then goes up.' },
        { name: 'Bottom Add Clear:', value: 'Clears adds on the opposite side of the Scanner Bottom and picks up the first purple buff to bring upstairs and deposit in airlock (follow Operator).' },
        { name: 'Everyone Else:', value: 'Last 2 players are upstairs doing add clear, calling out scanner, and doing damage with Lament.' },
      )
      .setFooter(`DPS Strat: Swords, 3 light attacks followed by a heavy. Lament users should do the combo while HOLDING guard.`)
      .setColor( `0x46789d` );
    message.channel.bulkDelete( 1, true );
    let msg = await message.channel.send( Embed );
  }
};