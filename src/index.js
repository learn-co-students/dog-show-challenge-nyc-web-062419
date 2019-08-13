let holdingArr = [];
document.addEventListener('DOMContentLoaded', () => {
    
    const table = document.querySelector("#table-body");
    
    function gettingTheList(){
        // table.innerHTML = ""
        fetch("http://localhost:3000/dogs")
        // .then(response => response.json())
        .then(function(response){ return response.json()})
        .then(response => {response.forEach(addingToTheTable), holdingArr = response})
    }
    gettingTheList()
    
    function addingToTheTable(dog){
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = `${dog.name}`;
        cell2.innerHTML = `${dog.breed}`;
        cell3.innerHTML = `${dog.sex}`;
        cell4.innerHTML = `<button data-id="${dog.id}" class="buttons" id="${dog.id}">Edit Dog</button>`
    }
    let tablebox = document.querySelector("#table-box");
    
    tablebox.addEventListener("click", function(e) {
        
        if (e.target.className === "buttons") {
            let result = holdingArr.find(obj => {
                return obj.id == e.target.id
            })
            dogForm.name.value = result.name
            dogForm.breed.value = result.breed
            dogForm.sex.value = result.sex
            dogForm.id.value = result.id
        }
    })
    const dogForm = document.getElementById("dog-form")
    dogForm.addEventListener("submit", function(e){
        e.preventDefault()
        if (e.target.id.value === ""){
            alert("You cannot create a new Dog")
        } else {
            createANewDog(e.target)
        }
    })

    function createANewDog(dog){
        fetch(`http://localhost:3000/dogs/${dog.id.value}`, 
        {
            method: 'PATCH',
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ 
                "name": dog.name.value,
                "breed": dog.breed.value,
                "sex": dog.sex.value
            })
        })
            let result = holdingArr.find(obj => {
                return obj.id == dog.id.value
            })
            result.name = dog.name.value
            result.breed = dog.breed.value
            result.sex = dog.sex.value

        let rowResult = table.querySelector((`[data-id~="${dog.id.value}"]`)).parentNode.parentNode.childNodes
        rowResult[0].innerText = dog.name.value
        rowResult[1].innerText = dog.breed.value
        rowResult[2].innerText = dog.sex.value
        dog.reset()
    }
})
