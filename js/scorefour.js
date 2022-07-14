const submit_players= document.querySelector('#submit-players');
const type_of_game = document.querySelector(".type-of-game");
const init_players =document.querySelector('.init-players');
const new_game_round =document.querySelector('.new-game-round');
const players_score =document.querySelector('.players-score');
const home_board_img =document.querySelector('.home-board-img');
const scorefour =document.querySelector('.scorefour');
const player_turn_msg = document.querySelector('.player-turn');
const error_text = document.querySelector(".error-text");

submit_players.addEventListener('click',function(e){
        e.preventDefault();
});
const restart_color = document.querySelectorAll(".scorefour td button");

const game = {
    players: [2],
    players_wins: [2],
    moves: 0,
    cells: [],
    winner: false,
    player_winner:"",
    player_winner_color:"",
    player_turn_color : "",
    player_turn:"",
    free_cells:42,
    draws:0
};

var Colors = [
    "red",
    "yellow",
];

/**arxikopoihsh game */
game.players_wins[0]=0;
game.players_wins[1]=0;
game.players[0]="Player1";
game.players[1]="Player2";
game.player_turn_color=getRandomColor();
for(let i = 0 ; i<6; i++){
    game.cells[i]=[null,null,null,null,null,null,null];
}
if(game.player_turn_color=="yellow"){
    setPlayerTurn(game.players[1]);
}else{
    setPlayerTurn(game.players[0]);
}



var start;
var end ;
var time ;
//alert('Execution time: ' + time);
if (window.location.hash === '#change') {
    init_players.style.display="flex";
    type_of_game.style.display="none";
}
function typeOfGame(type){
    
    if(type==='normal'){
        window.location.href = "scorefour.html#change";
        if(window.location.hash === '#change'){
            init_players.style.display="flex";
            type_of_game.style.display="none";
        }
    }else{
        window.location.href = "scorefourPc.html#change";
    }
}

function setPlayerName(){
    start = new Date().getTime();

    let player1=document.getElementById('player1').value;
    let player2=document.getElementById('player2').value;
    init_players.style.display="none";
    if(player1!=""){
        
        game.players[0]=player1;
    }
    if(player2!=""){
        game.players[1]=player2;
    }
    document.querySelector('.p1').innerText=game.players[0];
    document.querySelector('.p1-points').innerText=game.players_wins[0];
    document.querySelector('.p2').innerText=game.players[1];
    document.querySelector('.p2-points').innerText=game.players_wins[1];

    home_board_img.style.display="none";
    new_game_round.style.display="flex";
    players_score.style.display="flex";
    scorefour.style.display="flex";
    player_turn_msg.style.display="block";
    document.querySelector('.player-turn label').innerText='Player Turn : ' + game.player_turn + ' Color : ' + game.player_turn_color;
    document.querySelector('.player-turn label').style.color=""+ game.player_turn_color +"";
}

function getRandomColor() {
    color = Colors[Math.floor(Math.random()*Colors.length)];
    return color;
}


function newGame(){
    type_of_game.style.display="flex";
    home_board_img.style.display="flex";
    new_game_round.style.display="none";
    players_score.style.display="none";
    scorefour.style.display="none";
    player_turn_msg.style.display="none";
    error_text.style.display="none";
    
    game.players_wins[0]=0;
    game.players_wins[1]=0;
    game.players[0]="Player1";
    game.players[1]="Player2";

    for(let i = 0 ; i<6; i++){
        game.cells[i]=[null,null,null,null,null,null,null];
    }
    for(let i=0; i<restart_color.length;i++){
        restart_color[i].style.background="rgb(193, 253, 253)";
        restart_color[i].className="blinking";
        restart_color[i].disabled=false;
        
    }

    game.draws=0;
    game.moves=0;
    game.free_cells=42;
    game.winner=false;
    game.player_winner_color="";
    game.player_winner="";
    game.player_turn_color=getRandomColor();
    if(game.player_turn_color=="yellow"){
        setPlayerTurn(game.players[1]);
    }else{
        setPlayerTurn(game.players[0]);
    }
    if(document.getElementById('info-table')){
        table = document.getElementById('info-table');
        parentEl = table.parentElement;
        parentEl.removeChild(table);
        Create_New_Table = true;
    }
    google.charts.setOnLoadCallback(drawChart);
    document.querySelector("#piechart").style.display="none";
    window.location.href = "scorefour.html";
}

