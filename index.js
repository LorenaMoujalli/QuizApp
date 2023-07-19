//Preguntas y respuestas
const preguntas = [

    {
        pregunta: "¿Qué país ganó la Copa Mundial de Fútbol 2018?",
        respuestas:[
            { text: "Brasil", correct: false},
            { text: "Alemania", correct: false},
            { text: "Francia", correct: true},
            { text: "Argentina", correct: false},
        ]
    },
    {
        pregunta: "¿Cuánto es la raíz cuadrada de 25?",
        respuestas:[
            { text: "2", correct: false},
            { text: "5", correct: true},
            { text: "7", correct: false},
            { text: "10", correct: false},
        ] 
    },
    {
        pregunta: "¿Quién pintó la famosa obra 'La Mona Lisa'?",
        respuestas:[
            { text: "Vincent van Gogh", correct: false},
            { text: "Pablo Picasso", correct: false},
            { text: "Leonardo da Vinci", correct: true},
            { text: "Salvador Dalí", correct: false},
        ]
    },
    {
        pregunta: "¿Quién dirigió la película 'Pulp Fiction'?",
        respuestas:[
            { text: "Quentin Tarantino", correct: true},
            { text: "Martin Scorsese", correct: false},
            { text: "Steven Spielberg", correct: false},
            { text: "Christopher Nolan", correct: false},
        ]
    },
    {
        pregunta: "¿Cuál es el deporte más popular en Estados Unidos?",
        respuestas:[
            { text: "Fútbol americano", correct: true},
            { text: "Béisbol", correct: false},
            { text: "Baloncesto", correct: false},
            { text: "Hockey sobre hielo", correct: false},
        ]
    },
    {
        pregunta: "¿Cuál es el resultado de la siguiente operación matemática? 8 + (3 x 2) - 4",
        respuestas:[
            { text: "10", correct: true},
            { text: "12", correct: false},
            { text: "14", correct: false},
            { text: "16", correct: false},
        ]
    },
    {
        pregunta: "¿Cuál de las siguientes obras no fue creada por el escultor Miguel Ángel?",
        respuestas:[
            { text: "David", correct: false},
            { text: "La Piedad", correct: false},
            { text: "El Beso", correct: true},
            { text: "Moisés", correct: false},
        ]
    },
    {
        pregunta: "¿Cuál de las siguientes películas ganó el premio Óscar a la Mejor Película en 2020?",
        respuestas:[
            { text: "Parasite", correct: true},
            { text: "Joker", correct: false},
            { text: "1917", correct: false},
            { text: "The Shape of Water", correct: false},
        ]
    }
];


const preg = document.getElementById("pregunta"); //pregunta
const botonRespuestas= document.getElementById("boton"); //botones de las respuestas
const siguiente = document.getElementById("siguiente"); //boton siguiente

let pregActual =0; //posicion de la pregunta actual
let score= 0; //puntuacion

//funcion empezar quiz

function empezar(){
    resetState(); //resetear
    pregActualIndex =0; //indice de la pregunta
    score= 0;
    siguiente.innerHTML="Siguiente";  // innerHTML: propiedad de los elementos DOM en JavaScript que permite obtener o establecer el contenido HTML de un elemento. En este caso el boton tendra el texto "siguiente"
    mostrarPregunta(); 
}

//funcion para mostrar pregunta

function mostrarPregunta(){
    resetState(); 
let pregActual= preguntas[pregActualIndex]; 
let preguntaNo= pregActualIndex + 1; 
preg.innerHTML=preguntaNo + ". " + pregActual.pregunta;

pregActual.respuestas.forEach(respuesta =>{  //forEach: metodo para recorrer elementos de un arreglo
const button= document.createElement("button"); //createElement: método que se utiliza para crear un nuevo elemento HTML. En este caso button
button.innerHTML= respuesta.text; //mostrar las respuestas en los botones
button.classList.add("item"); // classList.add: método que se utiliza en JavaScript para agregar una o varias clases CSS a un elemento del DOM. En este caso se le agregara al elemento button la clase item
botonRespuestas.appendChild(button); //appendChild: método que se utiliza en JavaScript para agregar un nuevo nodo (elemento) como hijo de otro nodo existente en el DOM
if(respuesta.correct){ //si la respuesta es true
    button.dataset.correct=respuesta.correct; //dataset:propiedad que se utiliza para acceder a los atributos de datos personalizados (data attributes) definidos en elementos HTML
}
button.addEventListener("click", seleccionar) //al hacer click al boton se llama la funcion seleccionar
});
}


function resetState(){
    siguiente.style.display="none"; //el boton siguiente cambia su estilo a display none
    while(botonRespuestas.firstChild){ //firstChild es una propiedad que se utiliza en JavaScript para acceder al primer nodo hijo de un elemento del DOM
        botonRespuestas.removeChild(botonRespuestas.firstChild); //removeChild: método que se utiliza en JavaScript para eliminar un nodo hijo específico de un elemento del DOM. 
    }
}

function seleccionar(e){
    const select= e.target; //target es una propiedad que se utiliza para acceder al elemento del DOM en el que se originó el evento
    const correcto= select.dataset.correct ==="true"; //respuesta correcta 
    if(correcto){ //si correcto es true
        select.classList.add("correct"); //la respuesta seleccionada es correcta
        score++; //puntuacion aumenta uno
    }
    else{
        select.classList.add("incorrect"); //sino es incorrecta
    }
    Array.from(botonRespuestas.children).forEach(button =>{ // Array.from: método permite convertir cualquier objeto iterable o array-like en un array real, en este caso a botonRespuestas. children: se utiliza para acceder a una colección de los elementos hijos de un elemento del DOM
        if(button.dataset.correct === "true"){ 
            button.classList.add("correct");
        }
        button.disabled= true;
    });
    siguiente.style.display="block"; // se muestra el boton siguiente
}


//funcion para mostrar puntuacion
function mostrarScore(){
    resetState();
    preg.innerHTML= ` ¡Felicidades por completar la prueba! Tu puntuación final es ${score}/8. Continúa desafiándote a ti mismo y mejorando tus habilidades. ¡Sigue así!`; 
    
    siguiente.innerHTML = "Jugar otra vez"; //cambiar el texto del boton de "siguiente" a "jugar otra vez"
    siguiente.style.display="block"; //cambiar el estilo del boton siguiente de none  block
}


function  mostrarSiguientePreg(){
    pregActualIndex++; //indice de la pregunta actual pasa a la siguiente posicion
    if(pregActualIndex < preguntas.length){ //si es menor, es decir, hay mas preguntas
    mostrarPregunta(); //entonces mostrarla
    }
    else{
        mostrarScore(); //sino mostrar puntuacion
    }

}

siguiente.addEventListener("click", ()=>{ //al hacer click en el boton siguiente
    if(pregActualIndex < preguntas.length){ //si hay mas preguntas
        mostrarSiguientePreg(); //mostrar la siguiente pregunta
    }
    else{
        empezar(); //sino empezar nuevamente
    }
});

empezar();