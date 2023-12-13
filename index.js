turn_index = 0;
table = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
player1_table= [];
player2_table = [];
winner = null;
winner_table = []

$(".btn").click(function() {
    if (this.innerText === "Restart") {
        reset();
    }
    if (!winner){
        pressedButton(this.id);
        if (this.innerText >= "1" && this.innerText <= "9") {
            $("#result").text(update(Number(this.innerText), this.id));
            if (check_win()) {
                winnerEffect();
            }
        }
    }
    if (turn_index === 9) {
        $("#result").text("Draw!");
        $(".instruction").text("Press Restart For A New Game!")
        winner = true;
    }
})

function pressedButton(button_id) {
    $(`#${button_id}`).addClass("pressed");
    setTimeout(function() {
        $(`#${button_id}`).removeClass("pressed");
    }, 200);
}

function update(number_of_box, button_id) {
    turn_index++;
    if (turn_index % 2 === 1) {
        table[number_of_box] = 1;
        player1_table.push(number_of_box);
        $(`#${button_id}`).text("◯");
        $(`#${button_id}`).addClass("player-1");
        return "Player 2's Turn";
    } else {
        table[number_of_box] = 2;
        player2_table.push(number_of_box);
        $(`#${button_id}`).text("✗");
        $(`#${button_id}`).addClass("player-2");
        return "Player 1's Turn";
    }
}

function check_columns() {
    for (var i = 1; i < 4; i++) {
        if (table[i] === 0) {
            continue;
        }
        same = true;
        winner_table = [i];
        for (var j = i + 3; j <= 9; j += 3) {
            if (table[i] !== table[j]) {
                same = false;
            } else {
                winner_table.push(j);
            }
            if (!same) {
                break;
            }
        }
        if (same) {
            return true;
        }
    }
    winner_table = [];
    return false;
}

function check_rows() {
    for (var i = 1; i <= 9; i += 3) {
        if (table[i] === 0) {
            continue;
        }
        same = true;
        winner_table = [i];
        for (var j = i + 1; j < i + 3; j++) {
            if (table[i] !== table[j]) {
                same = false;
            } else {
                winner_table.push(j);
            }
            if (!same) {
                break;
            }
        }
        if (same) {
            return true;
        }
    }
    winner_table = [];
    return false
}

function check_diagonal() {
    if (table[1] === table[5] && table[1] === table[9] && table[1] !== 0) {
        winner_table = [1, 5, 9];
        return true;
    } else if (table[3] === table[5] && table[3] === table[7] && table[3] !== 0) {
        winner_table = [3, 5, 7];
        return true;
    }
    return false;
}

function check_win() {
    if (check_columns()) {
        return true;
    } else if (check_rows()) {
        return true;
    } else if (check_diagonal()) {
        return true;
    } else {
        return false;
    }
}

function winnerEffect() {
    for (var i  = 0; i < 3; i++) {
        $(`#box-${winner_table[i]}`).addClass("win");
    }
    winner = table[winner_table[0]];
    $("#result").text(`Player ${winner} Win!`);
    $(".instruction").text("Press Restart For A New Game!")
}

function reset() {
    $("#result").text("Player 1 first");
    $(".instruction").text("Click The Box To Select")
    for (var i  = 0; i < 3; i++) {
        $(`#box-${winner_table[i]}`).removeClass("win");
    }
    for (var i = 0; i < player1_table.length; i++) {
        $(`#box-${player1_table[i]}`).removeClass("player-1");
        $(`#box-${player1_table[i]}`).text(player1_table[i]);
    }
    for (var i = 0; i < player2_table.length; i++) {
        $(`#box-${player2_table[i]}`).removeClass("player-2");
        $(`#box-${player2_table[i]}`).text(player2_table[i].toString());
    }
    turn_index = 0;
    table = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    player1_table= [];
    player2_table = [];
    winner = null;
    winner_table = [];
}