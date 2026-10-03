const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

const submitModal = document.getElementById("submitModal");
const openSubmitForm = document.getElementById("openSubmitForm");
const closeSubmitForm = document.getElementById("closeSubmitForm");
const projectForm = document.getElementById("projectForm");

const projectGrid = document.getElementById("projectGrid");


// Default projects
const defaultProjects = [
    {
        title: "AI Study Assistant",
        category: "AI",
        description: "An AI-powered tool that helps students organize and understand their study material.",
        link: "#",
        upvotes: 12,
        comments: 4
    },
    {
        title: "Campus Event Website",
        category: "Web",
        description: "A responsive website for discovering college events and activities.",
        link: "#",
        upvotes: 8,
        comments: 2
    },
    {
        title: "Student Task Manager",
        category: "Mobile",
        description: "A mobile application for managing assignments, deadlines, and daily tasks.",
        link: "#",
        upvotes: 15,
        comments: 6
    }
];


// Load projects from localStorage
let projects = JSON.parse(localStorage.getItem("gdgProjects")) || defaultProjects;


// Display projects
function displayProjects() {
    projectGrid.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    projects.forEach((project, index) => {

        const matchesSearch =
            project.title.toLowerCase().includes(searchText) ||
            project.description.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            project.category.toLowerCase() === selectedCategory;

        if (matchesSearch && matchesCategory) {

            const newProject = document.createElement("article");
            if (!project.feedback) {
            project.feedback = [];
}
            newProject.className = "project-card";

            newProject.innerHTML = `
                <div class="project-category">${project.category}</div>

                <h3>${project.title}</h3>

                <p>${project.description}</p>

                <a href="${project.link}" target="_blank" class="project-link">
                    View Project →
                </a>

                <div class="project-actions">
                    <button class="upvote-btn" data-index="${index}">
                        👍 <span>${project.upvotes}</span>
                    </button>

                    <button class="comment-btn" data-index="${index}">
                        💬 <span>${project.comments}</span>
                    </button>
                </div>
                ${project.feedback && project.feedback.length > 0 ? `
                    <div class="feedback-list">
                    <h4>Feedback</h4>
                    ${project.feedback.map(item => `
                        <p>💬 ${item}</p>
                    `).join("")}
                </div>
            ` : ""}
        `;

            projectGrid.appendChild(newProject);
        }
    });
}


// Search
searchInput.addEventListener("input", displayProjects);


// Category filter
categoryFilter.addEventListener("change", displayProjects);


// Open submit form
openSubmitForm.addEventListener("click", () => {
    submitModal.style.display = "flex";
});


// Close submit form
closeSubmitForm.addEventListener("click", () => {
    submitModal.style.display = "none";
});


// Submit project
projectForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const title = document.getElementById("projectTitle").value;
    const category = document.getElementById("projectCategory").value;
    const description = document.getElementById("projectDescription").value;
    const link = document.getElementById("projectLink").value;

    const newProject = {
        title: title,
        category: category,
        description: description,
        link: link,
        upvotes: 0,
        comments: 0
    };

    projects.push(newProject);

    // Save projects
    localStorage.setItem("gdgProjects", JSON.stringify(projects));

    // Reset form
    projectForm.reset();

    // Close modal
    submitModal.style.display = "none";

    // Display updated projects
    displayProjects();

    alert("Project submitted successfully!");
});


// Initial display
displayProjects();


    projectGrid.addEventListener("click", function(event) {

    // UPVOTE
    const upvoteButton = event.target.closest(".upvote-btn");

    if (upvoteButton) {
    const index = upvoteButton.dataset.index;

    let votedProjects =
        JSON.parse(localStorage.getItem("gdgVotedProjects")) || [];

    if (votedProjects.includes(index)) {
        alert("You have already upvoted this project.");
        return;
    }

    projects[index].upvotes++;

    votedProjects.push(index);

    localStorage.setItem(
        "gdgProjects",
        JSON.stringify(projects)
    );

    localStorage.setItem(
        "gdgVotedProjects",
        JSON.stringify(votedProjects)
    );

    displayProjects();
    return;
}


    // OPEN FEEDBACK BOX
    const commentButton = event.target.closest(".comment-btn");

    if (commentButton) {
        const card = commentButton.closest(".project-card");
        const index = commentButton.dataset.index;

        const existingBox = card.querySelector(".feedback-box");

        if (existingBox) {
            existingBox.remove();
            return;
        }

        const feedbackBox = document.createElement("div");

        feedbackBox.className = "feedback-box";

        feedbackBox.innerHTML = `
            <input
                type="text"
                class="feedback-input"
                placeholder="Write feedback..."
            >

            <button class="feedback-submit" data-index="${index}">
                Send
            </button>
        `;

        card.appendChild(feedbackBox);
        return;
    }


    // SUBMIT FEEDBACK
    const feedbackButton = event.target.closest(".feedback-submit");

    if (feedbackButton) {

        const input = feedbackButton
            .parentElement
            .querySelector(".feedback-input");

        const feedback = input.value.trim();

        if (feedback === "") {
            alert("Please write some feedback.");
            return;
        }

        const index = feedbackButton.dataset.index;

        if (!projects[index].feedback) {
            projects[index].feedback = [];
        }

        projects[index].feedback.push(feedback);

        projects[index].comments =
            projects[index].feedback.length;

        localStorage.setItem(
            "gdgProjects",
            JSON.stringify(projects)
        );

        displayProjects();
    }
});
const exploreBtn = document.getElementById("exploreBtn");

exploreBtn.addEventListener("click", () => {
    document.getElementById("projects").scrollIntoView({
        behavior: "smooth"
    });
});

const footerSubmit = document.getElementById("footerSubmit");

footerSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    submitModal.style.display = "flex";
});