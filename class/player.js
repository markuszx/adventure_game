
const { Food } = require('./food');
const { Weapon } = require('./weapon');

class Player {

    constructor(name, startingRoom, hp = 100) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
        this.hp = hp;

    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
            if (this.currentRoom.enimies.length > 0) {


                if (this.currentRoom.enimies[0].name === "dragon") {

                    console.log(`dragon  has breathed fire, ${this.name}'s hp is now ${this.hp -= 50}`)
                    console.log("use 'a' <weapon> to attack or choose an exit direction to flee")
                    if (this.hp <= 0) {
                        throw new Error("GameOver!")
                    }
                }
            }
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0; i < this.items.length; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        // Picks up an item from the current room into the player's inventory

        for (let item of this.currentRoom.items) {
            if (itemName === item.name)

                this.items.push(item)
            console.log(`${this.name} has taken ${itemName}`)
            this.currentRoom.items.splice(item, 1)

        }



        // Your code here
    }

    dropItem(itemName) {
        // Drops an item the player is holding into their current room
        for (let item of this.items) {
            if (itemName === item.name)

                this.currentRoom.items.push(item)
            console.log(`${this.name} has droped ${itemName}`)
            this.items.splice(item, 1)

        }


    }

    eatItem(itemName) {
        // Allow the player to eat food items, but not non-food items
        for (let food of this.items)
       /// items in invotory
            if (food instanceof Food) {
                if (itemName === food.name ) {

                    if(itemName === "potion"){
                    this.items.splice(food, 1);
                     return console.log(`${this.name} consumed potion, ${this.name}'s hp is now ${this.hp +=50}`)
                   }

                    this.items.splice(food, 1)
                    console.log(`${this.name} ate ${itemName}, ${this.name}'s hp is now ${this.hp += 10}`)
                }
            }else {
                console.log(`${itemName} is not food ` )
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
            // checking if the item is instance of weapon class
                if (weapons instanceof Weapon || (weapons.name === "rock")) {
                // if the weapon youre using
                    if (weapon === weapons.name) {


                        console.log(`${this.name} hit dragon with ${weapon} ${this.currentRoom.enimies[0].name}'s hp
                     is now ${this.currentRoom.enimies[0].hp -= weapons.damage} `)

                        if (this.currentRoom.enimies[0].hp <= 0) {
                            console.log(`you have defeted ${this.currentRoom.enimies[0].name}`)
                            this.currentRoom.enimies.splice(0, 1)
                            return this.attackEnimie(weapon)
                        }
                        setTimeout(() => {
                            console.log(".")
                        }, 1000);
                        setTimeout(() => {
                            console.log(".")
                        }, 2000);
                        setTimeout(() => {
                            console.log(".")
                        }, 3000);
                        setTimeout(() => {
                            console.log(`${this.currentRoom.enimies[0].name} has retaliated ${this.name}'s hp is now ${this.hp -= 40}`)
                        }, 4000);

                       setTimeout(() =>{if (this.hp <= 0) {
                         console.log(`${this.name}'s hp is ${this.hp}... you died `)
                            throw new Error("GameOver!");


                        }}, 5000)

                    }
                }else{console.log("thats not a weapon ")}
        }else { console.log("no enimies to attack.") }

    };


}




module.exports = {
    Player,
};
