
function getComputerChoice(){
let tab = ['rock', 'paper', 'scissors'];
let index = Math.floor(Math.random()*tab.length);
let resultat = tab [index];

}
function playRound(playerSelection, computerSelection){
    if(computerSelection == "rock" && playerSelection == "scissors") {
      return "You lose !"
    } else if(computerSelection == "rock" && playerSelection == "paper") {
      return  "You win !"
    } else if(computerSelection == "paper" && playerSelection == "scissors") {
      return  "You win !"
    } else if(computerSelection == "paper" && playerSelection == "rock") {
      return "You lose !"
    } else if(computerSelection == "scissors" && playerSelection == "paper") {
      return "You lose !"
    } else if(computerSelection == "scissors" && playerSelection == "rock") {
      return  "You win !"
    } 
    else if(computerSelection == playerSelection) {
      return ( "No winner !")
    } 
      else return ("Invalid choice !!")
  }