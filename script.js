const buttons = document.querySelector('.buttons')
const vrt = document.querySelector('.vrt')
const vrb = document.querySelector('.vrb')
const deleteBtn = document.querySelector('.delete')


let a = [];
let b = [];
let znack = null;
const numbersPoint = (".0123456789").split("")
const znacks = ("-+/*").split("") 
let elements = ("789/456*123-.0=+").split("")

const outputAndCheckPoint = (array, value) => {
  if (!array.length && value == '.'){
    array.push(0, value)
    vrb.textContent = array.join("") 
  }else {
    array.push(value)
    vrb.textContent = array.join("")
  }
}
elements.forEach((el) => {
  const button = document.createElement('button')
  button.textContent = el
  button.classList.add('button')
  button.id = el
  
  button.addEventListener("click", (e) => {
    if (znack == '=' || a == 'ERROR'){
      vrb.textContent = ''
      a = []
      znack = null
    }
    if (a.length != 0 && b.length != 0 && (znacks.includes(e.target.id) || (znack != null && e.target.id == '='))){
      if (Array.isArray(a)){a = +a.join('');}
      b = +b.join('');
      vrt.textContent = a + znack + b;
      switch (znack) {
        case '+' :
          a = a + b
          break;
        case '-' :
          a = a - b
          break;
        case '*' :
          a = a * b
          break;
        case '/' :
          if (b != 0){
          a = a / b
          } else {
            a = 'ERROR';
            znack = null;
          }
          break;
      }
      a = +a.toFixed(5)
      b = []
      znack = e.target.id
      if (znack == '=') {
      znack = '='
      vrb.textContent = a;
      vrt.textContent = ""
      } else {
        if (a == 'ERROR') {
          vrb.textContent = 0;
        } else {
          vrb.textContent = a;
        }
      }
    // a
    } else if ((znack == null && numbersPoint.includes(e.target.id)) ||
    (a.length == 0 && e.target.id == '-') || (e.target.id == '.' && 
    !a.filter((el) => el == ".").reduce((total, next) => total + 1, 0))){
      outputAndCheckPoint(a, e.target.id)
      // znack
    } else if (a.length != 0 && znacks.includes(e.target.id)){
      znack = e.target.id
      vrt.textContent = a.join("") + znack
      // b
    } else if ( a.length != 0 && znack != null && (numbersPoint.includes(e.target.id) ||
    (b.length == 0 && e.target.id == '-') || (e.target.id == '.' && 
    !b.filter((el) => el == ".").reduce((total, next) => total + 1, 0))) ){
      outputAndCheckPoint(b, e.target.id)
    }
  }
  ) 

  buttons.appendChild(button)
} 
)

// delete
deleteBtn.addEventListener('click', (e) => {
  a = []
  b = []
  znack = null
  vrb.textContent = 0
  vrt.textContent = ''
})