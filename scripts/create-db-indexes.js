const chalk = require("chalk");
console.log(chalk.blue("Datenbank migrieren von v4.6.4 to v4.7.0...\n\n"));

let MongoClient;
try {
	MongoClient = require("mongodb").MongoClient;
} catch (e) {
	console.log(chalk.red("Modul mongodb kann nicht gefunden werden. Bitte installiere es mit \"npm install mongodb\", bevor du Migrationsskripte ausführst."));
	process.exit(1);
}

const config = require("../config.js");
const dbName = config.mongoDB.split("/").pop();
const baseURL = config.mongoDB.substr(0, config.mongoDB.length - dbName.length);
const client = new MongoClient(baseURL, {
	useUnifiedTopology: true
});
client.connect().then(async () => {
	console.log(chalk.green("Erfolgreich mit der MongoDB-Datenbank verbunden."));
   
	const db = client.db(dbName);
	const guilds = db.collection("guilds");
	const members = db.collection("members");
	const users = db.collection("users");
    
	console.log(chalk.yellow("Gildenindex erstellen..."));
	await guilds.createIndex({ id: 1 });
	console.log(chalk.green("Gildenindex erstellt."));
    
	console.log(chalk.yellow("Mitgliederindex erstellen..."));
	await members.createIndex({ guildID: 1, id: -1 });
	console.log(chalk.green("Mitgliederverzeichnis erstellt."));
    
	console.log(chalk.yellow("Benutzerindex erstellen..."));
	await users.createIndex({ id: 1 });
	console.log(chalk.green("Benutzerindex erstellt."));
    
	console.log(chalk.blue("\n\nIndexes erfolgreich erstellt."));

	process.exit(0);
}).catch(() => {
	console.log(chalk.red("Es konnte keine Verbindung zur MongoDB-Datenbank hergestellt werden..."));
	process.exit(1);
});