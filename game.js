const readline = require('readline');

 const { Player } = require('./class/player');
const { World } = require('./class/world');

const worldData = require('./data/world-data');
const { builtinModules } = require('module');


let player;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function printHelp() {
    console.log("Controls:")
    console.log("  Type 'h' for help");
    console.log("  Type 'q' to quit");
    console.log("  Type 'l' to look around");
    console.log("  Type 'i' to check your inventory");
    console.log("  Type 'take <item>' to take an item");
    console.log("  Type 'drop <item>' to drop an item");
    console.log("  Type 'eat <item>' to eat a food item");
    console.log("  Type 'n', 's', 'e', 'w' to move");
    console.log("");
}

startGame = () => {
    console.clear();
    console.log("Welcome to App Academy Adventure!\n");

    rl.question('Please enter your name: ', (name) => {
        console.clear();
        console.log(`Hello, ${name}!\n`);

        // Create the world and player
        world = new World();
        world.loadWorld(worldData);
        player = new Player(name, world.rooms[1]);

        // Show commands
        printHelp();

        rl.question('\nHit RETURN to start your adventure\n', () => {

            console.clear();
            player.currentRoom.printRoom();


            processCommand();
        });
    });
}


function processCommand() {
      if(player.hp <= 0) {
        console.log("GameOver");
        return setTimeout(()=> startGame(), 3000)

      }
    rl.question('> ', (cmd) => {
        cmd = cmd.toLowerCase();

        if (cmd === 'h') {

            printHelp();
            return;

        } else if (cmd === 'q') {
            rl.close();
            return;

        } else if (cmd === 'l') {
            player.currentRoom.printRoom();

        } else if (cmd === 'i') {
            player.printInventory();

        } else if (['n', 's', 'e', 'w'].indexOf(cmd) >= 0) {
            let direction = cmd;
            player.move(direction);

        } else if (cmd.startsWith("take ")) {
            let itemName = cmd.split(" ")[1];

            player.takeItem(itemName);

        } else if (cmd.startsWith("drop ")) {
            let itemName = cmd.split(" ")[1];

            player.dropItem(itemName);

        } else if (cmd.startsWith("eat ")) {
            let itemName = cmd.split(" ")[1];

            player.eatItem(itemName);

        } else if(cmd.startsWith("a ")){
            let weapon = cmd.split(" ")[1];
            player.attackEnimie(weapon)

        }


        else {
            console.log("Invalid command. Type 'h' for help.");
        }

        processCommand();
    });
}

 startGame();







module.exports = {startGame}





