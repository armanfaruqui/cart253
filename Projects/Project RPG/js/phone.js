let phoneWidth = 77; // Width of phone
let phoneHeight = 140; // Height of phone
let bezel = 6; // Distance from phone edges to screen
let showSongs = 1 // Boolean which checks if playlist should be shown

class Phone {
  constructor(phoneScreen, musicScreen, notesScreen, selfieIndoor, selfieTown, selfieForestPath, selfieLake, selfieForestPath3, phoneSong1, phoneSong2, phoneSong3) {
    this.x = 400;
    this.y = 400;
    this.width = phoneWidth;
    this.height = phoneHeight;
    this.bezel = bezel;
    this.selected = 'menu'; // Game starts with phone on the menu/home screen
    this.screenImage = phoneScreen;
  }
  // Displays the phone and its screen
  display() {
    camera.off(); //  Camera is often turned off then on for scenes which use the dynamic camera because of how it messes with position values
    fill(57, 58, 56);
    rect(this.x, this.y, this.width, this.height, 5); // The edges of the phone
    if (this.selected === "music") { // Separate screen images for each app
      image(musicScreen, this.x + this.bezel, this.y + this.bezel)
    }
    else if(this.selected === "notes") {
      image(notesScreen, this.x + this.bezel, this.y + this.bezel)
    }
    else if(this.selected === "menu"){
      image(this.screenImage, this.x + this.bezel, this.y + this.bezel);
      }
    camera.on();
  }
  // Selects an app when clicked on
  selectApp() {
    if (this.selected === "menu") {
      if (
        mouseX > this.x + this.bezel + 8 &&
        mouseX < this.x + this.bezel + 27 &&
        mouseY > this.y + this.bezel + 12 &&
        mouseY < this.y + this.bezel + 31
      ) {
        this.selected = "camera";
      }
      if (
        mouseX > this.x + this.bezel + 8 &&
        mouseX < this.x + this.bezel + 27 &&
        mouseY > this.y + this.bezel + 43 &&
        mouseY < this.y + this.bezel + 62
      ) {
        this.selected = "music";
      }
      if (
        mouseX > this.x + this.bezel + 39 &&
        mouseX < this.x + this.bezel + 58 &&
        mouseY > this.y + this.bezel + 12 &&
        mouseY < this.y + this.bezel + 31
      ) {
        this.selected = "notes";
      }
    }
  }
  // Displays an image of the player relative to which scene they are in
  camera() {
    if (this.selected === "camera") {
      if (scene === 'bedroom' || scene === 'hall' || scene === 'butchery') {
        camera.off()
        image(selfieIndoor, this.x + this.bezel, this.y + this.bezel)
        camera.on()
      }
      if (scene === 'forestPath' || scene === 'forestPath2') {
        camera.off()
        image(selfieForestPath, this.x + this.bezel, this.y + this.bezel)
        camera.on()
      }
      if (scene === 'lake') {
        camera.off()
        image(selfieLake, this.x + this.bezel, this.y + this.bezel)
        camera.on()
      }
      if (scene === 'forestPath3') {
        camera.off()
        image(selfieForestPath3, this.x + this.bezel, this.y + this.bezel)
        camera.on()
      }
      if (scene === 'town') {
        camera.off()
        image(selfieTown, this.x + this.bezel, this.y + this.bezel)
        camera.on()
      }
    }
  }
  // Displays the player's playlist when the music app is selected
  displayMusic() {
    if (this.selected === "music") {
      camera.off()
      if (showSongs === 1) {
        fill(46, 106, 66)
        rect(this.x + this.bezel, this.y + this.bezel + 20, 65, 20);
        rect(this.x + this.bezel, this.y + this.bezel + 40, 65, 20);
        if (mouseX > this.x + this.bezel && mouseX < this.x + this.bezel + 65 && mouseY > this.y + this.bezel + 20 && mouseY < this.y + this.bezel + 40 || phoneSong1.isPlaying()) {
          fill(251, 223, 107) // If statements to make the text yellow is song is playing or hovered over
          textSize(8)
          text("BREAKFAST", this.x + this.bezel + 3, this.y + this.bezel * 2 + 25);
        }
        else{
          fill(255)
          textSize(8)
          text("BREAKFAST", this.x + this.bezel + 3, this.y + this.bezel * 2 + 25);
        }
        if (mouseX > this.x + this.bezel && mouseX < this.x + this.bezel + 65 && mouseY > this.y + this.bezel + 40 && mouseY < this.y + this.bezel + 60 || phoneSong2.isPlaying()) {
          fill(251, 223, 107)
          textSize(8)
          text("Breathe", this.x + this.bezel + 3, this.y + this.bezel * 2 + 45);
        }
        else{
          fill(255)
          textSize(8)
          text("Breathe", this.x + this.bezel + 3, this.y + this.bezel * 2 + 45);
        }
      if (friendTalkedToLake3 === true){
        fill(46, 106, 66)
        rect(this.x + this.bezel, this.y + this.bezel + 60, 65, 20);
        if (mouseX > this.x + this.bezel && mouseX < this.x + this.bezel + 65 && mouseY > this.y + this.bezel + 60 && mouseY < this.y + this.bezel + 80 || phoneSong3.isPlaying()) {
          fill(251, 223, 107)
          textSize(8)
          text("Cabin Fever", this.x + this.bezel + 3, this.y + this.bezel * 2 + 65);
        }
        else {
          fill(255)
          textSize(8)
          text("Cabin Fever", this.x + this.bezel + 3, this.y + this.bezel * 2 + 65);
        }
       }
      }
     }
     camera.on()
    }
  // Plays the selected song
  playMusic() {
    if (this.selected === "music") {
      camera.off()
      if (mouseX > this.x + this.bezel && mouseX < this.x + this.bezel + 65 && mouseY > this.y + this.bezel + 20 && mouseY < this.y + this.bezel + 40) {
        if (!phoneSong1.isPlaying()){
        phoneSong2.stop() // Ensures no other song is playing when player selects a song
        forestTheme.stop()
        lakeTheme.stop()
        townTheme.stop()
        phoneSong3.stop()
        phoneSong1.play()
        }
      }
      if (mouseX > this.x + this.bezel && mouseX < this.x + this.bezel + 65 && mouseY > this.y + this.bezel + 40 && mouseY < this.y + this.bezel + 60) {
        if (!phoneSong2.isPlaying()){
        phoneSong1.stop()
        forestTheme.stop()
        lakeTheme.stop()
        townTheme.stop()
        phoneSong3.stop()
        phoneSong2.play()
        }
      }
      if (mouseX > this.x + this.bezel && mouseX < this.x + this.bezel + 65 && mouseY > this.y + this.bezel + 60 && mouseY < this.y + this.bezel + 80) {
        if (!phoneSong3.isPlaying()){
        phoneSong1.stop()
        phoneSong2.stop()
        forestTheme.stop()
        lakeTheme.stop()
        townTheme.stop()
        phoneSong3.play()
        }
      }
      camera.on()
    }
  }
  // Displays the player's notes
  notes(){
    if (this.selected === "notes"){
      camera.off()
      fill(255)
      textSize(8)
      push()
      textStyle(BOLD);
      text("To Do List", this.x + this.bezel + 20, this.y + 18)
      pop()
      if (butcherTalkedTo === false){
      text(" - Go to the Butchery on time so you don't get another paycut", this.x + this.bezel + 3, this.y + 30, 66, 129)
      }
      else if (butcherTalkedTo === true){
        text(" - Collect the veal package and secretly bring it to the butchery", this.x + this.bezel + 3, this.y + 30, 66, 129)
      }
      text(" - Find happiness", this.x + this.bezel, this.y + 80, 66, 129)
    }
      camera.on()
  }
  // Returns from an app to the home screen/menu
  exit() {
    if (
      mouseX > this.x + this.bezel &&
      mouseX < this.x + this.bezel + 20 &&
      mouseY > this.y + this.bezel &&
      mouseY < this.y + this.bezel + 20
    ) {
      this.selected = "menu";
      phoneSong1.stop() // Songs stop playing when you exit the music app
      phoneSong2.stop()
      phoneSong3.stop()
      push();
      fill(57, 58, 56);
      rect(this.x, this.y, this.width, this.height, 5);
      image(this.screenImage, this.x + this.bezel, this.y + this.bezel);
      pop();
    }
  }
}
