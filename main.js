
function formateoNum(elemento) {
    elemento.addEventListener('change', function () {
        let variable = parseFloat(this.value.replace(",", "."))
        this.value = variable.toFixed(1)
        isNaN(this.value) ? this.value = "" : console.log("es numero")
    })
}



const getProductos = async (url) => {
    const res = await fetch(url)
    const json = await res.text()
    return json
    //console.log(json)
}



function cargarSelect(elemento, array, url, coleccion1, coleccion2) { // [select, array, urlbackend, {col1: "bla", col2: "blablabla"}]
    const defecto = () => {
        array.forEach(function (e) {
            let option = document.createElement("option")
            //console.log(e[0][coleccion1])
            option.value = e[0][coleccion1]
            option.text = e[0][coleccion1]
            option.setAttribute("precio", e[0][coleccion2])
            elemento.appendChild(option)


        })
    }

    array.length == 0 ?


        getProductos(url).then(p => {
            //console.log(JSON.parse(p))
            let parseado = JSON.parse(p)
            let i = 0
            parseado.forEach(e => {
                array[i] = []
                array[i].push({ [coleccion1]: e.nombre, [coleccion2]: e.precio })
                i++
                //console.log(e.nombre)
            })
            //console.log(array[1][0].nombre)
            //console.log(array)
            defecto()

        })
        :
        defecto()
}




function cargarSelectEstaticos(elemento, array) { //[select, ["el1", "el2", "el3", etc etc...]]

    array.forEach(function (e) {
        let option = document.createElement("option")
        option.value = e
        option.text = e
        //option.setAttribute("texto", e)

        elemento.appendChild(option)
    })


}




let add = (div, contenedor, labelPrincipal, ...elementos) => {
    div.appendChild(labelPrincipal)
    elementos.forEach(el => {
        div.appendChild(el)
    })
    contenedor.appendChild(div)
}




function estilizar(css, ...elementos) {
    elementos.forEach(x => {
        x.setAttribute("style", css)
    })
}







function dataWathsapp(...elementos) {
    const cant = elementos.length
    const cant2 = elementos[0].length
    let flag = 0, txt = ""
    let resultado = []
    //console.log(elementos[0].length) //classname = productos
    //console.log(elementos[1].length)  //classname = cantidades

    //inicializamos array con arrays dentro.
    for (let d = 0; d < cant2; d++) {
        resultado[d] = []
    }

    for (let i = 0; i < cant2; i++) {
        for (let z = 0; z < cant; z++) {
            //console.log(elementos[z][i].value)
            if (elementos[z][i].value == "") {
                flag = 1
                break
            } else {
                resultado[i].push(elementos[z][i].value)
            }
        }
    }
    if (flag == 1) {
        alert("error: DEBE COMPLETAR TODOS LOS CAMPOS !!! 👮‍♂️")
    } else {
        return resultado
    }

}




// enviar por getelementsbyclassname, 2 tipos de  elementos, uno select de producto, que contiene propiedad con el precio del producto en el option, y otro input text que contiene la cantidad.
function cotizacion(...elementos) {
    let suma = 0
    let i = 0

    for (let e of elementos[0]) {

        let id = e.id
        let prod = document.getElementById(id)
        let precio = prod.options[prod.selectedIndex].getAttribute('precio')
        //console.log(precio)

        //console.log(elementos[1])
        let idcant = elementos[1][i].getAttribute('id')
        let cantidad = document.getElementById(idcant).value
        //console.log(cantidad)

        suma += cantidad * precio

        i++
    }

    //console.log(suma)
    return suma * 1.21
}





function Labelizar(array, arrayLabels) {  //  [[prod, cant, asent], [prod, cant, asent]]
    let it = 0, it2 = 0, arr = []

    for (let i of array) {
        arr[it2] = []   // genero un slot array en esa posicion
        it = 0
        for (let z of i) {
            if (arrayLabels[it].includes(z)) {
                //console.log(arrayLabels[it] + " " + "no definido.")
                arr[it2].push(arrayLabels[it] + " " + "no definido.")

            } else {
                //console.log(arrayLabels[it] + " " + z)
                arr[it2].push(arrayLabels[it] + " " + z)
            }
            it++
        }
        it2++
    }
    //console.log(arr)
    return arr
}






function enviarWathsapp(array, cotizacion, palabra, unidadMedida) {   //  [[producto :  H° Elaborado H40\r\n], ["cantidad :  6.0"]]
    let txt = ""
    let txt2 = ""
    let url = ""

    for (let a of array) {
        for (let b of a) {
            txt += b.includes(palabra) ? b + " " + unidadMedida + "%0a" : b + "%0a" // %0a es salto de linea en wathsapp api
        }
        txt += "%0a %0a"
    }
    txt2 += "%0a" + "¿¿ enviar wathsapp con el pedido ??"
    console.log(txt)
    if (confirm("SU PEDIDO ES: \n\n" + txt.replace(/%0a/g, '\n') + txt2.replace(/%0a/g, '\n'))) {
        url = "https://api.whatsapp.com/send?text=" + txt + '%0a%0a%0a%0a%0a%0a%0a%0a%0a' + cotizacion + "&phone=5493624225232"
        window.location.href = url
    }
}




function Responsive(width, fondo, objEvento, evento, ...campos) {
    objEvento.addEventListener(evento, function () {
        if (screen.width <= width) {
            //console.log(...campos)
            console.log("tamaño: " + screen.width)
            for (let c of campos) {
                for (let i = 0; i < c.length; i++) {
                    c[i].style.height = "40px"
                    c[i].style.width = "250px"
                    c[i].style.fontSize = "25px"
                }
            }

            console.log("si")
            //  fondo.style.backgroundSize = "350%"
            //fondo.style.backgroundResolution="1350%"
            fondo.style.backgroundImage = 'url("fondo2.jpg")'
        } else {
            console.log("no")
            fondo.style.backgroundImage = 'url("fondo.jpg")'
            //width="135" height="35"
        }
    })

}




