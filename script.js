// Arrays containing alphanumeric characters
const uppercaseChar = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q","R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const lowercaseChar = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const numbersChar = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbolsChar = ["~", "!", "@", "#", "$", "%", "¬", "`", "^", "&", "*", "(", ")", "_", "+", "-", "=", "{", "}", "|", "[", "]", ":",'"', "'", ";", "<", ".", "?", ",", ".", "/"];
const selectedCheckboxes = []
const totalChar = []
const displayedChar = []

// DOM elements
const passwordDisplayInput = document.getElementById("password-display-input");
const copyBtn = document.getElementById("copy-btn");
const resetBtn = document.getElementById("reset-btn");
const characterCount = document.getElementById("character-count");
const slider = document.getElementById("slider");
const checkboxes = document.querySelectorAll("input[type='checkbox']");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");


const barBackground = document.getElementById("rule")
const bar = document.getElementById("bar")
const shieldIcon = document.querySelector(".shield-icon");
const strength = document.getElementById("strength");


// Changes the  Fill of the password's strength  
function changeBar () {
    const barWidth = (slider.value/20) * 700;
    bar.style.width = `${barWidth}px`;

    if (slider.value < 7) {
        bar.style.background = "#D71340";
        shieldIcon.style.color= "#D71340";
        strength.style.color= "#D71340";
        strength.textContent = "Weak"
        
    } 
    
    else if (slider.value <= 9) {
        bar.style.background = "#B65E11";
        shieldIcon.style.color = "#B65E11";
        strength.style.color = "#B65E11";
        strength.textContent = "Average";
    }
    
    else {
        bar.style.background = "#31572c";
        shieldIcon.style.color = "#31572c";
        strength.style.color = "#31572c";
        strength.textContent = "Strong";
        
    }
};

// charMap for mapping the character's arrays to totalChar
const charMap = {
    uppercase: uppercaseChar,
    lowercase: lowercaseChar,
    numbers: numbersChar,
    symbols: symbolsChar
};

// Looping through the checkboxes in the DOM
checkboxes.forEach((checkbox) => {
    
    checkbox.addEventListener("change", () => getCheckedOptions(selectedCheckboxes))
});

// Updating the generated array corresponding to the checked checkboxes
function displayPassword () {
    
    function getCheckedOptions(selectedArray) {
        selectedArray.length = 0; // clear the existing array
    
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                selectedArray.push(checkbox.id);
            }
        });
        
        getTotalCharacters(totalChar);
    }
    
    // Mapping the checkboxes' id in the array to a general array 
    function getTotalCharacters (array) {
        array.length = 0;
    
        selectedCheckboxes.forEach(checkboxId => {
            array.push(...charMap[checkboxId]);
        });
    
        if (array.length === 0) {
            alert("You have to choose some characters!");
            checkboxes.forEach((checkbox) => checkbox.checked = true);
            slider.value = 0;

            passwordDisplayInput.value = "";
            characterCount.textContent = slider.value;
        }
        displayChar(displayedChar)
        changeBar();
    }
    
    function displayChar(array) {
        
        for (i=0; i < slider.value; i++) {
    
            const index = Math.floor(Math.random() * totalChar.length)
            passwordDisplayInput.value += totalChar[index];
            
            array.length = 0;
        }
    }

    passwordDisplayInput.value = "" 
    getCheckedOptions(selectedCheckboxes)

    
}

// Gaining access to the slider value 
characterCount.textContent = slider.value;

slider.addEventListener ("input", (e) => {
    characterCount.textContent = e.target.value;
    passwordDisplayInput.value = ""
    displayPassword()
})

// Resetting the display when there is change in the DOM - ie, when the value of the a checkbox are changed
uppercase.addEventListener("change", () => {
    displayedChar.length = 0;
    displayPassword();
}) 

lowercase.addEventListener("change", () => {
    displayedChar.length = 0;
    displayPassword();
}) 

numbers.addEventListener("change", () => {
    displayedChar.length = 0;
    displayPassword();
}) 

symbols.addEventListener("change", () => {
    displayedChar.length = 0;
    displayPassword();
}) 

// Copies password to clipboard
copyBtn.addEventListener("click", () => {
    const targetElement = document.querySelector(copyBtn.dataset.copy);
    const passwordToCopy = targetElement.value
    
    navigator.clipboard.writeText(passwordToCopy).then(() => {
        const copyIcon = copyBtn.querySelector(".copy-icon");

        copyIcon.classList.remove("fa-regular")
        copyIcon.classList.add("fa-solid")

        copyIcon.classList.remove("fa-copy")
        copyIcon.classList.add("fa-check")
        copyIcon.classList.add("disable")
    })
})

// Resets the displayed password
resetBtn.addEventListener ("click", () => {
    displayedChar.length = 0;
    displayPassword();
    
    const copyIcon = copyBtn.querySelector(".copy-icon");
    copyIcon.classList.add("fa-regular")
    copyIcon.classList.remove("fa-solid")
    
    copyIcon.classList.add("fa-copy")
    copyIcon.classList.remove("fa-check")
    copyIcon.classList.remove("disable")
});





