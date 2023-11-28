
const prompt = require('prompt-sync')();

class Hospital {
    constructor() {
        // Initial room and resource quantities
        this.rooms = { Normal: 50, Oxygen: 50, ICU: 20 };
        this.beds = { Flat: 80, Recliner: 100 };
        this.equipments = { Ventilator: 16, 'Oxygen Cylinder': 110, 'Normal Masks': 200, 'Non rebreather masks': 120 };
    }

    reserveRoom(roomType) {
        if (!(roomType in this.rooms) || this.rooms[roomType] === 0) {
            console.log(`Sorry, no ${roomType} rooms available.`);
            this.displayAvailability();
            return;
        }

        // Check if there are enough resources for the selected room type
        if (this.checkResources(roomType)) {
            // Reserve the room
            this.rooms[roomType] -= 1;
            console.log(`01 ${roomType} room reserved.`);
            this.displayAvailability();
        } else {
            console.log(`Sorry, not enough resources for ${roomType} room reservation.`);
            this.displayAvailability();
        }
    }

    checkResources(roomType) {
        // Define resource requirements for each room type
        const requirements = {
            Normal: { 'Flat Beds': 1, 'Normal Masks': 2 },
            Oxygen: { 'Oxygen Cylinders': 2, 'Recliner Beds': 1, 'Non rebreather masks': 2 },
            ICU: { Ventilators: 1, 'Recliner Beds': 1, 'Oxygen Cylinders': 1 },
        };

        // Check if there are enough resources for the selected room type
        for (const [resource, quantity] of Object.entries(requirements[roomType])) {
            if (this.equipments[resource] < quantity) {
                return false;
            }
        }
        return true;
    }

    displayAvailability() {
        console.log('Remaining availability:');
        for (const [roomType, quantity] of Object.entries(this.rooms)) {
            console.log(`${roomType} Rooms: ${quantity}`);
        }
        for (const [bedType, quantity] of Object.entries(this.beds)) {
            console.log(`${bedType} Beds: ${quantity}`);
        }
        for (const [equipment, quantity] of Object.entries(this.equipments)) {
            console.log(`${equipment}: ${quantity}`);
        }
    }
}

// Example usage
const hospital = new Hospital();

while (true) {
    const roomType = prompt("Please enter the type of room you want to reserve (or 'exit' to quit): ");

    if (roomType.toLowerCase() === 'exit') {
        break;
    }

    hospital.reserveRoom(roomType);
}