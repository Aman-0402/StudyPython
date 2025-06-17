// Toggle sidebar
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const links = document.querySelectorAll('.topic-link');
const content = document.getElementById('content');
const toggleTheme = document.getElementById('toggleTheme');
//
menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('closed');

  // ✅ Correct logic: add 'sidebar-collapsed' when sidebar is closed
  if (sidebar.classList.contains('closed')) {
    document.body.classList.add('sidebar-collapsed');
  } else {
    document.body.classList.remove('sidebar-collapsed');
  }
});

// Auto-close sidebar and load topic content
links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const file = link.getAttribute('data-file');

    if (file) {
      fetch(`topics/${file}`)
        .then(res => res.text())
        .then(data => {
          content.innerHTML = data;
          sidebar.classList.add('closed');
          document.body.classList.add('sidebar-collapsed'); // ✅ Keep this
        })
        .catch(() => {
          content.innerHTML = `<h2>Error</h2><p>Sorry, the topic "${file}" could not be loaded.</p>`;
        });
    } else {
      const topicTitle = link.textContent;
      content.innerHTML = `<h2>${topicTitle}</h2><p>Content for "${topicTitle}" will be added here...</p>`;
      sidebar.classList.add('closed');
      document.body.classList.add('sidebar-collapsed');
    }
  });
});

// Dark/Light mode toggle
toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Load theme preference on page load
window.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark');
  }
});

function checkAnswer(element, status) {
  const questionDiv = element.closest('.quiz-question');
  const questionText = questionDiv.querySelector('p').textContent;
  const cleanQuestionText = questionText.replace(/^\d+\.\s*/, '');

  const correctOption = questionDiv.querySelector('li[onclick*="correct"]').textContent;
  const correctAnswerText = correctOption.replace(/^[a-z]\)\s*/i, '');

  if (status === 'correct') {
    Swal.fire({
      icon: 'success',
      title: 'Correct!',
      html: `✅ <b>${cleanQuestionText}</b><br><br>You got it right!`,
      timer: 2000,
      showConfirmButton: false,
      background: '#f0f9f0'
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Wrong Answer',
      html: `❌ <b>${cleanQuestionText}</b><br><br>
             Your selection: ${element.textContent.trim()}<br>
             Correct answer: <b>${correctAnswerText}</b>`,
      timer: 3000,
      showConfirmButton: true,
      background: '#fff0f0'
    });
  }

  element.style.backgroundColor = status === 'correct' ? '#d4edda' : '#f8d7da';
  setTimeout(() => {
    element.style.backgroundColor = '';
  }, 1000);
}

function toggleSolution(button) {
  const solutionDiv = button.previousElementSibling;
  if (solutionDiv.style.display === "none") {
    solutionDiv.style.display = "block";
    button.textContent = "Hide Solution";
  } else {
    solutionDiv.style.display = "none";
    button.textContent = "Show Solution";
  }
}

function toggleAnswer(button) {
  const answerDiv = button.nextElementSibling;
  if (answerDiv.style.display === "none") {
    answerDiv.style.display = "block";
    button.textContent = "Hide Answer";
  } else {
    answerDiv.style.display = "none";
    button.textContent = "Show Answer";
  }
}
