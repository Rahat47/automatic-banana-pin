'use strict'
// dom query
const generateButton = document.querySelector('.generate-btn')
const userPin = document.querySelector('.user-pin')
const calcNumbers = document.querySelector('.numbers')
const submitBtn = document.querySelector('.submit-btn')
//Creating a generator class
class Generator {
    constructor() {
        this.generateInput = document.querySelector('.generated-pin')
        this.random = ''
        this.pin = []
        this.userInput = document.querySelector('.user-pin')
        this.error = document.querySelector('.error')
        this.success = document.querySelector('.success')
        this.try = 3
    }
    generatePin() {
        this.random = Math.floor(Math.random() * 10000).toString()
        return this.random
    }
    showPin() {
        this.generatePin()
        if (this.random.length < 4) {
            this.generatePin()
        } else {
            this.generateInput.value = this.random
        }
    }
    getUserPin(e) {
        if (e.target.className === 'button' && this.pin.length < 4) {
            this.pin.push(e.target.innerText)
            this.userInput.value = this.pin.join('')
        } else if (e.target.className === 'button clear') {
            this.pin = []
            this.userInput.value = ''
        } else if (e.target.className === 'button left-arrow') {
            this.pin.pop()
            this.userInput.value = this.pin.join('')
        }
    }
    validate() {
        if (this.random == 0 || !this.random) {
            this.error.textContent = `❌ Generate a pin first`
            this.error.classList.remove('show')
            this.success.classList.remove('show')
            this.error.classList.add('show')
            setTimeout(() => {
                this.error.classList.remove('show')
            }, 3000)
            return
        }
        if (this.random == Number(this.pin.join('')) && this.try > 0) {
            this.validateTry()
            this.success.classList.add('show')
            setTimeout(() => {
                this.success.classList.remove('show')
            }, 3000)
        } else {
            this.error.textContent = `❌ Pin Didn't Match, Please try again`
            this.validateTry()
            this.error.classList.add('show')
            setTimeout(() => {
                this.error.classList.remove('show')
            }, 3000)
        }
    }
    validateTry() {
        if (this.random != Number(this.pin.join('')) && this.try >= 1) {
            this.try--
            document.querySelector('.try').textContent = this.try
        } else if (this.try == 0) {
            this.error.textContent = "❌ No more tries left. You are shut down forever"
            this.error.classList.add('show')
            setTimeout(() => {
                this.error.classList.remove('show')
            }, 3000)
        }
    }
}

const generator = new Generator()

generateButton.addEventListener('click', () => {
    generator.showPin()
})
calcNumbers.addEventListener('click', e => {
    generator.getUserPin(e)
})
submitBtn.addEventListener('click', () => {
    generator.validate()
})