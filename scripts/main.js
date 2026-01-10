const nav = document.getElementById("siteNav");
const toggle = document.querySelector(".menu-toggle");

if (toggle && nav) {
    toggle.addEventListener("click", function () {
        nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", nav.classList.contains("is-open"));
    });

    nav.addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            nav.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth >= 768) {
            nav.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        }
    });
}

function highlightLink() {
    if (!nav) return;
    const links = nav.querySelectorAll("a");
    for (let i = 0; i < links.length; i++) {
        const href = links[i].getAttribute("href");
        const onHome =
            window.location.pathname === "/" && href === "index.html";
        if (onHome || window.location.pathname.endsWith(href)) {
            links[i].classList.add("is-active");
            links[i].setAttribute("aria-current", "page");
        }
    }
}

function setDates() {
    const yearSpot = document.getElementById("copyright");
    const modSpot = document.getElementById("lastModification");

    if (yearSpot) {
        const now = new Date();
        yearSpot.textContent =
            "© " + now.getFullYear() + " WDD231 | Iran Aguirre";
    }

    if (modSpot) {
        modSpot.textContent = "Last modified: " + document.lastModified;
    }
}

const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        certificate: "Web and Computer Programming",
        description:
            "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
        technology: ["Python"],
        completed: true,
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description:
            "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
        technology: ["HTML", "CSS"],
        completed: true,
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        certificate: "Web and Computer Programming",
        description:
            "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
        technology: ["Python"],
        completed: false,
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        certificate: "Web and Computer Programming",
        description:
            "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
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
            "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: true,
    },
    {
        subject: "WDD",
        number: 231,
        title: "Frontend Web Development I",
        credits: 2,
        certificate: "Web and Computer Programming",
        description:
            "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: false,
    },
];

const filterOptions = [
    { label: "All Courses", value: "all" },
    { label: "WDD Courses", value: "WDD" },
    { label: "CSE Courses", value: "CSE" },
];

let currentFilter = "all";

function buildCourseCard(course) {
    let techText = "";
    for (let i = 0; i < course.technology.length; i++) {
        techText +=
            '<span class="tech-chip">' + course.technology[i] + "</span>";
    }

    let html =
        '<article class="course-card ' +
        (course.completed ? "is-complete" : "") +
        '">' +
        '<div class="course-header">' +
        '<span class="course-badge">' +
        course.subject +
        " " +
        course.number +
        "</span>" +
        '<span class="course-credits">' +
        course.credits +
        " credit" +
        (course.credits > 1 ? "s" : "") +
        "</span>" +
        "</div>" +
        "<h3>" +
        course.title +
        "</h3>" +
        "<p>" +
        course.description +
        "</p>" +
        '<div class="tech-list">' +
        techText +
        "</div>" +
        '<span class="course-status">' +
        (course.completed ? "Completed" : "In progress") +
        "</span>" +
        "</article>";

    return html;
}

function renderButtons() {
    const buttonsWrap = document.getElementById("courseButtons");
    if (!buttonsWrap) return;
    buttonsWrap.innerHTML = "";

    for (let i = 0; i < filterOptions.length; i++) {
        const opt = filterOptions[i];
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = opt.label;
        btn.dataset.filter = opt.value;
        btn.className = "filter-button";
        if (opt.value === currentFilter) {
            btn.classList.add("is-active");
        }
        btn.addEventListener("click", function (event) {
            currentFilter = event.target.dataset.filter || "all";
            renderButtons();
            renderCourses();
        });
        buttonsWrap.appendChild(btn);
    }
}

function renderCourses() {
    const coursesWrap = document.getElementById("courseRenders");
    if (!coursesWrap) return;
    coursesWrap.innerHTML = "";

    let list = [];
    if (currentFilter === "all") {
        list = courses;
    } else {
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].subject === currentFilter) {
                list.push(courses[i]);
            }
        }
    }

    if (list.length === 0) {
        coursesWrap.innerHTML = '<p class="muted">No courses available.</p>';
        return;
    }

    let html = "";
    for (let j = 0; j < list.length; j++) {
        html += buildCourseCard(list[j]);
    }
    coursesWrap.innerHTML = html;
}

highlightLink();
setDates();
renderButtons();
renderCourses();
