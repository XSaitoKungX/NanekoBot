module.exports = {
	/* The token of your Discord Bot */
	token: "OTEyMzk1MTMwNjEzNDI0MjM4.YZvULg.hvyu9tC8RPbd42-fkd4X-PZvC78",
	/* For the support server */
	support: {
		id: "857622993702486067", // The ID of the support server
		logs: "932115428736647209", // And the ID of the logs channel of your server (new servers for example)
	},
	/* Dashboard configuration */
	dashboard: {
		enabled: false, // whether the dashboard is enabled or not
		secret: "HUXfW-JwMs6XLdBIfXCBAN2Fw0FWe2c_", // Your discord client secret
		baseURL: "https://dashboard.atlanta-bot.fr", // The base URl of the dashboard
		logs: "932115428736647209", // The channel ID of logs
		port: 8080, // Dashboard port
		expressSessionPassword: "!Eileen0604", // Express session password (it can be what you want)
		failureURL: "https://www.atlanta-bot.fr" // url on which users will be redirected if they click the cancel button (discord authentication)
	},
	mongoDB: "mongodb://localhost:27017/AtlantaBot", // The URl of the mongodb database
	prefix: "n.", // The default prefix for the bot
	/* For the embeds (embeded messages) */
	embed: {
		color: "#0091fc", // The default color for the embeds
		footer: "Naneko | Open Source" // And the default footer for the embeds
	},
	/* Bot's owner informations */
	owner: {
		id: "848917797501141052", // The ID of the bot's owner
		name: "꧁Saito꧂#6248" // And the name of the bot's owner
	},
	/* DBL votes webhook (optional) */
	votes: {
		port: 5000, // The port for the server
		password: "XXXXXXXXXXX", // The webhook auth that you have defined on discordbots.org
		channel: "934089402475491388" // The ID of the channel that in you want the votes logs
	},
	/* The API keys that are required for certain commands */
	apiKeys: {
		// BLAGUE.XYZ: https://blague.xyz/
		blagueXYZ: "https://blague.xyz/api/joke/random",
		// FORTNITE TRN: https://fortnitetracker.com/site-api
		fortniteTRN: "36515f5b-d411-4472-a999-35a7dcea3446",
		// FORTNITE FNBR: https://fnbr.co/api/docs
		fortniteFNBR: "88445bf7-f6ea-418e-ad85-f5cde3bd0e80",
		// DBL: https://discordbots.org/api/docs#mybots
		dbl: "https://top.gg/api",
		// AMETHYSTE: https://api.amethyste.moe
		amethyste: "b573de32aec3995bd0b403db4cfd82c506784978c09397db14579094b8667c3303054ae26a5bdf4844fc94e4c68b8651a3b8facec61cccbf58071278d8795743",
	},
	/* The others utils links */
	others: {
		github: "https://github.com/Androz2091", // Founder's github account
		donate: "https://patreon.com/Androz2091" // Donate link
	},
	/* The Bot status */
	status: [
		{
			name: "@Naneko help: in {serversCount} Servers",
			type: "LISTENING"
		},
		{
			name: "My website: atlanta-bot.fr",
			type: "PLAYING"
		}
	]
};
