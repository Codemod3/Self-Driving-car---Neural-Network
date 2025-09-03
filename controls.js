class Controls {
  constructor() {
    this.forward = false;
    this.backward = false;
    this.left = false;
    this.right = false;

    this.#addKeyboardListener();
  }

  #addKeyboardListener() {
    document.onkeydown = (event) => {
      switch (event.key) {
        case "a":
          this.left = true;
          break;
        case "w":
          this.forward = true;
          break;
        case "s":
          this.backward = true;
          break;
        case "d":
          this.right = true;
          break;
      }
    };

    document.onkeyup = (event) => {
      switch (event.key) {
        case "a":
          this.left = false;
          break;
        case "w":
          this.forward = false;
          break;
        case "s":
          this.backward = false;
          break;
        case "d":
          this.right = false;
          break;
      }
    };
  }
}
