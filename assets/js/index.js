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
  
  //Cuando el selector cambie 
  animalSelect.addEventListener("change", () => {
    const nombreDelAnimalElegido = animalSelect.value;
    const animalEncontrado = animales.find((animal) => animal.name === nombreDelAnimalElegido);

    imgPreview.setAttribute("src", `./assets/imgs/${animalEncontrado.imagen}`);
  });

  //Para crear cards por cada uno
  function updateView() {
    AnimalesDIV.innerHTML = "";
    AnimalesEnInvestigacion.forEach((animal, i) => {
      const DIVImagenAnimal = document.createElement("div");
      const DIVBarraSonido = document.createElement("div");
      DIVImagenAnimal.innerHTML = `
      <img type ="button" style="width: 10rem;" src="./assets/imgs/${animal.img}" class="img-fluid" data-bs-target="#${animal.nombre}-${i}">`;

      DIVBarraSonido.innerHTML = `
      <div class="card-body p-1">  
        <img class="p-1" height="30rem" src="./assets/imgs/audio.svg"/>
      </div>
      `;
      
      //Abrir el modal
      DIVImagenAnimal.addEventListener("click", () => {
        $("#modal").modal("show");
        const modalBody = document.querySelector("#modal-body");

        modalBody.innerHTML = `
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
      `;
      });
      
      //Activar el sonido
      DIVBarraSonido.addEventListener("click", () => {
        console.log("play", animal);
        const player = document.querySelector("#player");

        if (animal.nombre === "Leon") {
          animal.Rugir(player);
        } else if (animal.nombre === "Lobo") {
          animal.Aullar(player);
        } else if (animal.nombre === "Oso") {
          animal.Gruñir(player);
        } else if (animal.nombre === "Serpiente") {
          animal.Sisear(player);
        } else if (animal.nombre === "Aguila") {
          animal.Chillar(player);
        }
      });
      
      //crear el div padre de la card
      const ContainerDIV = document.createElement("div");
      ContainerDIV.classList.add("card", "text-white", "bg-secondary", "m-3");
      //Agregar el div de la imágen y el div del sonido en la card
      ContainerDIV.appendChild(DIVImagenAnimal);
      ContainerDIV.appendChild(DIVBarraSonido);
      AnimalesDIV.appendChild(ContainerDIV);
    });
  }

 
  // Al hacer click en agregar se crean las instancias
  btnRegistrar.addEventListener("click", (event) => {
    let nombre = animalSelect.value;
    let edad = edadSelect.value;
    let comentarios = comentariosTextArea.value;

    const { imagen, sonido } = animales.find((animal) => animal.name === nombre);
    
    const args = [nombre, edad, imagen, comentarios, sonido];

    if (animalSelect.value === "Leon") {
      const leoncio = new Leon(...args);
      AnimalesEnInvestigacion.push(leoncio);

    } else if (animalSelect.value === "Lobo") {
      const lobezno = new Lobo(...args);
      AnimalesEnInvestigacion.push(lobezno);

    } else if (animalSelect.value === "Oso") {
      const osito = new Oso(...args);
      AnimalesEnInvestigacion.push(osito);

    } else if (animalSelect.value === "Serpiente") {
      const culebra = new Serpiente(...args);
      AnimalesEnInvestigacion.push(culebra);

    } else if (animalSelect.value === "Aguila") {
      const pajarraco = new Aguila(...args);
      AnimalesEnInvestigacion.push(pajarraco);

    } else {
      alert("Por favor completar todos los campos");
    }

    limpiarForm(animalSelect, edadSelect,comentariosTextArea )

    updateView();
  });
})();

//dejar el formulario en blanco cada vez que se agregue una card
const limpiarForm = (nombre, edad, comentarios) => {
  nombre.value = "Seleccione un animal";
  edad.value = "Seleccione un rango de años";
  comentarios.value = "";
  const imgPreview = document.querySelector("#preview");
  imgPreview.setAttribute("src" ,"./assets/imgs/lion.svg" );
}
