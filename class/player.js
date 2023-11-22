

const { Food } = require('./food');
const { Weapon } = require('./weapon');


class Player   {

    constructor(name, startingRoom, hp = 100) {

        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
        this.hp = hp;

    }

    move(direction) {
//  next room is assigned to the directory the play picks
        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
            // checks if there is an enimie in currentroom
            if (this.currentRoom.enimies.length > 0) {

             // checks what that enimie is and if it is a dragon it attacks you
                if (this.currentRoom.enimies[0].name === "dragon") {

                    console.log(`dragon  has breathed fire, ${this.name}'s hp is now ${this.hp -= 50}`)
                    console.log("use 'a' <weapon> to attack or choose an exit direction to flee")

                }
            }
            // if directory is invalid  log this
        } else {
            console.log("You cannot move in that direction");
        }
    }
  // prints player inventory
    printInventory() {
        //checks if there isnt an item in players inventory
        if (this.items.length === 0) {
            // if no item prints this
            console.log(`${this.name} is not carrying anything.`);
        } // else prints whats carrraying
        else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0; i < this.items.length; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }
 // takes item by the item name
    takeItem(itemName) {
   //  gos through the items in the romms items array
        for (const item of this.currentRoom.items) {
            // checks if the item youre picking is an item in room
            if (itemName === item.name) {
              // adds item into players items array
                this.items.push(item);
                // logs what item youve taken
                console.log(`${this.name} has taken ${itemName}`);
                // takes away item by making the items room array = everything but the item youve taken with filter
                this.currentRoom.items = this.currentRoom.items.filter(currentItem => currentItem !== item);

                return;

            }
        }
     // if the first condition is false this runs.. meaning the item was not in the room
        console.log(`${itemName} not found in the current room.`);



        // Your code here
    }

    dropItem(itemName) {
        // Drops an item the player is holding into their current room
        for (let item of this.items) {

            if (itemName === item.name)

                this.currentRoom.items.push(item)
            console.log(`${this.name} has droped ${itemName}`)
            // uses splice to cut out the item from players items array
            this.items.splice(item, 1)

        }


    }

    eatItem(itemName) {
        // Allow the player to eat food items, but not non-food items

           /// items in invotory
        for (let food of this.items)
              //checks if that item is  a food item
            if (food instanceof Food) {
                // checks if that food item is the one youre looking for  and if its one in inventory
                if (itemName === food.name) {
                  // checks if its a potion youre looking for
                    if (itemName === "potion") {
                        //takes item out of inventory cuasing it to be used
                        this.items.splice(food, 1);
                        // giveing you the benifits of consumed item
                        return console.log(`${this.name} consumed potion, ${this.name}'s hp is now ${this.hp += 50}`)
                    }
                     // if the item is not potion then run this
                     //takes item out of inventory cuasing it to be used
                    this.items.splice(food, 1)
                     // giveing you the benifits of consumed item
                    console.log(`${this.name} ate ${itemName}, ${this.name}'s hp is now ${this.hp += 10}`)
                }
            }  // if the item is not an instance of a food item prints this
            else{
                console.log(`${itemName} is not food `)
            }
        // Your code here
    }

    getItemByName(name) {
        // Retrieves an item from a player's inventory by item name
        for (let item of this.items) {
            if (name === item.name) {
                return item
            }
        }

    }



    // attacks enimies
    attackEnimie(weapon) {
        // if there is enimie in room run code
        if (this.currentRoom.enimies.length > 0) {


            // checking if player has weapon in thier inventory
            for (let weapons of this.items)
                // checking if the item is instance of weapon class or a rock
                if (weapons instanceof Weapon || (weapons.name === "rock")) {
                    // checks to see if the weapon matches an weapon in your inventory
                    if (weapon === weapons.name) {

                      // if it does hits enimie with that weapon taking away the weapons damage from the enimies hp
                     console.log(`${this.name} hit dragon with ${weapon} ${this.currentRoom.enimies[0].name}'s hp
                     is now ${this.currentRoom.enimies[0].hp -= weapons.damage} `)
                      // checks if enimie is defeted
                        if (this.currentRoom.enimies[0].hp <= 0) {
                            console.log(`you have defeted ${this.currentRoom.enimies[0].name}`)
                            // if theyre defeted takes them out of enimies room array
                            this.currentRoom.enimies.splice(0, 1)
                            // runs instance method again
                            return this.attackEnimie(weapon)
                        }

                        let count = 0;
                        // logs a paus as dragon retaliats
                        let intervalId = setInterval(() => {
                            console.log(".");
                             count++;

                            if (count >= 3) {
                                console.log(`${this.currentRoom.enimies[0].name} has retaliated ${this.name}'s hp is now ${this.hp -= 40}`);
                                 // check if players hp is at zero or below
                                if (this.hp <= 0) {
                                    //if hp is below 0 or zero you get a game over causing you to be back at room one
                                 console.log(`${this.name}'s hp is ${this.hp}... you died `)
                                   console.log("GameOver!");
                                  setTimeout(() =>{
                                   this.currentRoom.enimies[0].hp = 100;
                                   this.hp = 100;
                                   this.move("s")}, 3000)
                                };
                                 clearInterval(intervalId)
                            }

                        }, 1000)



                    }
                    // if the weapon you picked isnt a weapon prints this
                } else { console.log("that's not a weapon ") }
        }  // if no enimies prints this
         else { console.log("no enimies to attack.") }

    };


}




module.exports = {
    Player,
};
