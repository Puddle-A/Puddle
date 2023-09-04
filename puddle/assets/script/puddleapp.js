document.addEventListener("DOMContentLoaded", function () {
  // HTML要素を取得
  const questionContainer = document.getElementById('question-container');
  const answerInput = document.getElementById('answer-input');
  const submitButton = document.getElementById('submit-button');
  const resultContainer = document.getElementById('result-container');

  // 関数を定義
  function displayProblem(problems, currentProblemIndex) {
    if (currentProblemIndex < problems.length) {
      const currentProblem = problems[currentProblemIndex];
      questionContainer.textContent = `問題 ${currentProblemIndex + 1}: ${currentProblem.q}`;
      answerInput.value = '';
      resultContainer.textContent = '';
    } else {
      questionContainer.textContent = '全ての問題を解き終わりました。';
      answerInput.style.display = 'none';
      submitButton.style.display = 'none';
    }
  }

  function loadProblems() {
    fetch('assets/problems.json')
      .then(response => response.json())
      .then(data => {
        const problems = data.problems;
        let currentProblemIndex = 0;

        // 初回問題を表示
        displayProblem(problems, currentProblemIndex);

        // 回答送信ボタンのクリックイベントリスナー
        submitButton.addEventListener('click', function () {
          const currentProblem = problems[currentProblemIndex];
          const userAnswer = answerInput.value.trim().toLowerCase();
          if (userAnswer === currentProblem.a.toLowerCase()) {
            resultContainer.textContent = '正解！次の問題に進みます。';
            currentProblemIndex++;
            displayProblem(problems, currentProblemIndex);
          } else {
            resultContainer.textContent = '不正解。もう一度試してみてください。';
          }
        });
      })
      .catch(error => {
        console.error('問題の読み込み中にエラーが発生しました:', error);
      });
  }

  // 問題ファイルの読み込みを実行
  loadProblems();
});
