const prompt = require('prompt-sync')({
    sigint: true
});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {

    constructor(field = [
        []
    ]) {
        this.field = field;
        this.positionX = 0;
        this.positionY = 0;
        this.field[0][0] = pathCharacter;
    }

    playGame() {
        let playing = true;
        while (playing) {
            this.print();
            this.askQuestion();
            if (!this.inBounds()) {
                console.log('Out of bounds instruction!');
                playing = false;
                break;
            } else if (this.isHole()) {
                console.log('Sorry, you fell down a hole!');
                playing = false;
                break;
            } else if (this.isHat()) {
                console.log('Congrats, you found your hat!');
                playing = false;
                break;
            }
            this.field[this.positionY][this.positionX] = pathCharacter;
        }
    }

    askQuestion() {
        const answer = prompt('Which way? ').toUpperCase();
        switch (answer) {
            case 'U':
                this.positionY -= 1;
                break;
            case 'D':
                this.positionY -= 1;
                break;
            case 'L':
                this.positionX -= 1;
                break;
            case 'R':
                this.positionX -= 1;
                break;
            default:
                console.log('Enter U, D, L or R.');
                this.askQuestion();
                break;
        }
    }

    inBounds() {
        return (
            this.positionY >= 0 &&
            this.positionX >= 0 &&
            this.positionY < this.field.length &&
            this.positionX < this.field[0].length
        );
    }

    isHat() {
        return this.field[this.positionY][this.positionX] === hat;
    }

    isHole() {
        return this.field[this.positionY][this.positionX] === hole;
    }

    print() {
        const show = this.field.map(row => {
            return row.join('');
        }).join('\n');
        console.log(show);
    }

    static generateField(height, width, percentage = 0.1) {
        const field = new Array(height).fill(0).map(el => new Array(width));
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const p = Math.random();
                field[y][x] = p > percentage ? fieldCharacter : hole;
            }
        }
        const hatLocation = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        };
        while (hatLocation.x === 0 && hatLocation.y === 0) {
            hatLocation.x = Math.floor(Math.random() * width);
            hatLocation.y = Math.floor(Math.random() * height);
        }
        field[hatLocation.y][hatLocation.x] = hat;
        return field;
    }

}

const myfield = new Field(Field.generateField(10, 10, 0.2));
myfield.runGame();