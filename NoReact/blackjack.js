/**
 * Araien Redfern
 * March 22, 2018
 *
 * JavasScript program to interface between server and HTML to
 * provide a user with a blackjack gambling experience in their browser.
 */

// Show the status to the player
function printStatus(response) {

    // Taken from user "amenoire" on March 22, 2018
    // https://stackoverflow.com/questions/22987349/is-there-a-way-to-get-http-status-code-name-using-js-and-angularjs
    var HTTP_STATUS_CODES = {
        '200' : 'OK',
        '201' : 'Created',
        '202' : 'Accepted',
        '203' : 'Non-Authoritative Information',
        '204' : 'No Content',
        '205' : 'Reset Content',
        '206' : 'Partial Content',
        '300' : 'Multiple Choices',
        '301' : 'Moved Permanently',
        '302' : 'Found',
        '303' : 'See Other',
        '304' : 'Not Modified',
        '305' : 'Use Proxy',
        '307' : 'Temporary Redirect',
        '400' : 'Bad Request',
        '401' : 'Unauthorized',
        '402' : 'Payment Required',
        '403' : 'Forbidden',
        '404' : 'Not Found',
        '405' : 'Method Not Allowed',
        '406' : 'Not Acceptable',
        '407' : 'Proxy Authentication Required',
        '408' : 'Request Timeout',
        '409' : 'Conflict',
        '410' : 'Gone',
        '411' : 'Length Required',
        '412' : 'Precondition Failed',
        '413' : 'Request Entity Too Large',
        '414' : 'Request-URI Too Long',
        '415' : 'Unsupported Media Type',
        '416' : 'Requested Range Not Satisfiable',
        '417' : 'Expectation Failed',
        '500' : 'Internal Server Error',
        '501' : 'Not Implemented',
        '502' : 'Bad Gateway',
        '503' : 'Service Unavailable',
        '504' : 'Gateway Timeout',
        '505' : 'HTTP Version Not Supported'
    };

    var status = document.getElementsByName("up");
    status[0].textContent = HTTP_STATUS_CODES[response.status];
}

// Prints the cards when the game is in progress
function printCardsCurrentGame(myJson) {

    // Show the dealers cards
    var dealer_cards = "";
    var dealer_hand = document.getElementsByName("dealer_hand");
    for (var i in myJson.game.dealer_hand) {
        var card = myJson.game.dealer_hand[i];
        if (card == "1") {
            card = "A";
        }
        else if (card == "11") {
            card = "J";
        }
        else if (card == "12") {
            card = "Q";
        }
        else if (card == "13") {
            card = "K";
        }
        dealer_cards += card + ", ";
    }
    dealer_hand[0].textContent = dealer_cards;
    console.log("Dealer Cards: " + dealer_cards);

    // Show the players cards
    var player_cards = "";
    var player_hand = document.getElementsByName("player_hand");
    for (var i in myJson.game.player_hand) {
        var card = myJson.game.player_hand[i];
        if (card == "1") {
            card = "A";
        }
        else if (card == "11") {
            card = "J";
        }
        else if (card == "12") {
            card = "Q";
        }
        else if (card == "13") {
            card = "K";
        }
        player_cards += card + ", ";
        //player_cards += myJson.game.player_hand[i]+", ";
    }
    player_hand[0].textContent = player_cards;
    console.log("Player Cards: " + player_cards);
    console.log("");
}

// Prints the cards when the game is over
function printCardsLastGame(myJson) {

    // Show the dealers cards in the console
    var dealer_cards = "";
    var dealer_hand = document.getElementsByName("dealer_hand");
    for (var i in myJson.last_game.dealer_hand) {
        var card = myJson.last_game.dealer_hand[i];
        if (card == "1") {
            card = "A";
        }
        else if (card == "11") {
            card = "J";
        }
        else if (card == "12") {
            card = "Q";
        }
        else if (card == "13") {
            card = "K";
        }
        dealer_cards += card + ", ";
    }
    dealer_hand[0].textContent = dealer_cards;
    console.log("Dealer Cards: " + dealer_cards);

    // Show the players cards in the console
    var player_cards = "";
    var player_hand = document.getElementsByName("player_hand");
    for (var i in myJson.last_game.player_hand) {
        var card = myJson.last_game.player_hand[i];
        if (card == "1") {
            card = "A";
        }
        else if (card == "11") {
            card = "J";
        }
        else if (card == "12") {
            card = "Q";
        }
        else if (card == "13") {
            card = "K";
        }
        player_cards += card + ", ";
    }
    player_hand[0].textContent = player_cards;
    console.log("Player Cards: " + player_cards);
    console.log("");
}

