var password = "";
var passwords=["No risk no fun", "You only live once", "Actions speak louder than words", "Better late than never", "Practice makes perfect", "You cannot always get what you want","I am not that creative to make more passwords now"];
var randomPasswordFromArray = Math.floor(Math.random() * 7);
password = passwords[randomPasswordFromArray];

password = password.toUpperCase();

var tries = 0;

var passwordHidden = "";

for (i = 0; i < password.length; i++) {
    if (password.charAt(i) == " ") {
        passwordHidden = passwordHidden + " ";
    }
    else {
        passwordHidden = passwordHidden + "-";
    }
}

function writePassword() {
    document.getElementById("board").innerHTML = passwordHidden;
}

window.onload = writeAlphabet;

var letters = new Array(26);

for (i = 0; i < 26; i++) {
    letters[i] = String.fromCharCode(65 + i);
}

function writeAlphabet() {
    var divContent = "";
    for (i = 0; i < 26; i++) {
		
        var element = "myLetter" + i;
        divContent = divContent + '<div class = "letter" onclick = "checkLetter(' + i + ')" id = "' + element + '">' + letters[i] + '</div>';

        if ((i + 1) % 7 == 0) {
            divContent = divContent + '<div style = "clear:both;"></div>';
        }
    }
    document.getElementById("alphabet").innerHTML = divContent;
    writePassword();
    counter();

}

String.prototype.changeMyLetter = function (position, letter) {
    if (position > this.length - 1) {
        return this.toString();
    }
    else return this.substr(0, position) + letter + this.substr(position + 1);
}

function checkLetter(nr) {
    
    var checked = false;
    for (i = 0; i < password.length; i++) {
        if (password.charAt(i) == letters[nr]) {
            passwordHidden = passwordHidden.changeMyLetter(i, letters[nr]);
            checked = true;
        }
    }

    if (checked == true) {
        var element = "myLetter" + nr;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";
        writePassword();
    }
    else {
        var element = "myLetter" + nr;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).onclick = "false";
        tries++;
        counter();
        var picture = "data/s" + tries + ".jpg";
        document.getElementById("hanger").innerHTML = '<img src="' + picture + '" alt="' + picture + '"/>';

    }


    //winning
    if(password == passwordHidden){
        document.getElementById("alphabet").innerHTML = "You won! The password was: " + password + '<br><br><span class="reset" onclick = "location.reload()">Again?</span>';
    }

    //loosing
    if (tries >= 9){
        document.getElementById("alphabet").innerHTML = "You lost.. " +"<br> The password was: " + password + '<br><br><span class="reset" onclick = "location.reload()">Again?</span>';
    }

}

function counter(){
    var triesLeft;
    triesLeft = 9-tries;
    document.getElementById("counter").innerHTML = "Tries left: " + triesLeft;
}