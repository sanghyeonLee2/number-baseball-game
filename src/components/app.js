const inputForm = document.getElementById("input-form");
const input = document.querySelector("#input-form input");
const userNumElement = document.getElementById("userNum");
const cpuNumElement = document.getElementById("cpuNum");
const strikeElement = document.getElementById("strike");
const ballElement = document.getElementById("ball");
const nothingElement = document.getElementById("nothing");

class NumberJudgment {
  constructor(num) {
    this.num = num;
  }

  firstValue = null;
  secondValue = null;
  thirdValue = null;
  cpuNumArr = null;
  strike = 0;
  ball = 0;

  cpuFirstNum() {
    return (this.firstValue = Math.floor(Math.random() * 9) + 1);
  }

  cpuSecondNum() {
    let secondNum = Math.floor(Math.random() * 9) + 1;
    while (this.firstValue === secondNum) {
      secondNum = Math.floor(Math.random() * 9) + 1;
    }
    return (this.secondValue = secondNum);
  }

  cpuThirdNum() {
    let thirdNum = Math.floor(Math.random() * 9) + 1;
    while (this.secondValue === thirdNum || this.firstValue === thirdNum) {
      console.log(
        `this first : ${this.firstValue}, this second:${this.secondValue}, this third:${thirdNum}`
      );
      thirdNum = Math.floor(Math.random() * 9) + 1;
    }
    return (this.thirdValue = thirdNum);
  }

  cpu() {
    const cpuArr = [
      this.cpuFirstNum(),
      this.cpuSecondNum(),
      this.cpuThirdNum(),
    ];
    console.log(cpuArr);
    return cpuArr;
  }

  userInfo(userNum, userNumIdx) {
    this.cpuNumArr.forEach((cpuNum, cpuNumidx) => {
      if (userNum === cpuNum && userNumIdx === cpuNumidx) {
        this.strike++;
      } else if (userNum === cpuNum && userNumIdx !== cpuNumidx) {
        this.ball++;
      }
    });
  }

  judgment() {
    this.strike = 0;
    this.ball = 0;
    let nothing = false;
    this.cpuNumArr = this.cpu();
    const numArr = Array.from(this.num).map(Number);
    numArr.forEach((userNum, userNumIdx) => {
      this.userInfo(userNum, userNumIdx);
    });

    if (this.strike === 0 && this.ball === 0) {
      nothing = true;
    }

    console.log(
      `cpu숫자는${this.cpuNumArr.join("")}, user숫자는${numArr.join(
        ""
      )} strike는${this.strike} ball은 ${this.ball}`
    );
    const result = {
      cpuNum: this.cpuNumArr.join(""),
      userNum: numArr.join(""),
      strike: this.strike,
      ball: this.ball,
      nothing,
    };
    return result;
  }
}

const handleSubmit = (e) => {
  e.preventDefault();
  const inputValue = input.value.trim();

  if (exceptionHandling(inputValue)) {
    return;
  }

  const gameStart = new NumberJudgment(inputValue);
  const result = gameStart.judgment();
  input.value = "";
  resultView(result);
};

const resultView = (result) => {
  cpuNumElement.innerText = `컴퓨터 숫자 : ${result.cpuNum}`;
  userNumElement.innerText = `유저 숫자 : ${result.userNum}`;
  strikeElement.innerText = `스트라이크 : ${result.strike}`;
  ballElement.innerText = `볼 : ${result.ball}`;
  result.nothing
    ? (nothingElement.innerText = "낫싱입니다")
    : (nothingElement.innerText = "");
  if (result.strike === 3) {
    nothingElement.innerText = "3개의 숫자를 모두 맞히셨습니다 게임종료";
    return;
  }
};

const exceptionHandling = (inputValue) => {
  if (inputValue.length !== 3) {
    alert("3자리 숫자를 입력해 주세요");
    input.value = "";
    return true;
  }
  if (inputValue.includes("0")) {
    alert("0은 포함할 수 없습니다");
    input.value = "";
    return true;
  }
  if (isNaN(inputValue)) {
    alert("숫자 3자리를 입력해 주세요");
    return true;
  }
};

inputForm.addEventListener("submit", handleSubmit);
