"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(name) {
        this.name = name;
        this.actions_done = [];
        this.total_cost = 0;
        this.total_water_cost = 0;
        this.total_actions = 0;
    }
    Player.prototype.addAction = function (action) {
        this.actions_done.push(action);
        this.total_cost += action.cost;
        this.total_water_cost += action.waterCost;
        this.total_actions += 1;
    };
    return Player;
}());
// exports.default = Player;

export default Player;