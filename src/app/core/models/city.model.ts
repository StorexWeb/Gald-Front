export class Common {
    name?: string
    constructor(obj?: CommonInterface) {
        this.name = obj && obj.name || null;
    }
}
export class City {
    name?: string;
    commons?: [Common];
    constructor(obj?: CityInterface) {
        this.name = obj && obj.name || null;
        this.commons = obj && obj.commons || null;
    }
}
export interface CommonInterface {
    name?: string;
}
export interface CityInterface {
    name?: string;
    commons?: [Common];
}

