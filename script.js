// Get references to the form and task list elements
const form = document.querySelector('#new-task-form');
const taskList = document.querySelector('#task-list');
const emptyMessage = document.querySelector('#empty');

// Add a submit event listener to the form
form.addEventListener('submit', (event) => {
	// Prevent the form from submitting and refreshing the page
	event.preventDefault();

	// Get the value of the input field and trim any whitespace
	const input = document.querySelector('#new-task-input');
	const taskValue = input.value.trim();

	// If the input field is empty, alert
	if (!taskValue) {
		alert('El campo no debe estar vacío!');
		return;
	}

	// Create a new list item element and append it to the task list
	const li = createTaskListItem(taskValue);
	taskList.appendChild(li);

	// clear input field
	input.value = '';

  // actualiza el mensaje de si hay tareas pendientes
	if (taskList.children.length === 0) {
		emptyMessage.style.display = 'block';
	} else {
		emptyMessage.style.display = 'none';
	}
});

function createTaskListItem(aTaskValue) {
	const li = document.createElement('li');
	li.textContent = aTaskValue;

	// edit button
	const editButton = document.createElement('button');
	editButton.textContent = 'Editar';
	editButton.classList.add('btn-secondary', 'btn-edit');
	editButton.addEventListener('click', (event) => {
  /* el target al primer hijo es para que no se muestre el contenido
  "Editar" y "Borrar" que cuentan como elementos del nodo padre
  son elementos del nodo padre porque se añaden con textContent
  a la lista entera */
		const currentTaskValue = event.target.parentNode.firstChild.nodeValue.trim();
		const taskValue = prompt('Edita la tarea:', currentTaskValue);
      if (taskValue.trim() === null) return;
      /* es null cuando se presiona cancelar o escape en el prompt
      entonces, la funcion no hace nada y el valor se queda tal y
      como estaba */

      // se fija que el valor de la tarea no sea string vacio
      // o el mismo que el actual
		if (taskValue === '' || taskValue === currentTaskValue.trim()) return;

		li.textContent = taskValue;
	});

	const deleteButton = document.createElement('button');
	deleteButton.textContent = 'Borrar';
	deleteButton.classList.add('btn-secondary', 'btn-delete');
	deleteButton.addEventListener('click', (event) => {
		taskList.removeChild(event.target.parentNode);
		if (taskList.children.length === 0) emptyMessage.style.display = 'block';
	});

	li.appendChild(editButton);
	li.appendChild(deleteButton);

	return li;
}
