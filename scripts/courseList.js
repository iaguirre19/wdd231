const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course will introduce students to programming...",
        technology: ["Python"],
        completed: true,
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces students to the World Wide Web...",
        technology: ["HTML", "CSS"],
        completed: false,
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "CSE 111 students become more organized...",
        technology: ["Python"],
        completed: true,
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course will introduce the notion of classes...",
        technology: ["C#"],
        completed: false,
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description:
            "This course builds on prior experience in Web Fundamentals...",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: false,
    },
    {
        subject: "WDD",
        number: 231,
        title: "Frontend Web Development I",
        credits: 2,
        certificate: "Web and Computer Programming",
        description:
            "This course builds on prior experience with Dynamic Web...",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: true,
    },
];

function displayCourses(filteredCourses) {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = "";

    filteredCourses.forEach((course) => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");
        if (course.completed) {
            courseCard.classList.add("completed");
        }

        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}: ${course.title}</h3>
            <p>${course.description}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p><strong>Technologies:</strong> ${course.technology.join(
                ", "
            )}</p>
        `;
        courseList.appendChild(courseCard);
    });

    const totalCredits = filteredCourses.reduce(
        (sum, course) => sum + course.credits,
        0
    );
    document.getElementById(
        "total-credits"
    ).textContent = `Total Credits: ${totalCredits}`;
}

function filterCourses(subject) {
    if (subject === "All") {
        displayCourses(courses);
    } else {
        const filteredCourses = courses.filter(
            (course) => course.subject === subject
        );
        displayCourses(filteredCourses);
    }
}

document
    .getElementById("filter-all")
    .addEventListener("click", () => filterCourses("All"));
document
    .getElementById("filter-wdd")
    .addEventListener("click", () => filterCourses("WDD"));
document
    .getElementById("filter-cse")
    .addEventListener("click", () => filterCourses("CSE"));

displayCourses(courses);
