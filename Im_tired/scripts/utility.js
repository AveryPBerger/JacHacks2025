"use strict";
class Utility{

    constructor(id, name, cost, description,water_cost){
        this.id = id;
        this.waterCost = water_cost;
        this.name = name;
        this.cost = cost;
        this.description = description;
    }

    getInfo(){
        return `Name: ${this.name}, Cost: ${this.cost}, Description: ${this.description}`;
    }
}

export default Utility;