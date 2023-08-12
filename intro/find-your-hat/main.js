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

  static generateField(width = 2, height = 3) {
    let newField = [];
    for (let i = 0; i < height; i++) {
      newField.push([]);
      for (let j = 0; j < width; j++) {
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
        this._nextPosition = {
          x: this._currentPosition.x,
          y: this._currentPosition.y + 1,
        };
        this.checkMove();
        break;
      case "D":
        this._nextPosition = {
          x: this._currentPosition.x,
          y: this._currentPosition.y - 1,
        };
        this.checkMove();
        break;
      case "L":
        this._nextPosition = {
          x: this._currentPosition.x - 1,
          y: this._currentPosition.y,
        };
        this.checkMove();
        break;
      case "R":
        this._nextPosition = {
          x: this._currentPosition.x + 1,
          y: this._currentPosition.y,
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
      this.fieldArr[this._currentPosition.x][this._currentPosition.y];
    switch (proposedLocationSymbol) {
      case undefined:
        console.log("You moved off the board, please try again.");
        break;
      case hat:
        this._currentPosition = this._nextPosition;
        this._gameStatus = "won";
        break;
      case fieldCharacter:
        this._currentPosition = this._nextPosition;
        // fix this, and always start star in corner
        this.fieldArr[this._currentPosition.x][this._currentPosition.y] =
          pathCharacter;
        this._gameStatus = "playing";
        break;
      case hole:
        this._currentPosition = this._nextPosition;
        this._gameStatus = "lost";
        break;
      default:
        break;
    }
  }
}

const playGame = () => {
  const width = prompt("How wide would you like your board? ");
  const height = prompt("How high would you like your board? ");
  const newFieldArray = Field.generateField(width, height);
  const newField = new Field(newFieldArray);
  console.log("Your new board:");
  newField.print();
  while (newField.gameStatus == "playing") {
    const moveSelection = prompt("What is your next move?: ");
    newField.navigate(moveSelection);
    newField.print();
  }
};

/*const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);*/

playGame();