function newRound(){
    error_text.style.display="none";
    for(let i = 0 ; i<6; i++){
        game.cells[i]=[null,null,null,null,null,null,null];
    }
    for(let i=0; i<restart_color.length;i++){
        restart_color[i].style.background="rgb(193, 253, 253)";
        restart_color[i].className="blinking";
        restart_color[i].disabled=false;
    }


    game.moves=0;
    game.free_cells=42;
    game.winner=false;
    game.player_winner_color="";
    game.player_winner="";
    game.player_turn_color=getRandomColor();
    if(game.player_turn_color=="yellow"){
        setPlayerTurn(game.players[1]);
    }else{
        setPlayerTurn(game.players[0]);
    }
    if(document.getElementById('info-table')){
        table = document.getElementById('info-table');
        parentEl = table.parentElement;
        parentEl.removeChild(table);
        Create_New_Table = true;
    }
    document.querySelector('.player-turn label').innerText='PlayerTurn : ' + game.player_turn + ' Color : ' + game.player_turn_color;
    document.querySelector('.player-turn label').style.color=""+ game.player_turn_color +"";
    document.querySelector('.player-turn').style.textAlign = "left";
    start = new Date().getTime();
}

var Create_New_Table = true;
var table;
function infoBox(){
    
    if(Create_New_Table){
        Create_New_Table=false;
        table = document.createElement("TABLE");
        table.setAttribute("id", "info-table");
        document.querySelector(".info-box").appendChild(table);
        
        let row = table.insertRow(rowCount);/**.
         */
        
        var tr_th = document.createElement("TR");
        tr_th.setAttribute("id", "Tr_th");
        document.getElementById("info-table").appendChild(tr_th);
        var th_move = document.createElement("TH");
        var th_name = document.createElement("TH");
        var th_cells = document.createElement("TH");
        var th_color = document.createElement("TH");
        var th_time = document.createElement("TH");
        var th_m = document.createTextNode("Moves");
        var th_n = document.createTextNode("Player Name");
        var th_c = document.createTextNode("Free Cells");
        var th_col = document.createTextNode("Color");
        var th_t = document.createTextNode("Time");
        th_move.appendChild(th_m);
        th_name.appendChild(th_n);
        th_cells.appendChild(th_c);
        th_color.appendChild(th_col);
        th_time.appendChild(th_t);

        document.getElementById("Tr_th").appendChild(th_move);
        document.getElementById("Tr_th").appendChild(th_name);
        document.getElementById("Tr_th").appendChild(th_cells);
        document.getElementById("Tr_th").appendChild(th_color);
        document.getElementById("Tr_th").appendChild(th_time);
        
    }
    var table = document.getElementById("info-table");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);;
    var th_m = row.insertCell(0);
    var th_n = row.insertCell(1);
    var th_c = row.insertCell(2);
    var th_col = row.insertCell(3);
    var th_t = row.insertCell(4);
    
    time = (end - start)/1000;
    th_m.innerHTML = game.moves;
    th_n.innerHTML = getPlayerTurn();
    th_c.innerHTML = game.free_cells;
    th_col.innerHTML = game.player_turn_color;
    th_t.innerHTML= time;
}

