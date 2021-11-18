function openWin() {
  myWindow = window.open("https://eyeris-who.github.io/rickroll.html", "_self");
  setTimeout(function(){ myWindow.close(); }, 1000);
}

function myFunction() {
  let text;
  let person = prompt("Please enter the password:", "");
  if (person == null || person == "") {
    text = "Too scared to guess the password?";
  } else if (person == "iris is so hot and tall and smart") {
  window.location = 'https://eyeris-who.github.io/information.html';
   text = "I know I am :)";
  } else {
    text = "Get rekt lmao.";
    openWin();
  }
  document.getElementById("demo").innerHTML = text;
}
