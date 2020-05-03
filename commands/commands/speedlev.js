const Discord = require( 'discord.js' );
module.exports = {
  name: "speedlev",
  description: "Provides information to quickly setup a leviathan speedrun.",
  run: async ( bot, message, args ) => {
    const Embed = new Discord.MessageEmbed()
      .setTitle( `Please look at your coorresponding position.` )
      .setThumbnail( 'https://i.imgur.com/o6pudX7.jpg' )
      .addFields(
        { name: `Position 1`, value: `https://www.youtube.com/watch?v=_hro9S8akJ8: Long skip to gauntlet, skip to pleasure gardens / start encounter / kill R3 (which spawns at R2), go to furthest unoccupied plate in the Royal Pools, right throne.` },
        { name: `Position 2`, value: 'https://www.youtube.com/watch?v=ahsiGizUe6E: Long skip to gauntlet, skip to pleasure gardens / start encounter / Perma Flag / kill L1, go to furthest unoccupied plate in the Royal Pools, middle mind\'s eye.' },
        { name: `Position 3`, value: 'https://www.youtube.com/watch?v=bkfettq98XQ: Cup Runner / Finish Line, kill R1, go to furthest unoccupied plate in the Royal Pools, mid throne.' },
        { name: `Position 4`, value: 'https://www.youtube.com/watch?v=RFkENg1SSyM: Dog Runner / Gate 3, Kill L3, go to furthest unoccupied plate in the Royal Pools, left throne.' },
        { name: `Position 5`, value: 'https://www.youtube.com/watch?v=R3EIWJsYMqg: Clear Axe / Dog Arrows / Gate 4, Kill R2, go to furthest unoccupied plate in the Royal Pools, right mind\'s eye.' },
        { name: `Position 6`, value: 'https://www.youtube.com/watch?v=RnUgIkWJT54: Clear Sun / Cup Arrows / Forwards (Note: this is no longer possible, just grab the orb and run forwards normally), Kill trees, Skip to Calus / left mind\'s eye / solo skulls.' },
        { name: `Helpful:`, value: 'https://www.youtube.com/watch?v=AGruEH5N3as' },
      )
      .setFooter( 'Watch your video to see the appropriate builds for each encounter.' )
      .setColor( `0x46789d` );
    message.channel.bulkDelete( 1, true );
    let msg = await message.channel.send( Embed );
  }
};