function play(x,y){

    end = new Date().getTime();
    if(isValidMove(x,y)){
        game.cells[x][y]=game.player_turn_color;
        document.getElementById('p'+x+'_'+y).style.background=''+game.player_turn_color+'';
        document.getElementById('p'+x+'_'+y).disabled=true;
        
        if(hasPlayerWon(x,y)){
            game.winner=true;
            game.moves++; 
            game.free_cells--;
            updatePage();
        }else{
            
            game.moves++; 
            game.free_cells--;
            if(game.free_cells===0){
                game.draws++;
            }else{
                changePlayerTurn();
                document.querySelector('.player-turn label').innerText='PlayerTurn : ' + game.player_turn + ' Color : ' + game.player_turn_color;
                document.querySelector('.player-turn label').style.color=""+ game.player_turn_color +"";
                document.querySelector('.player-turn').style.textAlign = "left";
            }
            updatePage();
            
        }
        error_text.style.display="none";
    }else{
        error_text.style.display="block";
        error_text.innerHTML=" * You cant pull your tile there."
    }
    start = new Date().getTime();
    
}
function updatePage(){
    if(game.winner===true){
        setWinnerPlayer(game.player_turn,game.player_turn_color);
        if(game.player_turn===game.players[0]){
            game.players_wins[0]++;
            document.querySelector('.p1-points').innerText=game.players_wins[0];
        }else{
            game.players_wins[1]++;
            document.querySelector('.p2-points').innerText=game.players_wins[1];
        }
        document.querySelector('.player-turn label').innerText='WINNER : ' + game.player_turn + ' COLOR :  ' + game.player_turn_color;
        document.querySelector('.player-turn label').style.color=""+ game.player_turn_color +"";
        document.querySelector('.player-turn').style.textAlign = "center";
        for(let i=0; i<restart_color.length;i++){
            restart_color[i].disabled=true;
        }
        infoBox();
        google.charts.setOnLoadCallback(drawChart);
        document.querySelector("#piechart").style.display="block";
    }else if(isDraw()){
        infoBox();
        google.charts.setOnLoadCallback(drawChart);
        document.querySelector("#piechart").style.display="block";
        document.querySelector('.player-turn label').innerText='DRAW';
        document.querySelector('.player-turn label').style.color="green";
        document.querySelector('.player-turn').style.textAlign = "center";
    }else{
        infoBox();
    }
    
}

function setWinnerPlayer(player,color){
    game.player_winner = player;
    game.player_winner_color = color;
}

function getWinnerPlayer(){
    return  game.player_winner;
}
function getWinnerPlayerColor(){
    return  game.player_winner_color;
}

function setPlayerTurn(player){
    game.player_turn=player;
}

function getPlayerTurn(){
    return game.player_turn;
}

function isValidMove(x,y){
    if(x===5){
        return true;
    }else{
        if(game.cells[x+1][y]!=null){
            return true;
        }else{
            return false;
        }
    }
}

function hasPlayerWon(x,y){
    if(verticalWin(x,y)){
        game.winner=true;
        return true;
    }

    else if(horizontialWin(x,y)){
        game.winner=true;
        return true;
    }
    else if(diagonialWin(x,y)){
        game.winner=true;
        return true;
    }
    else return false;

}

function verticalWin(x,y){
    var count=1;
    var color = game.cells[x][y];
    var counter=x+1;
    while(counter<=5){
        if(game.cells[counter][y]===color){
            count++;
            counter++;
        } 
        else{
            break;
        } 
    }
    counter = x-1;
    while(counter>=0){
        if(game.cells[counter][y]===color) {
            count++;
            counter--;
        }

        else break;
    }
    if(count==4){
        let find=x;
        while( find >0 && game.cells[find-1][y]===color){
            find--;
        }
        for(let i = find ; i < (find+4);i++){
            if(color==="yellow"){
                document.getElementById('p'+i+'_'+y).className="blinking-yellow";
            }else{
                document.getElementById('p'+i+'_'+y).className="blinking-red";
            }
            
        }
        return true;
    }else{
        return false;
    }
}
function horizontialWin(x,y){
    var count=1;
    var color = game.cells[x][y];
    var counter=y+1;
    while(counter<=6){
        if(game.cells[x][counter]===color){
            count++;
            counter++;
        } 
        else{
            break;
        } 
    }
    counter = y-1;
    while(counter>=0){
        if(game.cells[x][counter]===color) {
            count++;
            counter--;
        }

        else break;
    }
    if(count>=4){
        let find=y;
        while(find >0 && game.cells[x][find-1]===color){
            find--;
        }
        while(game.cells[x][find]===color){
            if(color==="yellow"){
                document.getElementById('p'+x+'_'+find).className="blinking-yellow";
            }else{
                document.getElementById('p'+x+'_'+find).className="blinking-red";
            }
            find++;
        }
        return true;
    }else{
        return false;
    }
}

