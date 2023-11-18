const { Room } = require('./room');
const { Item } = require('./item');
const { Food } = require('./food');
const { Enimies } = require('./enimies');
const { Weapon } = require('./weapon');

class World {
    constructor() {
        this.rooms = {};
    }

    loadWorld(worldData) {

        const roomList = worldData.rooms;
        const itemList = worldData.items;
        const enimieslist = worldData.enimies;
        const weaponsList = worldData.weapons;

        // Instantiate new room objects
        // Get name, id and description from room data
        for (let i = 0 ; i < roomList.length ; i++) {

            let roomData = roomList[i];
            let newRoom = new Room(roomData.name, roomData.description);

            this.rooms[roomData.id] = newRoom;
        }

        // Connect rooms by ID
        // Note that all rooms must be created before they can be connected
        for (let i = 0 ; i < roomList.length ; i++) {

            let roomID = roomList[i].id;
            let roomConnections = roomList[i].exits;

            for (const direction in roomConnections) {
                let connectedRoomID = roomConnections[direction];
                let roomToConnect = this.rooms[connectedRoomID];
                this.rooms[roomID].connectRooms(direction, roomToConnect);
            }

        }

        // Instantiate items using data stored in the itemList variable
            // A non-food item should be instantiated as an instance of the `Item` class
            // A food item should be instantiated as an instance of the `Food` class
        for(let itemData of itemList){


            if(itemData.isFood){

              let food = new Food(itemData.name, itemData.description )

            this.rooms[2].items.push(food)


            }
           else if(itemData.isPotion){
                let potion = new Food(itemData.name, itemData.description);

                this.rooms[3].items.push(potion)
             }

            //  if(!(itemData.isFood) || !(itemData.isPotion)){
                else {let item = new Item(itemData.name, itemData.description,  10)

                this.rooms[1].items.push(item)}

            //  }


        }

     //add enimies to world

     for(let enimie of enimieslist){
        let dragon = new Enimies(enimie.name, enimie.description)
        this.rooms[2].enimies.push(dragon)
     }
    // weapons
     for(let weapon of weaponsList){
        if(weapon.name === "winterblade"){
        let sord = new Weapon(weapon.name, weapon.description);
        this.rooms[3].items.push(sord);
        }
     }
    }



}

module.exports = {
  World,
};
