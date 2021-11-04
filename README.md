# MinecraftBot
## Setting up the bot
You'll need to copy config.json.example and rename it to just config.json. 
Once that's done, head over to https://discord.com/developers/applications to create a new application and bot.
Fill in the bot token into the token field, and the application ID into the clientId field.
Additionally, designate a channel in your server for the game chat relay, and a role that can use admin commands for the bot.
Paste the ids into the config, as well as the id of the Discord server itself.

## Configuring Minecraft options
Download the appropriate server jar for your version of Minecraft. This bot has been tested on 1.17.1, other versions may have issues.
Put the jar into the game_server folder. In the config file, change game_jar to match the name of the jar you're using. In game_args, you can specify server arguments. [Here's a link to a thread by CPW talking about good arguments to use.](https://old.reddit.com/r/feedthebeast/comments/5jhuk9/modded_mc_and_memory_usage_a_history_with_a/)
Additionally, there is also some default configuration options set for the essentials and command module. You should be able to understand how to use these from the configuration example, but [here](https://github.com/garrettjoecox/scriptserver/tree/master/packages/essentials) is the essentials documentation.

## Starting everything up
After configuring everything to your liking, it's time to start everything up. Run `node .\bot.js` to start the Discord bot. You can run this inside something like `screen` if you want. After that, run `/start` in the discord server, assuming there's no console errors. This will start the server for the first time, and then close it again. Navigate to the game_server folder, and set eula=true in eula.txt. Run `/start` again, or `/restart` if start wont work. This will boot the server up again, and generate the rest of the necessary files. After this is done, you'll actually need to kill the node process. This is so we can edit the server.properties file. Make sure that the rcon port and password match the ones set in the bot config, and that they are enabled to begin with. Start the bot back up again, and you should be good to go.

## Troubleshooting
Make sure all the config options are set correctly. If they are, make an issue on the repository and we can sort it out.
