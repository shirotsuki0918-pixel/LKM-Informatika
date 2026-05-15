// CHOICE MODAL
function closeChoice() {
    document.getElementById("choiceModal").style.display = "none";
}

function openChoice() {
    closeLogin();
    document.getElementById("choiceModal").style.display = "flex";
}

function closeCalculator(){
    document.getElementById("calculatorModal").style.display = "none";
}

// CALCULATOR
let display = document.getElementById("display")

function append(value){
    document.getElementById("display").value += value;
}

function clearDisplay(){
    document.getElementById("display").value = "";
}

function calculate(){
    const display = document.getElementById("display");
    try{
        let exp = display.value

        exp = exp.replace(/×/g,"*")
        exp = exp.replace(/÷/g,"/")
        exp = exp.replace(/√/g,"sqrt")

        exp = exp.replace(/(\d)([a-zA-Z])/g,"$1*$2")
        exp = exp.replace(/(\))(\d)/g,"$1*$2")

        let open = (exp.match(/\(/g) || []).length
        let close = (exp.match(/\)/g) || []).length

    while(close < open){
            exp += ")"
            close++
        }

        
        exp = exp.replace(/sin\(([^)]+)\)/g, "sin(($1)*pi/180)")
        exp = exp.replace(/cos\(([^)]+)\)/g, "cos(($1)*pi/180)")
        exp = exp.replace(/tan\(([^)]+)\)/g, "tan(($1)*pi/180)")

        let result = math.evaluate(exp)
        display.value = formatCasio(result)

    }catch(error){
        console.log(error)
        display.value = "Error";
    }

}

function calculateLimit(){

    const expr = document.getElementById("display").value;

    const result = math.limit(expr, 'x', 2);

    document.getElementById("display").value = result;

}

function del(){
    display.value = display.value.slice(0,-1)
}

function formatNumber(num){

    if(Number.isInteger(num)) return num

    let str = num.toString()

    if(str.includes(".")){
        let decimal = str.split(".")[1]

        if(decimal.length > 6){
            return parseFloat(num.toFixed(6))
        }
    }

    return num
}

function formatCasio(num){

    if(!Number.isFinite(num)) return num

    let abs = Math.abs(num)

    // hanya jika angka sangat besar atau kecil
    if(abs >= 1e9 || (abs > 0 && abs < 1e-6)){

        let exp = num.toExponential(4)   // 4 digit desimal
        let parts = exp.split("e")

        let mantissa = parts[0]
        let exponent = parseInt(parts[1])

        return mantissa + " × 10^" + exponent
    }

    return num
}

// CTA BUTTON
const cta = document.getElementById("cta");

if(cta){
    cta.addEventListener("click", function(){
        document.getElementById("calculatorModal").style.display = "flex";
    });
}


// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if(data.success){

    localStorage.setItem("loggedIn","true");
    localStorage.setItem("userEmail", email);

    alert("Login berhasil!");

    window.location.reload();}
    });
}


// LOGIN MODAL
function closeLogin() {
    document.getElementById("loginModal").style.display = "none";
}

function openLogin() {
    document.getElementById("loginModal").style.display = "flex";
}


// REGISTER
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;

        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        alert(data.message);

    });

}


// REGISTER MODAL
function closeRegister() {
    document.getElementById("registerModal").style.display = "none";
}

function openRegister() {
    document.getElementById("registerModal").style.display = "flex";
}