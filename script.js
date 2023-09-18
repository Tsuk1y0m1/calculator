const buttons = document.querySelector('.buttons')
const vrt = document.querySelector('.vrt')
const vrb = document.querySelector('.vrb')
const deleteBtn = document.querySelector('.delete')
let a = [];
let b = [];
let znack = null;
const numbers = (".0123456789").split("")
const znacks = ("-+/*").split("") 
let elements = ("789/456*123-.0=+").split("")
elements.forEach((el) => {
  const button = document.createElement('button')
  button.textContent = el
  button.classList.add('button')
  button.id = el
  
  button.addEventListener("click", (e) => {
    if (znack == '='){
      vrb.textContent = ''
      a = []
      znack = null
    }
    if (a.length != 0 && b.length != 0 && (znacks.includes(e.target.id) || (znack != null && e.target.id == '='))){
      if (Array.isArray(a)){a = +a.join('');}
      b = +b.join('');
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
            alert('ERROR')
            a = [];
            znack = null;
          }
          break;
      }
      b = []
      znack = null
      if (e.target.id == '=') {
      znack = '='
      vrb.textContent = a;
      vrt.textContent = ""
      } else {
        vrb.textContent = a;
      }
    // a
    } else if (a.length == 0 || znack == null && numbers.includes(e.target.id)){
      console.log(e.target.id)
      a.push(e.target.id)
      vrb.textContent = a.join("") 
      // znack
    } else if (a.length != 0 && znacks.includes(e.target.id)){
      znack = e.target.id
      vrt.textContent = a.join("") + znack
      // b
    } else if (a.length != 0 && znack != null && numbers.includes(e.target.id)) {
      b.push(e.target.id)
      vrb.textContent = b.join('')
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