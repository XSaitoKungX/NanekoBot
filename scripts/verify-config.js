/* eslint-disable no-async-promise-executor */
const config = require("../config.js");
const fetch = require("node-fetch");

const chalk = require("chalk");
const success = (message) => console.log(`   ${chalk.green("✓")} ${message}`);
const error = (message, howToFix) => console.log(`   ${chalk.red("✗")} ${message}${howToFix ? ` : ${howToFix}` : ""}`);
const ignore = (message) => console.log(`   ${chalk.yellow("~")} ${message}`);

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const checks = [
	() => {
		console.log("\n\nEnvironnement");
		return new Promise((res) => {
			if(parseInt(process.version.split(".")[0].split("v")[1]) >= 12){
				success("node.js-Version sollte gleich oder höher als v12 sein");
			} else {
				error("node.js-Version sollte gleich oder höher als v12 sein");
			}
			res();
		});
	},
	() => {
		console.log("\n\nDiscord Bot");
		return new Promise((res) => {
			const Discord = require("discord.js");
			const client = new Discord.Client();
			let readyResolve;
			new Promise((resolve) => readyResolve = resolve);
			client.login(config.token).then(async () => {
				success("sollte ein gültiges Bot-Token sein");
				await readyResolve();
				if(!client.guilds.cache.has("912404023280304148")){
					error("sollte zum Emojis-Server hinzugefügt werden", "bitte füg deinen Bot auf diesem Server hinzu: https://discord.gg/NPkySYKMkN, damit die Emojis funktionieren");
				} else {
					success("sollte dem Emojis-Server hinzugefügt werden");
				}
				res();
			}).catch(() => {
				error("sollte ein gültiges Bot-Token sein");
				res();
			});
			client.on("ready", readyResolve);
		});
	},
	() => {
		console.log("\n\nMongoDB");
		return new Promise((res) => {
			const MongoClient = require("mongodb").MongoClient;
			const dbName = config.mongoDB.split("/").pop();
			const baseURL = config.mongoDB.substr(0, config.mongoDB.length - dbName.length);
			const client = new MongoClient(baseURL, {
				useUnifiedTopology: true
			});
			client.connect().then(async () => {
				success("sollte in der Lage sein, eine Verbindung zur Mongo-Datenbank herzustellen");
				res();
			}).catch(() => {
				error("sollte sich mit der Mongo-Datenbank verbinden können", "überprüfe bitte, ob der MongoDB-Server gestartet ist");
				res();
			});
		});
	},
	() => {
		console.log("\n\nAPI keys");
		return new Promise(async (resolve) => {
			if(!config.apiKeys.amethyste){
				ignore("Amethyste-API ist nicht konfiguriert, Schlüssel sollte nicht überprüft werden.");
			} else {
				const res = await fetch("https://v1.api.amethyste.moe/generate/blurple", {
					method: "POST",
					headers: {
						Authorization: `Bearer ${config.apiKeys.amethyste}`
					}
				});
				const result = await res.json();
				if(result.status === 401){
					error("sollte ein gültiger Amethyste-API-Schlüssel sein", "hol dir deinen Schlüssel hier: https://api.amethyste.moe/");
				} else {
					success("sollte ein gültiger Amethyste-API-Schlüssel sein");
				}
			}
			if(!config.apiKeys.blagueXYZ){
				ignore("blague.xyz API ist nicht konfiguriert, Schlüssel sollte nicht überprüft werden.");
			} else {
				const res = await fetch("https://blague.xyz/api/joke/random", {
					headers: {
						Authorization: config.apiKeys.blagueXYZ
					}
				});
				const result = await res.json();
				if(result.status === 401){
					error("sollte ein gültiger blague.xyz-Schlüssel sein", "hol dir deinen Schlüssel hier: https://blague.xyz/");
				} else {
					success("sollte ein gültiger blague.xyz-Schlüssel sein");
				}
			}
			if(!config.apiKeys.dbl){
				ignore("DBL-API ist nicht konfiguriert, Schlüssel sollte nicht überprüft werden.");
			} else {
				const res = await fetch("https://top.gg/api/bots/check?userId=test", {
					method: "POST",
					headers: {
						Authorization: config.apiKeys.dbl
					}
				});
				const result = await res.json();
				if(result.error && result.error === "Unauthorized"){
					error("sollte ein gültiger DBL-Schlüssel sein", "hol dir deinen Schlüssel hier: https://top.gg/ ODER lösche den Schlüssel aus der Konfiguration, wenn du keinen Schlüssel hast");
				} else {
					success("sollte ein gültiger DBL-Schlüssel sein");
				}
			}
			if(!config.apiKeys.fortniteFNBR){
				ignore("Die FortniteFNBR-API ist nicht konfiguriert, der Schlüssel sollte nicht überprüft werden.");
			} else {
				const res = await fetch("https://fnbr.co/api/stats", {
					headers: {
						"x-api-key": config.apiKeys.fortniteFNBR
					}
				});
				const result = await res.json();
				if(result.status && result.status === 401){
					error("sollte ein gültiger FNBR-Schlüssel sein", "hol dir deinen Schlüssel hier: https://fnbr.co/api/docs");
				} else {
					success("sollte ein gültiger FNBR-Schlüssel sein");
				}
			}
			if(!config.apiKeys.sentryDSN){
				ignore("SentryDSN ist nicht konfiguriert, Schlüssel sollte nicht überprüft werden.");
			} else {
				const Sentry = require("@sentry/node");
				try {
					Sentry.init({ dsn: config.apiKeys.sentryDSN });
					await delay(1000);
					success("sollte ein gültiger Sentry-DSN-Schlüssel sein");
				} catch (e) {
					error("sollte ein gültiger Sentry-DSN-Schlüssel sein", "Sentry wird nicht empfohlen, lösche den Schlüssel aus der config");
				}
			}
			resolve();
		});
	},
	() => {
		console.log("\n\nDashboard");
		return new Promise(async (resolve) => {
			if(!config.dashboard.enabled){
				ignore("Dashboard ist nicht aktiviert, die Konfiguration sollte nicht überprüft werden.");
			} else {
				const checkPortTaken = (port) => {
					return new Promise((resolve) => {
						const net = require("net");
						const tester = net.createServer()
							.once("error", () => {
								resolve(true);
							})
							.once("listening", function() {
								tester
									.once("close", function() {
										resolve(false);
									})
									.close();
							})
							.listen(port);
					});
				};
				const isPortTaken = await checkPortTaken(config.dashboard.port);
				if(isPortTaken){
					error("Dashboard-Port sollte verfügbar sein", "Du hast wahrscheinlich einen anderen Prozess, der diesen Port verwendet");
				} else {
					success("Dashboard-Port sollte verfügbar sein");
				}
			}
			resolve();
		});
	}
];

(async () => {
	console.log(chalk.yellow("Dieses Skript prüft, ob deine Konfiguration fehlerhaft ist, und einige andere wichtige Dinge, wie z.B. ob deine Datenbank gestartet ist usw."));
	for(const check of checks){
		await check();
	}
	console.log(chalk.yellow("\n\nVielen Dank, dass du Naneko verwendest. Wenn du weitere Hilfe benötigst, dann tritt hier unserem Support-Server bei: https://dsc.gg/infinity-support"));
	process.exit(0);
})();
