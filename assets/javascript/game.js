var rey = {
	name: "Rey",
	hp: 142,
	bAP: 8,
	cAP: 8
}

var revan = {
	name: "Revan",
	hp: 155,
	bAP: 10,
	cAP: 10
}

var lucas = {
	name: "Darth CGi",
	hp: 169,
	bAP: 12,
	cAP: 12
}

var binks = {
	name: "Darth Jar Jar",
	hp: 200,
	bAP: 15,
	cAP: 15
}

var dotf = new Audio("assets/sounds/dotf.mp3");
var saberOn = new Audio("assets/sounds/saberOn.wav");
var clash = new Audio("assets/sounds/clash.wav");
var nooo = new Audio("assets/sounds/nooo.mp3")

var charClick = 0;
var oppoClick = 0;
var charID;
var oppoID;
var attackCounter = 1;
var victories = 0;

$(document).ready(function() {

	dotf.play();

	$("body").on("click", ".character", function() {
		if (charClick === 0) {
			saberOn.play();
			charID = $(this).attr("id");
			$(this).addClass("good");
			$(this).siblings(".character").addClass("bad");
			$("#chosen-character").append($(".good"));
			$("#att-enemies").append($(".bad"));
			charClick++;
		}
	});

	$("body").on("click", ".bad", function() {
		if (oppoClick === 0) {
			saberOn.play();
			oppoID = $(this).attr("id");
			$(this).removeClass("bad").addClass("currentOppo");
			$("#opponent").append($(".currentOppo"));
			oppoClick++;
		}
	});

	$("body").on("click", "#attack-button", function() {
		if (oppoClick === 1) {
			clash.play();
			window[charID].hp -= window[oppoID].cAP;
			window[oppoID].hp -= (window[charID].bAP * attackCounter);
			if (window[charID].hp > -1) {
				$(".good > .health").html("HP: " + window[charID].hp);
			} else {
				window[charID].hp = 0;
				$(".good > .health").html("HP: " + window[charID].hp);
			}
			if (window[oppoID].hp > -1) {
				$(".currentOppo > .health").html("HP: " + window[oppoID].hp);
			} else {
				window[oppoID].hp = 0;
				$(".currentOppo > .health").html("HP: " + window[oppoID].hp);
			}
			$("#cc-status").html("You attacked " + window[oppoID].name + " for " + (window[charID].bAP * attackCounter) + " damage!");
            $("#opponent-status").html(window[oppoID].name + " attacked you for " + window[oppoID].cAP + " damage!");
            attackCounter++;
            defeatChecker();
            rmDefeatedOppo();
		}
	});

	function defeatChecker() {
		if (window[charID].hp < 1) {
			nooo.play();
			oppoClick = 0;
			$("#cc-status").html("You've been defeated... one more try?");
			$("#opponent-status").html($("<button/>", {
				text: "Reload",
				class: "button",
				click: function() { location.reload(); }
			}))
		}
	};

	function rmDefeatedOppo() {
		if (window[oppoID].hp < 1) {
			$("#cc-status").html("You've defeated " + window[oppoID].name + "!");
			$("#opponent-status").html("Please choose your next opponent!");
			$(".currentOppo").remove();
			oppoClick = 0;
			victories++;
			if (victories === 3) {
				$("#cc-status").html("You are victorious! Another round?");
				$("#opponent-status").html($("<button/>", {
					text: "Reload",
					class: "button",
					click: function() { location.reload(); }
				}))
			}
		}
	};

});