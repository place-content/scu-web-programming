// DOM 요소 가져오기
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const addButton = document.getElementById("add-button");
const deleteSelectedBtn = document.getElementById("delete-selected-btn");

// 할 일 목록과 선택된 항목을 저장할 배열
const todos = [];
let selectedTodos = [];

// 선택된 항목이 있는지 확인하여 '선택 삭제' 버튼 활성화/비활성화
function updateDeleteSelectedButton() {
  deleteSelectedBtn.disabled = selectedTodos.length === 0;
}

// 할 일 목록을 화면에 렌더링하는 함수
function renderTodos() {
  // 목록 초기화
  todoList.innerHTML = "";

  // 각 할 일 항목을 순회하며 화면에 표시
  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    // 완료된 항목에 'completed' 클래스 추가
    if (todo.completed) {
      li.classList.add("completed");
    }

    // 선택된 항목에 'selected' 클래스 추가
    if (selectedTodos.includes(index)) {
      li.classList.add("selected");
    }

    // 선택을 위한 체크박스 생성
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.checked = selectedTodos.includes(index);
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        // 체크박스가 선택되면 선택 목록에 추가
        selectedTodos.push(index);
      } else {
        // 체크박스가 해제되면 선택 목록에서 제거
        selectedTodos = selectedTodos.filter((i) => i !== index);
      }
      // 선택 삭제 버튼 상태 업데이트 및 목록 다시 렌더링
      updateDeleteSelectedButton();
      renderTodos();
    });

    // 할 일 내용을 담을 컨테이너 생성
    const contentDiv = document.createElement("div");
    contentDiv.className = "todo-item-content";

    // 할 일 텍스트 요소 생성
    const span = document.createElement("span");
    span.textContent = todo.text;
    span.className = "todo-text";

    // 체크박스와 텍스트를 컨테이너에 추가
    contentDiv.appendChild(checkbox);
    contentDiv.appendChild(span);

    // 삭제 버튼 생성
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      // 항목 삭제
      todos.splice(index, 1);
      // 삭제 후 선택된 인덱스 업데이트 (인덱스 이동 처리)
      selectedTodos = selectedTodos
        .filter((i) => i !== index)
        .map((i) => (i > index ? i - 1 : i));
      updateDeleteSelectedButton();
      renderTodos();
    };

    // 완료/취소 버튼 생성
    const completeBtn = document.createElement("button");
    completeBtn.textContent = todo.completed ? "canceled" : "completed";
    completeBtn.className = "complete-btn";
    completeBtn.onclick = () => {
      // 완료 상태 토글
      todos[index].completed = !todos[index].completed;
      renderTodos();
    };

    // 버튼들을 담을 컨테이너 생성
    const actions = document.createElement("div");
    actions.className = "todo-item-actions";
    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    // 모든 요소를 리스트 아이템에 추가
    li.appendChild(contentDiv);
    li.appendChild(actions);
    todoList.appendChild(li);
  });
}

// 선택된 항목들을 삭제하는 함수
function deleteSelectedTodos() {
  // 인덱스를 내림차순으로 정렬 (삭제 시 인덱스 변화 방지)
  selectedTodos.sort((a, b) => b - a);

  // 선택된 항목들 삭제
  for (const index of selectedTodos) {
    todos.splice(index, 1);
  }

  // 선택 목록 초기화
  selectedTodos = [];
  updateDeleteSelectedButton();
  renderTodos();
}

// 새로운 할 일 추가 함수
function addTodo() {
  const text = todoInput.value.trim();

  if (text) {
    // 새 할 일을 목록 맨 앞에 추가
    todos.unshift({
      text: text,
      completed: false,
    });

    // 입력창 초기화 및 목록 갱신
    todoInput.value = "";
    renderTodos();
  }
}

// 페이지 로드 시 실행되는 초기화 함수
window.onload = () => {
  // 폼 제출 이벤트 처리
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
  });

  // 추가 버튼 클릭 이벤트 처리
  addButton.addEventListener("click", (e) => {
    e.preventDefault();
    addTodo();
  });

  // 선택 삭제 버튼 클릭 이벤트 처리
  deleteSelectedBtn.addEventListener("click", () => {
    deleteSelectedTodos();
  });

  // 선택 삭제 버튼 초기 상태 설정
  updateDeleteSelectedButton();
};
