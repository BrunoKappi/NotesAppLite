
var NumNotas = 0

var colors = ['#B03A2E', '#FA8072', '#2874A6', '#40E0D0', '#7B241C', '#7DCEA0', '#F6C667', '#B30753', '#ADA249']

var colorsCount = 0

getNotes()

var FirstNote = true

function AddNote() {

    document.getElementById("NoNotes").style.display = "none"

    var Nota = {
        id: 0,
        titulo: '',
        conteudo: '',
        cor: ''
    }

    //Criação dos Elementos
    var Notes = document.getElementById("Notes")
    var Note = document.createElement('div')
    var NoteHeader = document.createElement('div')
    var NoteBody = document.createElement('div')
    var InputHeader = document.createElement("input")
    var InputBody = document.createElement("textarea")
    var ButtonDelete = document.createElement("i")


    //Atribuição de Classes
    Note.className = 'Note'
    NoteHeader.className = 'NoteHeader'
    NoteBody.className = 'NoteBody'
    InputBody.className = "InputBody"
    InputHeader.className = "InputHeader"
    ButtonDelete.classList.add("Delte")
    ButtonDelete.classList.add("fa-solid")
    ButtonDelete.classList.add("fa-trash")

    //Atribuição de ID´s
    var ID = "Nota" + NumNotas
    Note.id = ID
    InputBody.id = "InputBody" + ID
    InputHeader.id = "InputHeader" + ID
    ButtonDelete.id = "ButtonDelete" + ID

    //Cores
    NoteHeader.style.backgroundColor = colors[colorsCount]
    Note.style.border = '2px solid ' + colors[colorsCount]

    //PLaceholder
    InputHeader.placeholder = "Titulo"
    InputBody.placeholder = "Conteudo da sua Nota"

    //Funções
    InputHeader.onchange = function () { InputHeaderChange(this.id); }
    InputBody.onchange = function () { InputBodyChange(this.id); }
    ButtonDelete.onclick = function () { DeleteNote(this.id); }

    //Appends        
    NoteHeader.appendChild(InputHeader)
    NoteHeader.appendChild(ButtonDelete)
    NoteBody.appendChild(InputBody)
    Note.appendChild(NoteHeader)
    Note.appendChild(NoteBody)
    Notes.appendChild(Note)

    Nota.id = ID
    Nota.cor = colors[colorsCount]
    Notas.push(Nota)

    NumNotas++
    if (++colorsCount >= colors.length)
        colorsCount = 0

    saveNotes()

}



function InputHeaderChange(ID) {

    var IDNota = ID.replace('InputHeader', '')



    Notas.map((Nota, i) => {
        if (Nota.id == IDNota) {
            Notas[i].titulo = document.getElementById(ID).value
            saveNotes()
        }
    })

}


function InputBodyChange(ID) {

    var IDNota = ID.replace('InputBody', '')

    Notas.map((Nota, i) => {
        if (Nota.id == IDNota) {
            Notas[i].conteudo = document.getElementById(ID).value
            saveNotes()
        }
    })
}

function RemoveAll() {
    document.getElementById("Notes").innerHTML = ''
    Notas = []
    saveNotes()
    getNotes()
    colorsCount = 0
    NumNotas = 0
}

function DeleteNote(ID) {

    var IDNota = ID.replace('ButtonDelete', '')

    Notas.map((Nota, i) => {
        if (Nota.id == IDNota)
            Notas.splice(i, 1)
        saveNotes()
        document.getElementById("Notes").innerHTML = ''
        getNotes()
    })

}



function saveNotes() {

    if (Notas.length >= 1)
        localStorage.setItem('Notas', JSON.stringify(Notas))
    else localStorage.clear()

}


function getNotes() {

    if (localStorage.getItem('Notas')) {
        if (JSON.parse(localStorage.getItem('Notas')).filter(Nota => { return Nota.titulo || Nota.conteudo }).length > 0) {
            document.getElementById("NoNotes").style.display = "none"

            Notas = JSON.parse(localStorage.getItem('Notas')).filter(Nota => { return Nota.titulo || Nota.conteudo })
            NumNotas = Notas.length

            Notas.map(Nota => {
                AddNoteLoop(Nota.id, Nota.titulo, Nota.conteudo, Nota.cor)
            })

            var LastColor = Notas[Notas.length - 1].cor

            colors.map((color, i) => {
                if (color == LastColor)
                    colorsCount = i + 1
            })

        } else {
            Notas = []
            document.getElementById("NoNotes").style.display = "inline"
        }


    } else {
        Notas = []
        document.getElementById("NoNotes").style.display = "inline"
    }

}





function AddNoteLoop(idParam, TituloParam, ConteudoParam, CorParam) {

    //Criação dos Elementos
    var Notes = document.getElementById("Notes")
    var Note = document.createElement('div')
    var NoteHeader = document.createElement('div')
    var NoteBody = document.createElement('div')
    var InputHeader = document.createElement("input")
    var InputBody = document.createElement("textarea")
    var ButtonDelete = document.createElement("i")

    //Notes.innerHTML = "XXXXXXXXX"

    //Atribuição de Classes
    Note.className = 'Note'
    NoteHeader.className = 'NoteHeader'
    NoteBody.className = 'NoteBody'
    InputBody.className = "InputBody"
    InputHeader.className = "InputHeader"
    ButtonDelete.classList.add("Delte")
    ButtonDelete.classList.add("fa-solid")
    ButtonDelete.classList.add("fa-trash")

    //Atribuição de ID´s
    var ID = idParam
    Note.id = ID
    InputBody.id = "InputBody" + ID
    InputHeader.id = "InputHeader" + ID
    ButtonDelete.id = "ButtonDelete" + ID



    //Cores
    NoteHeader.style.backgroundColor = CorParam
    Note.style.border = '2px solid ' + CorParam

    //PLaceholder
    if (TituloParam)
        InputHeader.value = TituloParam
    else
        InputHeader.placeholder = 'Titulo'

    if (ConteudoParam)
        InputBody.value = ConteudoParam
    else
        InputBody.placeholder = 'Conteúdo'

    //Funções
    InputHeader.onchange = function () { InputHeaderChange(this.id); }
    InputBody.onchange = function () { InputBodyChange(this.id); }
    ButtonDelete.onclick = function () { DeleteNote(this.id); }

    NoteHeader.appendChild(InputHeader)
    NoteHeader.appendChild(ButtonDelete)
    NoteBody.appendChild(InputBody)
    Note.appendChild(NoteHeader)
    Note.appendChild(NoteBody)
    Notes.appendChild(Note)

    NumNotas++
    if (++colorsCount >= colors.length)
        colorsCount = 0



}
