import Utility from "./utility";

class Player {
    public name: string;
    public actions_done: Array<Utility>;
    public total_cost: number;
    public total_water_cost: number;
    public total_actions: number;

    constructor(name: string) {
        this.name = name;
        this.actions_done = [];
        this.total_cost = 0;
        this.total_water_cost = 0;
        this.total_actions = 0;
    }

    addAction(action: Utility) {
        this.actions_done.push(action);
        this.total_cost += action.cost;
        this.total_water_cost += action.waterCost;
        this.total_actions += 1;
    }
}

export default Player;