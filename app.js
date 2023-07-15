const addbtn = document.querySelector("#addbtn")
const main = document.querySelector("#main")
const savenotes = () =>{
    const notes = document.querySelectorAll(".note textarea");
    console.log(notes);
    const data = [];
    notes.forEach(
        (note) => { 
            data.push(note.value)
        }
    )
    if(data.length === 0)
    localStorage.removeItem("notes");
    else{
        // console.log(data) add to local storage
    localStorage.setItem("notes",JSON.stringify(data))
    }    
}



addbtn.addEventListener(
    "click",
    function () {
        addnote()
    }
)



const addnote = (text = "") =>{
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
    <div class="tool">
    <i class="save fa-solid fa-floppy-disk"></i>
    <i class="trash fa-solid fa-trash"></i>
</div>
<textarea>${text}</textarea>
    `;

    // for delete
    note.querySelector(".trash").addEventListener(
        "click",
        function(){
            note.remove();
            savenotes();
        }
    )
    // save
    note.querySelector(".save").addEventListener(
        "click",
        function(){
            savenotes();
        }
    )
    note.querySelector("textarea").addEventListener(
        "focusout",
        function(){
            savenotes();
        }
    )
    main.appendChild(note);
    savenotes();
}

(
    function() {
        const lsnotes = JSON.parse(localStorage.getItem("notes"));
        if(lsnotes === null){
            addnote();
        }
        else{
            lsnotes.forEach(
                (lsnotes)=>{
                    addnote(lsnotes);
                }
            )
        }
    }
)()