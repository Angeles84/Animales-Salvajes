import {
  Aguila,
  Leon,
  Lobo,
  Oso,
  Serpiente
} from './animales.js'


(async function () {
  const Request = await fetch("/animales.json");
  const {animales} = await Request.json();

  const animalSelect = document.querySelector("#animal");
  const edadSelect = document.querySelector("#edad");
  const comentariosTextArea = document.querySelector("#comentarios");
  const imgPreview = document.querySelector("#preview");
  const btnRegistrar = document.querySelector("#btnRegistrar");
  const AnimalesDIV = document.querySelector("#Animales");

  const AnimalesEnInvestigacion = [];

  animalSelect.addEventListener("change", () => {
    const nombreDelAnimalElegido = animalSelect.value;
    const animalEncontrado = animales.find((animal) => animal.name === nombreDelAnimalElegido);

    imgPreview.setAttribute("src", `./assets/imgs/${animalEncontrado.imagen}`);
  });

  const modal = document.querySelector("#modal");
  const modalBody = document.querySelector("#modal-body");

  function openModalWith(something) {
    modalBody.innerHTML = something;
    $(modal).modal("show");
  }


  function updateView() {
    AnimalesDIV.innerHTML = "";
    AnimalesEnInvestigacion.forEach((animal, i) => {
      const DIVImagenAnimal = document.createElement("div");
      const DIVBarraSonido = document.createElement("div");
      DIVImagenAnimal.innerHTML = `
      <img type ="button "style="width: 10rem;" src="./assets/imgs/${animal.img}" class="card-img-top img-fluid" data-bs-toggle="modal" data-bs-target="#${animal.nombre}-${i}">`;

      DIVBarraSonido.innerHTML = `
      <div class="card-body p-1">  
        <img class="p-1" height="30rem" src="./assets/imgs/audio.svg"/>
      </div>
      `;

      DIVImagenAnimal.addEventListener("click", openModalOnClick(animal));
      DIVBarraSonido.addEventListener("click", playSoundOnClick(animal));

      const ContainerDIV = document.createElement("div");
      ContainerDIV.classList.add("card", "text-white", "bg-secondary", "m-3");
      ContainerDIV.appendChild(DIVImagenAnimal);
      ContainerDIV.appendChild(DIVBarraSonido);
      AnimalesDIV.appendChild(ContainerDIV);
    });
  }

 
  function playSoundOnClick(instance) {
    console.log("play", instance);
    const player = document.querySelector("#player");
    return function (event) {
      console.log("call click event");
      if (instance.nombre === "Leon") {
        instance.Rugir(player);
      } else if (instance.nombre === "Lobo") {
        instance.Aullar(player);
      } else if (instance.nombre === "Oso") {
        instance.Gruñir(player);
      } else if (instance.nombre === "Serpiente") {
        instance.Sisear(player);
      } else if (instance.nombre === "Aguila") {
        instance.Chillar(player);
      }
    };
  }


  function openModalOnClick(animal) {
    return function (event) {
      openModalWith(`
        <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h5 class="modal-title" id="exampleModalLabel">${animal.nombre}</h5>   
        <hr>
        <img src="./assets/imgs/${animal.img}" class="img-fluid">
        <hr>
        <h5>Edad</h5>
        <p>${animal.edad}</p>
        <hr>
        <h5>Comentarios</h5>
        <p class="mb-0">${animal.Comentarios}</p>     
      `);
    };
  }

  btnRegistrar.addEventListener("click", (event) => {
    const animalEncontrado = animales.find((animal) => animal.name === animalSelect.value);
    const imgAnimal = animalEncontrado.imagen;
    let btnSonido =animalEncontrado.sonido;
    
    const args = [animalSelect.value, edadSelect.value, imgAnimal, comentariosTextArea.value, btnSonido];
    let instance;

    if (animalSelect.value === "Leon") {
      instance = new Leon(...args);
    } else if (animalSelect.value === "Lobo") {
      instance = new Lobo(...args);
    } else if (animalSelect.value === "Oso") {
      instance = new Oso(...args);
    } else if (animalSelect.value === "Serpiente") {
      instance = new Serpiente(...args);
    } else if (animalSelect.value === "Aguila") {
      instance = new Aguila(...args);
    } else {
      alert("Por favor completar todos los campos");
    }

    AnimalesEnInvestigacion.push(instance);
    limpiarForm(animalSelect, edadSelect,comentariosTextArea )

    updateView();
  });
})();

const limpiarForm = (nombre, edad, comentarios) => {
  nombre.value = "Seleccione un animal";
  edad.value = "Seleccione un rango de años";
  comentarios.value = "";
  const imgPreview = document.querySelector("#preview");
  imgPreview.setAttribute("src" ,"./assets/imgs/lion.svg" );
}
