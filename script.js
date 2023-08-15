let currentPlayer = "X";
let playerName = "User";
let movesLeft = 6;
let selectedCell = null;
var calcTime;

    function setMessage(message) {
      $(".message").text(message).css("transform", "scale(1)").fadeIn();
    }

    function checkWin() {
      const cells = $(".cell");
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
          $(cells[a]).text() === $(cells[b]).text() &&
          $(cells[b]).text() === $(cells[c]).text() &&
          $(cells[a]).text() !== ""
        ) {
          return true;
        }
      }
      
      return false;
    }

    function cellClicked(index) {
      disableClicks();
      const cell = $(".cell")[index];
      if (movesLeft === 0) {
         if (selectedCell === null && $(cell).html() !== "" && $(cell).html() === "X") {
            // If the cell is already occupied, allow switching moves
          selectedCell = cell;
          $(cell).addClass("active");
          enableClicks();
        } else if (selectedCell !== null && $(cell).text() === "") {
          // If the destination cell is empty, switch moves
          $(cell).text($(selectedCell).text());
          $(cell).attr("class", $(selectedCell).attr("class")).removeClass("active");
          $(selectedCell).text("");
          $(selectedCell).attr("class", "cell");
          // $(selectedCell).css("background-color", "#7d26cd");
          selectedCell = null;

          if (checkWin()) {
            setMessage(playerName + " wins!");
            disableCells();
          } 
          else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            playerName = (playerName === "User") ? "Computer" : "User";
            let nextMove = computerChangeMove();
            delayComputer(nextMove);
          }
        } else if(selectedCell !== null && cell === selectedCell){
          selectedCell = null;
          $(cell).attr("class", "cell");
          enableClicks();
        } else {
          enableClicks();
        }
      }else{
        if (selectedCell === null && $(cell).text() === ""){
          //at the beginning
            $(cell).text(currentPlayer);
           
            if (checkWin()) {
              setMessage(playerName + " wins!");
              disableCells();
            }else{
              currentPlayer = (currentPlayer === "X") ? "O" : "X";
              playerName = (playerName === "User") ? "Computer" : "User";
              movesLeft--;
  
              let computer = computerFirstMove(); 
              delayComputer(computer);
            }
        }
      }
    }

    function delayComputer(number){
      let interval = Math.floor(Math.random() * 4) + 1;
      $(".message").hide().text("Thinking...").css("transform", "scale(0.7)").fadeIn();
      calcTime = setTimeout(function(){
              $(".message").fadeOut();
              playComputer(number);
            }, interval*1000);
    }

    function playComputer(index){
      const cell = $(".cell")[index];
      if (movesLeft === 0) {
        if (selectedCell === null && $(cell).text() !== "" && $(cell).text() === "O") {
          // If the cell is already occupied, allow switching moves
          selectedCell = cell;
          $(cell).addClass("active");
          playComputer(computerFirstMove());
        } else if (selectedCell !== null && $(cell).text() === "") {
          // If the destination cell is empty, switch moves
          $(cell).text($(selectedCell).text());
          $(cell).attr("class", $(selectedCell).attr("class")).removeClass("active");
          $(selectedCell).text("");
          $(selectedCell).attr("class", "cell");
          selectedCell = null;

          if (checkWin()) {
            setMessage(playerName + " wins!");
            disableCells();
          } 
          else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            playerName = (playerName === "User") ? "Computer" : "User";
          }
        } 
      }else{
        if(selectedCell === null && $(cell).text()=== ""){
          // alert("computer about to play");
          $(cell).text(currentPlayer);

          if (checkWin()) {
            setMessage(playerName + " wins!");
            disableCells();
          }else{
            currentPlayer = (currentPlayer === "X") ? "O" : "X";
            playerName = (playerName === "User") ? "Computer" : "User";
            movesLeft--;
          }
        }
      }
      enableClicks();    
    }

    function computerFirstMove(){
      const cells = $(".cell");
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if($(cells[a]).text() !== "" && $(cells[a]).text() === $(cells[b]).text() && $(cells[c]).text() === "") return c;
        else if($(cells[a]).text() !== "" && $(cells[a]).text() === $(cells[c]).text() && $(cells[b]).text() === "") return b;
        else if($(cells[b]).text() !== "" && $(cells[b]).text() === $(cells[c]).text() && $(cells[a]).text() === "") return a;
      }
      let random = getRandom();
      for(let i=0; i<9; i++){
        if($(cells[random]).text() !== "") random = getRandom();
        else return random;
      }       
    }
    function computerChangeMove(){
      const cells = $(".cell");
      const pairingCombinations = [
        [0, 1],
        [1, 2],
        [3, 4],
        [4, 5],
        [6, 7],
        [7, 8],
        [0, 3],
        [3, 6],
        [1, 4],
        [4, 7],
        [2, 5],
        [5, 8],
        [0, 4],
        [4, 8],
        [2, 4],
        [4, 6],
      ];

      for (const combination of pairingCombinations) {
        const [a, b] = combination;
        if($(cells[a]).text() !== $(cells[b]).text() && $(cells[a]).text() === "O") return a;
        else if($(cells[a]).text() !== $(cells[b]).text() && $(cells[b]).text() === "O") return b;
      }
      let random = getRandom();
      for(let i=0; i<9; i++){
        if($(cells[random]).text() !== "O") random = getRandom();
        else return random;
      }       
    }

    function getRandom(){
      return Math.floor(Math.random() * 9);
    }

    function disableCells() {
      $(".cell").attr("data", "true");
      disableClicks();
    }

    function disableClicks(){
      $(".cell").attr("onclick", null);
    }

    function enableClicks(){
      $(".cell").each(function(index){
        $(this).attr("onclick", "cellClicked("+index+")");
      })
    }

    function resetGame() {
      clearTimeout(calcTime);
      currentPlayer = "X";
      playerName = "User";
      movesLeft = 6;
      selectedCell = null;
      $(".cell").text("");
      $(".cell").attr("class", "cell");
      $(".cell").attr("data", "false");
      enableClicks();
      //$(".cell").css("background-color", "#7d26cd");
      setMessage("");
    }






    //fade in and fade out for the message
    //delay before computer play
    //selector and changing style and class name
    //change text content and change attribute
