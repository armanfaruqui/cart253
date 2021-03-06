let oscillator3; // Variable for the oscillator
let newFreq2; // Variable to facilitate change in oscillator's frequency
let textStateFP = 0; // A variable which represents if a text box should be displayed, and which one if so
let friendTalkedTo = false; // Boolean which checks if interaction with friend has begun
let forestPathSelector = 1

class ForestPath {
  constructor(bg_forest1, forestTheme) {
    this.bg = bg_forest1;
    this.song = forestTheme
  }

  // Displays background
  display() {
    image(this.bg, 0, 0);
    console.log(textStateFP)
  }

  // Assigns player position and starts oscillator
  start() {
    player.sprite.position.x = 270;
    player.sprite.position.y = 950;
    oscillator3 = new p5.Oscillator(220, "triangle");
    oscillator3.start();
  }
  // Plays the theme for the scene
  playTheme() {
    if (scene === "forestPath" && textStateFP> 1) {
      if (!forestTheme.isPlaying() && !phoneSong1.isPlaying() && !phoneSong2.isPlaying() && !phoneSong3.isPlaying()) {
        forestTheme.play();
      }
    }
  }
  // Defines walls
  boundaries() {
    if (player.sprite.position.x < 180) player.sprite.position.x = 180;
    if (player.sprite.position.x > 370) player.sprite.position.x = 370;
    if (player.sprite.position.y > 956) player.sprite.position.y = 956;
    if (friend.sprite.position.x < 180) friend.sprite.position.x = 180;
    if (friend.sprite.position.x > 370) friend.sprite.position.x = 370;
    if (friend.sprite.position.y > 956) friend.sprite.position.y = 956;
    if (textStateFP < 15) {
      if (player.sprite.position.y < 286) player.sprite.position.y = 286;// Restricts player from moving too far forward
    }
  }
  // Y position of camera depends on the Y position of the player. X remains fixed
  camera() {
    camera.zoom = 1;
    camera.position.x = 270;
    camera.position.y = player.sprite.position.y;
  }

  // Plays oscillator with frequency which changes depending on players distance from friend
  anxiety() {
    let friendDistance = dist(
      player.sprite.position.x,
      player.sprite.position.y,
      friend.sprite.position.x,
      friend.sprite.position.y
    ); // Measures distance between player and door
    newFreq2 = map(friendDistance, 280, 20, 0, 100); // Max dist = 270. Min = 20
    oscillator3.freq(newFreq2);
  }

  // Called at forestPath1 to display the friend's sprite standing next to the tree
    standingNextToTree() {
      if (textStateFP < 15) {
        friend.sprite.position.x = 190
        friend.sprite.position.y = 382
        friend.sprite.changeAnimation("standLeft")
        player.sprite.collide(friend.sprite)
      }
    }

  // If the player interacts directly with the friend, or if they try to ignore and walk past
  introduction() {
    if (player.sprite.position.y < 288 && textStateFP === 0) {
      friendTalkedTo = true;
      textStateFP = 1
      friend.dialogue5.play();
    } else if (
      friend.sprite.overlap(player.sprite) &&
      keyCode === SHIFT &&
      textStateFP === 0
    ) {
      friendTalkedTo = true;
      textStateFP = 1
      friend.dialogue2.play();
    }
  }

  //Display a GIF of squirrels on a tree
  squirrels() {
    if (textStateFP === 2) {
      camera.off()
      image(gif_squirrels, 0, 0);
      player.sprite.position.x = -100
      player.sprite.position.y = -100
      friend.sprite.position.x = -100
      friend.sprite.position.y = -100
      newFreq2 = newFreq2 - 1
    }
  }

  // Displays relevant text in the text box and makes adjustments to the sprites when necassary
  friendText(stateOfText, dialogue) {
    if (textStateFP === stateOfText) {
      dynamicTextBox2();
      fill(65, 243, 252);
      textSize(12);
      comment = dialogue;
      text(comment, x, player.sprite.position.y - 202, width, height);
      if (textStateFP === 3) {
        player.sprite.changeAnimation("standLeft")
        friend.sprite.changeAnimation("standLeft")
        this.resetSpritePosition()
        oscillator3.stop()
      }
      if (textStateFP > 4 && textStateFP > 4) {
        friend.sprite.changeAnimation("stand")
      }
      if (textStateFP === 15) {
        friend.sprite.changeAnimation("standLeft")
        friend.sprite.position.y = player.sprite.position.y // Positions friend next to player
        friend.sprite.position.x = player.sprite.position.x + 80
      }
    }
  }

  // Displays text options for player to select
  playerReply(stateOfText, c1, c2) {
    if (textStateFP === stateOfText) {
      friend.sprite.changeAnimation("stand")
      choice()
      dynamicTextBox2();
      choice1 = c1
      choice2 = c2
      if (selector === 1) {
        fill(229, 112, 40)
        text(c1, x, player.sprite.position.y - 180, width/2, height)
        fill(255)
        text(c2, 280, player.sprite.position.y - 180, width/2, height)
      } else if (selector === 2) {
        fill(255)
        text(c1, x, player.sprite.position.y - 180, width/2, height)
        fill(229, 112, 40)
        text(c2, 280, player.sprite.position.y - 180, width/2, height)
      }
    }
  }

  // Once conversation is over, friend is positioned next to player and starts walking with player
  startWalkingTogether() {
    if (textStateFP > 15) {
      friend.update()
    }
  }

  // Updates the text box displayed and plays the relevant dialogue sound effect on each click of shift
  changeTextState() {
    if ((friendTalkedTo === true) && keyCode === SHIFT && textStateFP !== 9 && textStateFP !== 12) {
      textStateFP = textStateFP + 1;
      switch (textStateFP) {
        case 0:
          friend.dialogue6.play();
          break;
        case 3:
          friend.dialogue6.play();
          break;
        case 4:
          friend.dialogue2.play();
          break;
        case 6:
          friend.dialogue4.play();
          break;
        case 7:
          friend.dialogue3.play();
          break;
        case 8:
          friend.dialogue2.play();
          break;
        case 10:
          friend.dialogue2.play();
          break;
        case 11:
          friend.dialogue5.play();
          break;
        case 13:
          friend.dialogue4.play();
          break;
        case 14:
          friend.dialogue6.play();
          break;
        case 15:
          friend.dialogue3.play();
          break;
      }
    }
  }
  // Shows next text box when the player selects an option
  selectChoice1() {
    if ((friendTalkedTo === true) && textStateFP === 9) {
      textStateFP = textStateFP + 1;
      friend.dialogue2.play();
    }
  }

  // Shows relevant text box when the player selects an option
  selectChoice2() {
    if ((friendTalkedTo === true) && textStateFP === 12 && selector === 1) {
      textStateFP = textStateFP + 1;
      friend.dialogue3.play();
    } else if ((friendTalkedTo === true) && textStateFP === 12 && selector === 2) {
      textStateFP = textStateFP + 2
        friend.dialogue6.play();
    }
  }

  // Since the sprites were moved off the canvas for the squirrel gif, this method repositions them to where they were before
  resetSpritePosition() {
    player.sprite.position.x = 201
    player.sprite.position.y = 415
    friend.sprite.position.x = 190
    friend.sprite.position.y = 392
  }



  //Switches scene from town to forest path
  exit() {
    if (player.sprite.position.y < 286 && textStateFP > 15) {
      scene = "forestPath2"
      forestPath2.start()
    }
  }
}