function scrollAbajo() {
    if (screen.width <= 1080) {
        window.scrollTo(0, document.body.scrollHeight)   //  scroll al final de la pagina
        document.getElementById("botoneras").style.width = "100%"
        /*     document.getElementById("pedir").style.right="40px"
            document.getElementById("pedir").style.bottom="150px"
            document.getElementById("pedir").style.paddingLeft="20px" */
    }
}










function addCampos(contenedor, array, css) {

    let iterador = 0
    let a = ["aplicacion", "PAVIMENTO", "LOSA", "TABIQUE"]
    let as = ["asentamiento", "3 cm", "5 cm", "10 cm", "15 cm", "20 cm"]
    let tmn = ["TMN agreg. grueso", "19", "30"]
    let bom = ["servicio bomba", "SI", "NO"]

    return function closure() {
        let producto = document.createElement("select")
        let cantidad = document.createElement("input")
        let aplicacion = document.createElement("select")
        let asentamiento = document.createElement("select")
        let tamanoMaxNom = document.createElement("select")
        let bomba = document.createElement('select')
        let btnEliminar = document.createElement("button")
        let div = document.createElement("div")
        let labelPrincipal = document.createElement("span")
        let nodo = document.createTextNode("Producto " + (iterador + 1))

/*         let option = document.createElement("option")
        option.value = "h"
        option.text = "h"
        producto.appendChild(option) */


        labelPrincipal.appendChild(nodo)
        labelPrincipal.style.color = "red"
        div.setAttribute("class", "contenedor_items")
        div.id = "di" + iterador
        producto.id = "p" + iterador, producto.className = "prod",
            cantidad.id = "c" + iterador, cantidad.type = "text", cantidad.className = "cant", cantidad.placeholder = "Cantidad 0.0", cantidad.pattern = "\d*"
        aplicacion.id = "a" + iterador, aplicacion.className = "apl"
        asentamiento.id = "as" + iterador, asentamiento.className = "as"
        tamanoMaxNom.id = "tmn" + iterador, tamanoMaxNom.className = "tmn"
        bomba.id = "bom" + iterador, bomba.className = "bom"

        cargarSelectEstaticos(aplicacion, a)
        cargarSelectEstaticos(asentamiento, as)
        cargarSelectEstaticos(bomba, bom)
        cargarSelectEstaticos(tamanoMaxNom, tmn)

        btnEliminar.id = "e" + iterador
        btnEliminar.appendChild(document.createTextNode('ELIMINAR'))
        btnEliminar.setAttribute("class", "btnEliminar")


        // btnEliminar.insertAdjacentHTML("beforebegin","<i class='fa fa-trash'></i>")

        add(div, contenedor, labelPrincipal, producto, cantidad, aplicacion, asentamiento, tamanoMaxNom, bomba, btnEliminar)

        estilizar(css, cantidad, producto, aplicacion, asentamiento, tamanoMaxNom, bomba, btnEliminar)




        document.getElementById(`e${iterador}`).addEventListener("click", function (e) {
            //console.log(e.target.parentElement.id)
            e.preventDefault()
            document.getElementById(e.target.parentElement.id).className = "fadeOutRight" // animacion css
            setTimeout(() => {
                e.target.parentElement.remove()
            }, 800)
        })

        //contenedor.insertAdjacentHTML('beforeend', "<br><br>")

        let campo = document.getElementById(cantidad.id)
        formateoNum(campo)


        cargarSelect(producto, array, 'backend.php', 'precio', 'nombre')

        iterador = iterador + 1
    }

}









//instancias

let arrayProductos = []

let cont = document.getElementById("contenedor")
let margenLeft = '10px'
let margenTop = '10px'
let colorCeldas = '#ffe8a8'
let tamFuente = '15px'
let miCSS = `font-size: ${tamFuente}; margin-left: ${margenLeft}; margin-top: ${margenTop};`

const addcampos = addCampos(cont, arrayProductos, miCSS)

let formulario = document.getElementById("formulario")

addcampos()
scrollAbajo()

let elemento = document.getElementsByClassName("prod")
let elemento2 = document.getElementsByClassName("cant")
let elemento3 = document.getElementsByClassName("apl")
let elemento4 = document.getElementsByClassName("as")
let elemento5 = document.getElementsByClassName("tmn")
let elemento6 = document.getElementsByClassName("bom")


document.getElementById("agregar").addEventListener("click", function (e) {
    addcampos()
    scrollAbajo()
})




document.getElementById("pedir").addEventListener("click", function () {

    const datawsap = dataWathsapp(elemento, elemento2, elemento3, elemento4, elemento5, elemento6)
    const enviarwsap = enviarWathsapp
    const arraylab = ["producto : ", "cantidad: ", "aplicacion : ", "asentamiento : ", "TMN agreg. grueso: ", "servicio bomba : "]

    enviarwsap(Labelizar(datawsap, arraylab), cotizacion(elemento, elemento2), "cantidad", "M3")


})


let fondo = document.body
Responsive(1080, fondo, window, "load", elemento, elemento2, elemento3, elemento4, elemento5, elemento6)
Responsive(1080, fondo, document.getElementById("agregar"), "click", elemento, elemento2, elemento3, elemento4, elemento5, elemento6)



