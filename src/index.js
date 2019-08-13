document.addEventListener('DOMContentLoaded', () => {
    const dogTable = document.body.querySelector('#table-body')
    const dogForm = document.body.querySelector('#dog-form')
    let currentId = 0

    fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(function(json) {
        console.log(JSON.stringify(json))
        json.forEach(function (dog){
            const html = `<tr id="${dog.id}"><td>${dog.name}</td><td>${dog.breed}</td><td>${dog.sex}</td><td><button id ="${dog.id}">Edit</button></td></tr>`
            dogTable.insertAdjacentHTML('beforeend', html)
        })
    })

    document.body.addEventListener("click", function (e) {
        if (e.target.innerHTML === "Edit") {
            currentId = e.target.id
            const name = e.target.parentElement.parentElement.childNodes[0].innerHTML
            const breed = e.target.parentElement.parentElement.childNodes[1].innerHTML
            const sex = e.target.parentElement.parentElement.childNodes[2].innerHTML
            dogForm.name.value = name
            dogForm.breed.value = breed
            dogForm.sex.value = sex
        }
    })

    document.body.addEventListener("submit", function (event){
            event.preventDefault()
            const dog = {id: currentId, name: dogForm.name.value, breed: dogForm.breed.value, sex: dogForm.sex.value}
            fetch (`http://localhost:3000/dogs/${currentId}`, {
            method: "PATCH",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(dog)  
            })
            .then(response => response.json())
            .then(function(json) {
                let dogRow = document.getElementById(`${json.id}`)
                dogRow.cells[0].innerHTML = json.name
                dogRow.cells[1].innerHTML = json.breed
                dogRow.cells[2].innerHTML = json.sex
                dogForm.reset()
            })
        })
})