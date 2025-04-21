class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;
    constructor(carDetails) {
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
    }
    displayInfo() {
        console.log(`${this.#brand} ${this.#model},Speed ${this.speed} Km/h
            Is Trunk Open ? ${this.isTrunkOpen}.
            `)
    }
    go() {

        if (this.speed + 5 <= 200 && this.isTrunkOpen === false) { this.speed += 5; }
    }
    brake() {
        if (this.speed - 5 >= 0) { this.speed -= 5; }
        // or
        // this.speed-=5;
        // if(this.speed<0){this.speed=0;}
    }
    openTrunk() {
        this.isTrunkOpen = true;
        if (this.speed > 0) { this.isTrunkOpen = false; }
    }
    closeTrunk() {
        thiss.isTrunkOpen = false;
    }
}

class RaceCar extends Car {
    acceleration;
    constructor(carDetails) {
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }
    go() {
        // super.go();
        this.speed += this.acceleration;
        if (this.speed > 300) { this.speed = 300; }
    }
    isTrunkOpen = 'Do not have'
}

const race1 = new RaceCar({
    brand: 'Porche',
    model: '2020',
    acceleration: 18
});
race1.go();
race1.go();
race1.go();
race1.brake();
race1.brake();
race1.displayInfo();
const car1 = new Car({
    brand: 'Toyota',
    model: 'Corolla'
});
const car2 = new Car({
    brand: 'Tesla',
    model: '#model 3'
})
// console.log(car1.displayInfo());
// console.log(car2.displayInfo());
// car2.go();
// car2.go();
// car2.go();
// car2.brake();
// car1.go();
// car1.go();
// car1.go();
// car1.go();
// car1.go();
// car1.go();
car1.go();
// car1.openTrunk();
// car2.openTrunk();
car1.displayInfo();
// car2.displayInfo();