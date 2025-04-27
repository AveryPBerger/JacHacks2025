let _id:number = 0;
class Utility{
    public id: number;
    public name: string;
    public cost: number;
    public description: string;
    public waterCost: number;

    constructor(name:string, cost:number, description:string,water_cost:number){
        this.id = _id;
        this.waterCost = water_cost;
        this.name = name;
        this.cost = cost;
        this.description = description;
        _id += 1;
    }

    getInfo(){
        return `Name: ${this.name}, Cost: ${this.cost}, Description: ${this.description}`;
    }
}

export default Utility;