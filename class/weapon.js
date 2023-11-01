const { Item } = require("./item");



class Weapon extends Item {
    constructor(name, description, damage = 50,){
       super(name, description)

        this.damage =damage;



    }
}
module.exports ={
    Weapon,
}