// Prints the result of a game
function printResult(myJson) {

    // Report the game result to the console
    var result = document.getElementsByName("result");
    result[0].textContent = myJson.last_game.result;
    console.log("Result: " + myJson.last_game.result);

    // Show the original bet amount
    var you_bet = document.getElementsByName("last_bet");
    you_bet[0].textContent = myJson.last_game.bet;
    console.log("Original bet: " + myJson.last_game.bet);

    // Show the amount won to the user
    var won = document.getElementsByName("won");
    won[0].textContent = myJson.last_game.won;
    console.log("You Won: " + myJson.last_game.won);

    // Show the new amount of money (after standing) in the console
    var money = document.getElementsByName("money");
    money[0].textContent = myJson.money;
    console.log("Money: " + myJson.money);
    console.log("");
}

// Enables the game-in-progress buttons
function enableGameButtons() {
    document.getElementsByName("stand")[0].disabled = false;
    document.getElementsByName("hit")[0].disabled = false;
    document.getElementsByName("double_down")[0].disabled = false;
    document.getElementsByName("surrender")[0].disabled = false;
}

// Disables the game-in-progress buttons
function disableGameButtons() {
    document.getElementsByName("stand")[0].disabled = true;
    document.getElementsByName("hit")[0].disabled = true;
    document.getElementsByName("double_down")[0].disabled = true;
    document.getElementsByName("surrender")[0].disabled = true;
}

// Enable bet buttons/forms
function enableBetButtons() {
    document.getElementsByName("bet")[0].disabled = false;
    document.getElementsByName("betButton")[0].disabled = false;
}

// Diables bet buttons/forms
function disableBetButtons() {
    document.getElementsByName("bet")[0].disabled = true;
    document.getElementsByName("betButton")[0].disabled = true;
}

// Clears the "last game" area when a new bet is placed
function clearLastGame() {

        var result = document.getElementsByName("result");
        result[0].textContent = "";

        // Show the original bet amount
        var you_bet = document.getElementsByName("last_bet");
        you_bet[0].textContent = "";

        // Show the amount won to the user
        var won = document.getElementsByName("won");
        won[0].textContent = "";
}

// Gambler class that interfaces with a server and an html page
// tp provide a blackjack gambling experience on a web browser
class Gambler {

