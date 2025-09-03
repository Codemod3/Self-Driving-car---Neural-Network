class Controls {
  constructor(type) {
    this.forward = false;
    this.backward = false;
    this.left = false;
    this.right = false;

    switch (type) {
      case "KEYS":
        this.#addKeyboardListener();
        break;
      case "DUMMY":
        this.forward = true;
        break;
    }
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
