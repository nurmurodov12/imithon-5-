const todosContainer = document.getElementById("todos-ul")
const API = `https://69c558688a5b6e2dec2c41b6.mockapi.io/imtihon`
const form = document.getElementById("form-new")
const btnAdd = document.getElementById("button-add")
let arr = []
const inputForm = document.getElementById("input-form")




fecthApi()
async function fecthApi() {
    const response = await fetch(API)
    const dataJson = await response.json()

    createTodos(dataJson)
    arr = dataJson
}



async function createTodos(array = []) {
    todosContainer.innerHTML = ``
    todosContainer.innerHTML = array.map((val) => {
        return `
            <li class="w-[100%] border-b-2 pl-5 flex justify-between  pr-5">
                        <div class="flex items-center gap-3" id="todo-title">
                            <input type="checkbox" ${val.complete ? "checked" : ""} >
                            <h2 >${val.title}</h2>
                        </div>

                        <div id="todo-btn" class="flex pb-2 gap-3 h-[60px] ">
                            <button class="bg-sky-600 w-[100px] rounded h-[40px] text-white cursor-pointer" onclick="editItem(${val.id})">
                                Edit
                                <i class="fa-solid fa-caret-down rotate-[270deg]"></i>
                            </button>
                            <button class="bg-red-500 w-[100px] rounded h-[40px] text-white cursor-pointer" onclick="deleteItem(${val.id})">Delete</button>
                        </div>

                    </li>
        `
    })

}


async function editItem(id) {
    const newTitle = prompt("yangi titleni kiriting")
    const newComplete = Boolean(prompt("yangi complete kiriting"))
    const trueAndFalse = newComplete.toLowerCase === "true"

    const editProduct = {
        title: newTitle,
        complete: trueAndFalse
    }

    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editProduct)
    })

    const createTodo = await fetch(API)
    const createTodoJson = await createTodo.json(createTodo)

    createTodos(createTodoJson)
}

async function deleteItem(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    })
    const deleteApi = await fetch(API)
    const deleteApiJson = await deleteApi.json()
    createTodos(deleteApiJson)
}

btnAdd.addEventListener("click", async (e) => {
    e.preventDefault()
    const title = prompt("Title kiriting yani todo nomi")
    const complete = prompt("true yoki false kiriting, true bajarilgan false bajarilmagan")
    const completeTrue = complete.toLocaleLowerCase() === "true"

    let newProduct = {
        title: title,
        complete: completeTrue
        
    }

    await fetch(API, {
        method: "POSt",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(newProduct)
    })
    const createTodo = await fetch(API)
    const createTodoJson = await createTodo.json(createTodo)

    createTodos(createTodoJson)

    form.reset()
})


const allTasks = document.getElementById("alltasks")
const complete = document.getElementById("complete")
const pending = document.getElementById("pending")






allTasks.addEventListener("click", () => {
    createTodos(arr)

})

complete.addEventListener("click", () => {
    const complete = arr.filter((val) => {
        return val.complete
    })
    createTodos(complete)
})

pending.addEventListener("click", () => {
    const pending = arr.filter((val) => {
        return !val.complete
    })

    createTodos(pending)
})

