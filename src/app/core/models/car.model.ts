export class Car {
    brand?: string;
    models?: [string];
    constructor(obj?: CarInterface) {
        this.brand = obj && obj.brand || null;
        this.models = obj && obj.models || null;
    }
}

export interface CarInterface {
    brand?: string;
    models?: [string];
}

