const add_form = document.querySelector(".form-add");
const list = document.querySelector(".list-todos");
const search = document.querySelector(".input-search");

// add new todo
const generate_template = (todo) => {
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span class="effect">${todo}</span>
      <!-- <span class="bonus"></span> -->
      <!-- <span class="round"></span> -->
      <span>
        <img src="/img/pencil.svg" alt="" class="icon">
        <img src="/img/trash.svg" alt="" class="icon btn-delete">
      </span>
      <i class="far fa-trash-alt btn-delete"></i>
    </li>
  `;
  list.innerHTML += html;
};

// limpa todo form -> inputs e previne inputs c/ espaço em brnco desnecessario
add_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = add_form.add.value.trim();
  if (todo.length) {
    generate_template(todo);
    add_form.reset();
  }
});

// delete current todo
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    e.target.parentElement.parentElement.remove();
  }
});

// filtro todo
const filter_todo = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLocaleLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

// chamada do filtro
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filter_todo(term);
});
