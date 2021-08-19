
function formateoNum(elemento) {
    elemento.addEventListener('change', function () {
        let variable = parseFloat(this.value.replace(",", "."))
        this.value = variable.toFixed(1)
        isNaN(this.value) ? this.value = "" : console.log("es numero")
    })
}



const getProductos = async (url) => {
    const res = await fetch(url)
    const json = await res.json().then()
    return json
}



function cargarSelect(elemento, array, url) {
    const defecto = () => {
        array.forEach(function (e) {
            let option = document.createElement("option")
            option.value = e
            option.text = e
            elemento.appendChild(option)
        })
    }

    array.length == 0 ?

        getProductos(url).then(p => {
            p.forEach(e => {
                array.push(e)
            })

            defecto()

        })
        :
        defecto()
}





let add = (div, contenedor, ...elementos) => {
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



function addCampos(contenedor, array, css) {

    let iterador = 0
    let a = ["aplicacion", "PAVIMENTO", "LOSA", "TABIQUE"]
    let as = ["asentamiento", "3 cm", "5 cm", "10 cm", "15 cm", "20 cm"]
    let bom = ["servicio bomba", "SI", "NO"]

    return function closure() {
        let producto = document.createElement("select")
        let cantidad = document.createElement("input")
        let aplicacion = document.createElement("select")
        let asentamiento = document.createElement("select")
        let bomba = document.createElement('select')
        let btnEliminar = document.createElement("button")
        let div = document.createElement("div")
        

        div.setAttribute("class", "contenedor_items")
        div.id="di"+iterador
        producto.id = "p" + iterador, producto.className = "prod"
        cantidad.id = "c" + iterador, cantidad.type = "text", cantidad.className = "cant", cantidad.placeholder = "Cantidad 0.0"
        aplicacion.id = "a" + iterador, aplicacion.className = "apl"
        asentamiento.id = "as" + iterador, asentamiento.className = "as"
        bomba.id = "bom" + iterador, bomba.className = "bom"

        cargarSelect(aplicacion, a)
        cargarSelect(asentamiento, as)
        cargarSelect(bomba, bom)

        btnEliminar.id = "e" + iterador
        btnEliminar.appendChild(document.createTextNode('ELIMINAR'))
        btnEliminar.setAttribute("class", "btnEliminar")



        // btnEliminar.insertAdjacentHTML("beforebegin","<i class='fa fa-trash'></i>")

        add(div, contenedor, producto, cantidad, aplicacion, asentamiento, bomba, btnEliminar)
  
        estilizar(css, cantidad, producto, aplicacion, asentamiento, bomba, btnEliminar)

       
        document.getElementById(`e${iterador}`).addEventListener("click", function (e) {
            //console.log(e.target.parentElement.id)
            e.preventDefault()
            document.getElementById(e.target.parentElement.id).className="fadeOutRight" // animacion css
            setTimeout(() => {
                e.target.parentElement.remove()
            }, 800)
        })

        //contenedor.insertAdjacentHTML('beforeend', "<br><br>")

        let campo = document.getElementById(cantidad.id)
        formateoNum(campo)

        cargarSelect(producto, array, 'backend.php')

        iterador = iterador + 1
    }

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






function enviarWathsapp(array, palabra, unidadMedida) {   //  [[producto :  H° Elaborado H40\r\n], ["cantidad :  6.0"]]
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
        url = "https://api.whatsapp.com/send?text=" + txt + "&phone=543704768485"
        window.location.href = url
    }
}




function Responsive(width, fondo, ...campos) {
    window.addEventListener("resize", function () {
        if (screen.width <= width) {
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

document.getElementById("agregar").addEventListener("click", function () {

    addcampos()

})


let elemento = document.getElementsByClassName("prod")
let elemento2 = document.getElementsByClassName("cant")
let elemento3 = document.getElementsByClassName("apl")
let elemento4 = document.getElementsByClassName("as")
let elemento5 = document.getElementsByClassName("bom")

document.getElementById("pedir").addEventListener("click", function () {



    const datawsap = dataWathsapp(elemento, elemento2, elemento3, elemento4, elemento5)
    const enviarwsap = enviarWathsapp
    const arraylab = ["producto : ", "cantidad: ", "aplicacion : ", "asentamiento : ", "servicio bomba : "]

    enviarwsap(Labelizar(datawsap, arraylab), "cantidad", "M3")
})


let fondo = document.body

Responsive(1080, fondo, elemento, elemento2, elemento3, elemento4, elemento5)
