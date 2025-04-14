const add_form = document.querySelector(".form-add");
const list = document.querySelector(".list-todos");
const search = document.querySelector(".input-search");
const btn_pass_round = document.querySelector(".btn-pass-round");
const img_plus = document.querySelector(".btn-img-plus");

// add new todo
const generate_template = (effect, qtd, round) => {
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center list-effect">
      <div class="effect">${effect}</div>
      <div class="bonus">${qtd}</div>
      <div class="round">${round} rod.</div>
      <img src="./img/trash.svg" alt="" class="icon btn-delete">
    </li>
  `;
  list.innerHTML += html;
};

// limpa todo form -> inputs e previne inputs c/ espaço em branco desnecessario
add_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const effect = add_form[0].value;
  const qtd = add_form[1].value;
  const round = add_form[2].value;

  if (effect.length && qtd.length && round.length) {
    generate_template(effect, qtd, round);
    add_form.reset();
    add_form.style.setProperty("display", "none");
  }
});

// delete current todo
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    e.target.parentElement.remove();
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

// ao clicar btn-pass-round, diminuir em 1, qtd maxima de rodadas
btn_pass_round.addEventListener("click", () => {
  // percorrer todas as div 'round'
  let rounds = document.querySelectorAll(".round");
  Array.from(rounds).forEach((round) => {
    // console.log(round);
    let round_num = round.innerText.replace(" rod.", ""); // pega o num. rodadas, apenas
    round_num -= 1; // diminui rodada
    // verifica se qtd rodada é maior q 0, att. qtd rodadas (text). caso contrario excluir <li>
    round_num >= 1
      ? (round.innerText = `${round_num} rod.`)
      : round.parentElement.remove();
  });
});

// exibe form. p/ add, alterando o css
img_plus.addEventListener("click", () => {
  add_form.style.setProperty("display", "block");
});
