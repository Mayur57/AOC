const fs = require('fs');

const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error("Usage: node configure.js <string>");
    process.exit(1);
}

const sessionString = args[0];

const config = {
    session: sessionString
};

fs.writeFile("config.json", JSON.stringify(config, null, 4), (err) => {
    if (err) {
        console.error("[ERR] Error writing to config.json:", err);
        process.exit(1);
    }
    console.log("[INF] config.json has been created successfully.");
});
