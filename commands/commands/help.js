const { MessageEmbed } = require( "discord.js" );
const { stripIndents } = require( "common-tags" );
const config = require( '../../config.json' );
const prefix = config.prefix;
const ms = require( 'ms' );
module.exports = {
  name: "help",
  aliases: [ "h" ],
  description: "Returns all commands, or one specific command info",
  usage: "[command | alias]",
  run: async ( bot, message, args ) => {
    if ( args[ 0 ] ) {
      return getCMD( bot, message, args[ 0 ] );
    } else {
      return getAll( bot, message );
    }
  }
};

function getAll ( bot, message ) {
  const embed = new MessageEmbed()
    .setColor( "0x46789d" );

  const commands = ( category ) => {
    return bot.commands
      .map( cmd => `\`${ cmd.name }\`: ${ cmd.description } \n` )
      .join( " " );
  };

  const info = bot.categories
    .map( cat => stripIndents`**${ cat[ 0 ].toUpperCase() + cat.slice( 1 ) }** \n${ commands( cat ) }` );

  return message.channel.send( embed.setDescription( info ) );
}

function getCMD ( bot, message, input ) {
  const embed = new MessageEmbed();

  const cmd = bot.commands.get( input.toLowerCase() ) || bot.commands.get( bot.aliases.get( input.toLowerCase() ) );

  let info = `No information found for command **${ input.toLowerCase() }**`;

  if ( !cmd ) {
    return message.channel.send( embed.setColor( "0x46789d" ).setDescription( info ) );
  }

  if ( cmd.name ) info = `**Name**: ${ cmd.name }`;
  if ( cmd.aliases ) info += `\n**Aliases**: ${ cmd.aliases.map( a => `\`${ a }\`` ).join( ", " ) }`;
  if ( cmd.description ) info += `\n**Description**: ${ cmd.description }`;
  if ( cmd.timeout ) info += '\n**Timeout**: ' + ms( cmd.timeout );
  if ( cmd.usage ) {
    info += `\n**Usage**: ${ prefix }${ cmd.name } ${ cmd.usage }`;
    embed.setFooter( `Syntax: <> = required, [] = optional` );
  }
  return message.channel.send( embed.setColor( "RANDOM" ).setDescription( info ) );
}