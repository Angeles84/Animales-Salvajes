import Animal from './animal.js'


class Leon extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }

  Rugir(player) {
    player.src = `./assets/sounds/Rugido.mp3`;
    player.load();
    player.play();
  }
}

class Lobo extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }

  Aullar() {
    player.src = `./assets/sounds/Aullido.mp3`;
    player.load();
    player.play();
  }
}

class Oso extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }

  Gruñir(player) {
    player.src = `./assets/sounds/Gruñido.mp3`;
    player.load();
    player.play()
  }
}

class Serpiente extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }

  Sisear(player) {
    player.src = `./assets/sounds/Siseo.mp3`;
    player.load();
    player.play();
  }
}

class Aguila extends Animal {
  constructor (nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }

  Chillar(player) {
    player.src = `./assets/sounds/Chillido.mp3`;
    player.load();
    player.play();
  }
}

export {
  Aguila,
  Serpiente,
  Lobo,
  Leon,
  Oso
}