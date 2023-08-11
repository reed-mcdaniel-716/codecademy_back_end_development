const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(fieldArr) {
    this.fieldArr = fieldArr;
    this._currentPosition = { x: 0, y: 0 };
    this._nextPosition = { x: 0, y: 0 };
    this._gameStatus = "playing";
  }

  get currentPosition() {
    return this._currentPosition;
  }

  get gameStatus() {
    return this._gameStatus;
  }

  static generateField(height = 2, width = 3) {
    let newField = [];
    for (let i = 0; i < width; i++) {
      newField.push([]);
      for (let j = 0; j < height; j++) {
        newField[i][j] = fieldCharacter;
      }
    }

    // make 20% of the spaces holes
    let numHoles = Math.floor(0.2 * height * width);

    while (numHoles > 0) {
      const randomX = Math.floor(Math.random() * width);
      const randomY = Math.floor(Math.random() * height);
      // don't want them to win or lose automatically
      if (randomX !== 0 && randomY !== 0) {
        if (numHoles == 1) {
          newField[randomX][randomY] = hat;
          numHoles--;
        } else {
          newField[randomX][randomY] = hole;
          numHoles--;
        }
      }
    }
    return newField;
  }

  print() {
    for (const row in this.fieldArr) {
      console.log(this.fieldArr[row].join(" "));
    }
  }

  navigate(nextMove) {
    switch (nextMove) {
      case "U":
        this.nextPosition = {
          x: this.currentPosition.x,
          y: this.currentPosition.y + 1,
        };
        this.checkMove();
        break;
      case "D":
        this.nextPosition = {
          x: this.currentPosition.x,
          y: this.currentPosition.y - 1,
        };
        this.checkMove();
        break;
      case "L":
        this.nextPosition = {
          x: this.currentPosition.x - 1,
          y: this.currentPosition.y,
        };
        this.checkMove();
        break;
      case "R":
        this.nextPosition = {
          x: this.currentPosition.x + 1,
          y: this.currentPosition.y,
        };
        this.checkMove();
        break;
      default:
        console.log("Not a viable move, please try again.");
        break;
    }
  }

  checkMove() {
    const proposedLocationSymbol =
      this.fieldArr[this.currentPosition.x][this.currentPosition.y];
    switch (proposedLocationSymbol) {
      case undefined:
        console.log("You moved off the board, please try again.");
        break;
      case hat:
        this.currentPosition = this.nextPosition;
        this.gameStatus = "won";
        break;
      case fieldCharacter:
        this.currentPosition = this.nextPosition;
        this.fieldArr[this.currentPosition.x][this.currentPosition.y] =
          pathCharacter;
        this.gameStatus = "playing";
        break;
      case hole:
        this.currentPosition = this.nextPosition;
        this.gameStatus = "lost";
        break;
      default:
        break;
    }
  }
}

const playGame = () => {
  const moveSelection = prompt("What is your next move?: ");
};

/*const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);*/

const newFieldArray = Field.generateField(3, 4);
const newField = new Field(newFieldArray);
newField.print();