function diagonialWin(x,y){
    var count_left=1;
    var count_right=1;
    var color = game.cells[x][y];
    var counter_y=y+1; /**epomeno apo deksia */
    var counter_x=x+1/**epomeno apo katw */
    /*left diagonia* */
    while(counter_y<=6 && counter_x<=5){
        if(game.cells[counter_x][counter_y]===color){
            count_left++;
            counter_y++;
            counter_x++;
        } 
        else break;

        
    }
    counter_y=y-1; /**epomeno apo aristera */
    counter_x=x-1/**epomeno apo panw */
    while(counter_x>=0 && counter_y>=0){
        if(game.cells[counter_x][counter_y]===color) {
            count_left++;
            counter_y--;
            counter_x--;
        }
        else break;
    }
    /*right diagonia* */
    counter_y=y-1; /**epomeno apo aristera */
    counter_x=x+1/**epomeno apo katw */
    while(counter_y>=0 && counter_x<=5){

        if(game.cells[counter_x][counter_y]===color){
            count_right++;
            counter_y--;
            counter_x++;
        } 
        else break;
    }

    counter_y=y+1; /**epomeno apo deksia */
    counter_x=x-1/**epomeno apo panw */
    while(counter_x>=0 && counter_y<=6){
        if(game.cells[counter_x][counter_y]===color) {
            count_right++;
            counter_y++;
            counter_x--;
        }
        else break;
    }

    if(count_left>=4 && count_right>=4){
        //aristera
        let find_x=x;
        let find_y=y;
        while(find_x>0 && find_y>0 && game.cells[find_x-1][find_y-1]===color){
            find_x--;
            find_y--;
        }
        while(find_x<6 && find_y<7 && game.cells[find_x][find_y]===color){
            
            if(color==="yellow"){
                document.getElementById('p'+(find_x)+'_'+(find_y)).className="blinking-yellow";
            }else{
                document.getElementById('p'+(find_x)+'_'+(find_y)).className="blinking-red";
            }
            find_x++;
            find_y++;
        }//deksia
        find_x=x;
        find_y=y;
        while(find_x>0 && find_y<7 && game.cells[find_x-1][find_y+1]===color){
            find_x--;
            find_y++;
        }
        while(find_x<6 && find_y>=0 && game.cells[find_x][find_y]===color){
            
            if(color==="yellow"){
                document.getElementById('p'+(find_x)+'_'+(find_y)).className="blinking-yellow";
            }else{
                document.getElementById('p'+(find_x)+'_'+(find_y)).className="blinking-red";
            }
            find_x++;
            find_y--;
        }
        return true;
    }
    else if(count_left>=4 ){
        let find_x=x;
        let find_y=y;
        while(find_x>0 && find_y>0 && game.cells[find_x-1][find_y-1]===color){
            find_x--;
            find_y--;
        }
        while(find_x<6 && find_y<7 && game.cells[find_x][find_y]===color){
            
            if(color==="yellow"){
                document.getElementById('p'+(find_x)+'_'+(find_y)).className="blinking-yellow";
            }else{
                document.getElementById('p'+(find_x)+'_'+(find_y)).className="blinking-red";
            }
            find_x++;
            find_y++;
        }
        return true;
    }else if(count_right>=4){
        let find_x=x;
        let find_y=y;
        while(find_x>0 && find_y<7 && game.cells[find_x-1][find_y+1]===color){
            find_x--;
            find_y++;
        }
        while(find_x<6 && find_y>=0 && game.cells[find_x][find_y]===color){
            
            if(color==="yellow"){
                document.getElementById('p'+(find_x)+'_'+(find_y)).className="blinking-yellow";
            }else{
                document.getElementById('p'+(find_x)+'_'+(find_y)).className="blinking-red";
            }
            find_x++;
            find_y--;
        }
        return true;
    }
    else{
        return false;
    }
}

function isDraw(){
    if(game.free_cells===0) return true;
    else return false;
}

function changePlayerTurn(){
    if(game.player_turn_color=="red"){
        game.player_turn_color="yellow";
        setPlayerTurn(game.players[1]);
    }
    else{
        game.player_turn_color="red";
        setPlayerTurn(game.players[0]);
    }
}

      google.charts.load('current', {'packages':['corechart']});

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Players', 'Wins'],
          ['Player1',     game.players_wins[0] ],
          ['Player2',      game.players_wins[1] ],
          ['Draw',  game.draws]
        ]);

        var options = {
          title: 'Player Wins'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }

/**
 * 

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['Players', 'Wins'],
    ['Player1',     game.players_wins[0]],
    ['Player2',      game.players_wins[1]],
    ['Draws',   game.draws ]
  ]);

  var options = {
    title: 'My Daily Activities'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}
 */