export default function decorate(block) {
  // Create the main FAQ container
  const faqContainer = document.createElement("div");
  faqContainer.classList.add("faq-container");

  // Main title (placed on the left)
  const mainTitle = document.createElement("h2");
  mainTitle.classList.add("faq-title");
  mainTitle.textContent = block.children[0].textContent.trim();

  // Left side: Categories
  const categoryList = document.createElement("div");
  categoryList.classList.add("faq-category-list");

  // Right side: Questions + Answers
  const questionList = document.createElement("div");
  questionList.classList.add("faq-content-display");

  let categories = [];

  // Extract categories and questions
  Array.from(block.children).forEach((child, index) => {
    if (index === 0) return; // Skip the title

    let categoryTitleText = child.children[0]?.textContent.trim();
    let allQuestions = [];

    Array.from(child.children).forEach((section, secIndex) => {
      if (secIndex > 0) {
        const questionText = section.children[0]?.innerHTML || "";
        let answers = [];

        if (section.children[0]?.tagName === "H3") {
          allQuestions.push({ question: questionText.trim(), answers: [] });
        }

        // Collect multiple answers and ensure questions are not mixed up
        Array.from(section.children).forEach((ans, ansIndex) => {
          if (ansIndex > 0) {
            if (ans.tagName === "H3") {
              // Treat as a new question rather than an answer
              allQuestions.push({ question: ans.innerHTML.trim(), answers: [] });
            } else if (ans.tagName === "P") {
              // Attach to the last valid question
              if (allQuestions.length > 0) {
                allQuestions[allQuestions.length - 1].answers.push(ans.innerHTML.trim());
              }
            }
          }
        });
      }
    });

    // Split questions into three separate containers
    let splitQuestions = [
      allQuestions.slice(0, Math.ceil(allQuestions.length / 3)), // First container
      allQuestions.slice(Math.ceil(allQuestions.length / 3), 2 * Math.ceil(allQuestions.length / 3)), // Second
      allQuestions.slice(2 * Math.ceil(allQuestions.length / 3)) // Third
    ];

    categories.push({ title: categoryTitleText, questionsGroup: splitQuestions });
  });

  // Process each category
  categories.forEach((category, index) => {
    const categoryTitle = document.createElement("div");
    categoryTitle.classList.add("faq-category-title");
    categoryTitle.textContent = category.title;
    categoryTitle.dataset.index = index;

    // Add expand/collapse icon for category
    const categoryIcon = document.createElement("span");
    categoryIcon.classList.add("faq-category-icon");
    categoryIcon.textContent = "+"; // Initially collapsed
    categoryTitle.appendChild(categoryIcon);

    categoryTitle.addEventListener("click", () => {
      const isExpanded = questionList.style.display === "block" && categoryTitle.classList.contains("active");

      // Hide all categories and collapse them
      document.querySelectorAll(".faq-category-title").forEach((el) => {
        el.classList.remove("active");
        el.querySelector(".faq-category-icon").textContent = "+";
      });

      // Hide all questions first
      questionList.innerHTML = "";
      questionList.style.display = "none";

      if (!isExpanded) {
        categoryTitle.classList.add("active");
        categoryIcon.textContent = "-"; // Expand icon

        // Create three separate containers under each category
        category.questionsGroup.forEach((questions) => {
          const questionContainer = document.createElement("div");
          questionContainer.classList.add("faq-question-container");

          questions.forEach((qa) => {
            const questionItem = document.createElement("div");
            questionItem.classList.add("faq-header");
            questionItem.innerHTML = `
              <span class="faq-question">${qa.question}</span>
              <span class="faq-icon">+</span>
            `;

            // Answer container (Initially Hidden)
            const answerContainer = document.createElement("div");
            answerContainer.classList.add("faq-answer-container");
            answerContainer.style.display = "none";

            // Add each answer inside the container
            qa.answers.forEach((ansText) => {
              const answerItem = document.createElement("div");
              answerItem.classList.add("faq-answer");
              answerItem.innerHTML = ansText;
              answerContainer.appendChild(answerItem);
            });

            // Toggle answer visibility on question click
            questionItem.addEventListener("click", () => {
              const isExpanded = answerContainer.style.display === "block";

              // Hide all answers first
              document.querySelectorAll(".faq-answer-container").forEach((el) => {
                el.style.display = "none";
              });

              document.querySelectorAll(".faq-icon").forEach((icon) => {
                icon.textContent = "+";
              });

              // Toggle clicked answer
              if (!isExpanded) {
                answerContainer.style.display = "block";
                questionItem.querySelector(".faq-icon").textContent = "-";
              }
            });

            // Append question and answer containers
            questionContainer.appendChild(questionItem);
            questionContainer.appendChild(answerContainer);
          });

          questionList.appendChild(questionContainer);
        });

        questionList.style.display = "block";
      }
    });

    categoryList.appendChild(categoryTitle);
  });

  // Append sections to main container
  faqContainer.appendChild(categoryList);
  faqContainer.appendChild(questionList);

  // Replace block content
  block.innerHTML = "";
  block.appendChild(mainTitle); // Title remains separate
  block.appendChild(faqContainer);
}