    // Constructor
    constructor(url, token) {

        this.url = url;
        this.token = token;
        this.session;

        // Connect to the "hello" page
        fetch(url)
        .then(function(response) {
            return response.text();
        })
        .then(function(myJson) {
            console.log(myJson);
        });

        // Build the encoded body for the POST request
        var formBody = [];
        var key = encodeURIComponent("token");
        var value = encodeURIComponent(token);
        formBody.push(key + "=" + value);

        // If we don't have an existing session, obtain a new one
        if (localStorage.getItem("session") == null) {

            // Obtain a new session from the server
            fetch(url+"sit", {
                method: "POST",
                body: formBody[0],
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then(function(response) {

                // Show the status to the player
                printStatus(response);
                return response.json();
            })
            .then(function(myJson) {

                localStorage.setItem("session", myJson.session);
                console.log("New Session: " + myJson.session);

                // Set the session
                var session = document.getElementsByName("session");
                session[0].textContent = myJson.session;

                // Set the starting money
                var money = document.getElementsByName("money");
                money[0].textContent = myJson.money;
            });
        }
        else { // Else get the old one

            fetch(url+localStorage.getItem("session")+"/", {
                method: "POST",
                body: formBody[0],
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then(function(response) {

                // Show the status to the player
                printStatus(response);
                return response.json();
            })
            .then(function(myJson) {

                console.log("Reconnected to previous session...");

                // Set the session
                var session = document.getElementsByName("session");
                session[0].textContent = myJson.session;

                // Set the money
                var money = document.getElementsByName("money");
                money[0].textContent = myJson.money;

                // If we reconnected to a fresh session
                if (Object.keys(myJson)[0] == "money") {
                    clearLastGame();
                    disableGameButtons();
                    enableBetButtons();
                }
                // If we reconnected to a sesssion in progress
                else if (Object.keys(myJson)[0] == "game") {

                    // Enable proper buttons
                    disableBetButtons();
                    enableGameButtons();

                    // Don't allow surrender if the player has hit at least once
                    if ((myJson.game.player_hand).length > 2) {
                        document.getElementsByName("surrender")[0].disabled = true;
                    }

                    clearLastGame();
                    printCardsCurrentGame(myJson);

                }
                // If we reconnected to a session that had just ended
                else if (Object.keys(myJson[0] == "last_game")) {
                    printCardsLastGame(myJson);
                    printResult(myJson);

                    // Refresh interface
                    var bet = document.getElementsByName("bet");
                    bet[0].value = 0;
                    enableBetButtons();
                    disableGameButtons();
                }
                else {

                }

                // console.log("Session: " + myJson.session);

                // Set the session
                var session = document.getElementsByName("session");
                session[0].textContent = myJson.session;

                // Set the starting money
                var money = document.getElementsByName("money");
                money[0].textContent = myJson.money;
            });

        }




        // Assign on-click functionality
        document.getElementsByName("betButton").onclick = window.bet;
        document.getElementsByName("stand").onclick = window.stand;
        document.getElementsByName("hit").onclick = window.hit;
        document.getElementsByName("double_down").onclick = window.double_down;
        document.getElementsByName("surrender").onclick = window. surrender;

        disableGameButtons();
    }

    bet(amount) {

        var session = (document.getElementsByName("session"))[0].textContent;

        // Build the encoded body for the POST request
        var formBody = [];
        var key = encodeURIComponent("token");
        var value = encodeURIComponent(this.token);
        formBody.push(key + "=" + value);
        key = encodeURIComponent("amount");
        value = encodeURIComponent(amount);
        formBody.push(key + "=" + value);
        formBody = formBody[0] + "&" + formBody[1];

        // Obtain a new session from the server
        //function startSession() {
        fetch(this.url+session+"/bet", {
            method: "POST",
            body: formBody,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(function(response) {

            // Show the status to the player
            printStatus(response);
            return response.json();
        })
        .then(function(myJson) {

            console.log("New Match!");

            // Prepare the game interface
            disableBetButtons();
            enableGameButtons();
            clearLastGame();

            if (Object.keys(myJson)[0] == "game") {

                // Show the bet amount in the console
                var bet_amount = document.getElementsByName("bet");
                console.log("You bet: " + bet_amount[0].value);

                // Show the new amount of money (post-bet) in the console
                var money = document.getElementsByName("money");
                money[0].textContent = myJson.money;
                console.log("Money: " + myJson.money);

                printCardsCurrentGame(myJson);
            }
            else {
                printCardsLastGame(myJson);
                printResult(myJson);

                // Refresh interface
                var bet = document.getElementsByName("bet");
                bet[0].value = 0;
                enableBetButtons();
                disableGameButtons();
            }

        });
    }

    stand() {

        var session = (document.getElementsByName("session"))[0].textContent;

        // Build the encoded body for the POST request
        var formBody = [];
        var key = encodeURIComponent("token");
        var value = encodeURIComponent(this.token);
        formBody.push(key + "=" + value);

        fetch(this.url+session+"/stand", {
            method: "POST",
            body: formBody[0],
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(function(response) {
            printStatus(response);
            return response.json();
        })
        .then(function(myJson) {

            console.log("You Stand");

            // Report results to user
            printCardsLastGame(myJson);
            printResult(myJson);

            // Refresh interface
            var bet = document.getElementsByName("bet");
            bet[0].value = 0;
            enableBetButtons();
            disableGameButtons();
        })
    }

    hit() {

        var session = (document.getElementsByName("session"))[0].textContent;

        // Build the encoded body for the POST request
        var formBody = [];
        var key = encodeURIComponent("token");
        var value = encodeURIComponent(this.token);
        formBody.push(key + "=" + value);

        fetch(this.url+session+"/hit", {
            method: "POST",
            body: formBody[0],
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(function(response) {
            printStatus(response);
            return response.json();
        })
        .then(function(myJson) {

            console.log("You Hit");

            if (Object.keys(myJson)[0] == "game") {

                // Can't surrender after hitting
                document.getElementsByName("surrender")[0].disabled = true;
                printCardsCurrentGame(myJson);
            }
            else {
                printCardsLastGame(myJson);
                printResult(myJson);

                // Refresh interface
                var bet = document.getElementsByName("bet");
                bet[0].value = 0;
                enableBetButtons();
                disableGameButtons();
            }
        });

    }

    double_down() {

        var session = (document.getElementsByName("session"))[0].textContent;

        // Build the encoded body for the POST request
        var formBody = [];
        var key = encodeURIComponent("token");
        var value = encodeURIComponent(this.token);
        formBody.push(key + "=" + value);

        fetch(this.url+session+"/double_down", {
            method: "POST",
            body: formBody[0],
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(function(response) {
            printStatus(response);
            return response.json();
        })
        .then(function(myJson) {

            console.log("You Double Down");

            if (Object.keys(myJson)[0] == "game") {
                printCardsCurrentGame(myJson);
            }
            else {

                // Report outcome
                printCardsLastGame(myJson);
                printResult(myJson);

                // Refresh game interface
                var bet = document.getElementsByName("bet");
                bet[0].value = 0;
                enableBetButtons();
                disableGameButtons();
            }
        });
    }

    surrender() {

        var session = (document.getElementsByName("session"))[0].textContent;

        // Build the encoded body for the POST request
        var formBody = [];
        var key = encodeURIComponent("token");
        var value = encodeURIComponent(this.token);
        formBody.push(key + "=" + value);

        fetch(this.url+session+"/surrender", {
            method: "POST",
            body: formBody[0],
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(function(response) {
            printStatus(response);
            return response.json();
        })
        .then(function(myJson) {

            console.log("You Surrender");

            // Report outcome
            printCardsLastGame(myJson);
            printResult(myJson);

            // Refresh game interface
            var bet = document.getElementsByName("bet");
            bet[0].textContent = "0";
            enableBetButtons();
            disableGameButtons();
        })
    }

}
