import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {
      Profile: {
        imageUrl: "./Profile/image.png",
        resumeURL: "./Profile/VijayRamesh.pdf",
        resumeName: "VijayRamesh.pdf",
        name: "VIJAY RAMESH",
        role: "Full Stack Developer ",
        hireOption: "Available for Hire",
        github: "https://github.com/vijayramesh26",
        linkedin: "https://www.linkedin.com/in/vijay-ramesh-7ab042212/",
        content:
          "Full Stack Developer specializing in building scalable and high-performance web applications. Experienced in both frontend and backend technologies, ensuring seamless integration and optimal user experience.",
      },
    },
    about: {
      title: "About Me",
      header:
        "I'm a passionate full-stack developer with expertise in building modern web applications. With a strong foundation in both frontend and backend technologies, I create seamless, efficient,and scalable solutions for complex problems.",
      skills: [
        {
          name: "Vue.js",
          img: "/Skills/Vuejs.png",
          exp: "Advanced",
        },
        {
          name: "Golang",
          img: "/Skills/Go.png",
          exp: "Advanced",
        },
        {
          name: "Nuxt.js",
          img: "/Skills/Nuxt.png",
          exp: "Intermediate",
        },
        {
          name: "Vuetify",
          img: "/Skills/Vuetify.png",
          exp: "Advanced",
        },
        {
          name: "figma",
          img: "/Skills/figma.png",
          exp: "Intermediate",
        },
        {
          name: "Flutter",
          img: "/Skills/flutter.png",
          exp: "Beginner",
        },
        {
          name: "Docker",
          img: "/Skills/docker.png",
          exp: "Beginner",
        },
        {
          name: "Git",
          img: "/Skills/git.png",
          exp: "Intermediate",
        },
        {
          name: "GitHub",
          img: "/Skills/gitHub.png",
          exp: "Intermediate",
        },
        {
          name: "Java",
          img: "/Skills/java.png",
          exp: "Intermediate",
        },
        {
          name: "MariaDB",
          img: "/Skills/mariaDB.png",
          exp: "Advanced",
        },
        {
          name: "MSSQL",
          img: "/Skills/mssql.png",
          exp: "Advanced",
        },
        {
          name: "Postman",
          img: "/Skills/Postman.png",
          exp: "Advanced",
        },
        {
          name: "Firebase",
          img: "/Skills/firebase.png",
          exp: "Advanced",
        },
      ],
      jobContent: `<ul style=" list-style: none; line-height:35px;display: flex;flex-direction: column; gap: 20px;">  <li> 🚀 Hey there! I'm a Full Stack Web Developer passionate about crafting dynamic, user-friendly, and high-performance web applications. From sleek frontend experiences to rock-solid backend systems, I love turning ideas into reality.</li>
 <li> 💡 I also share insights, tips, and tricks on web development to help fellow devs level up their skills. Connect with me on LinkedIn or Instagram for updates on the latest tech trends!</li>
 <li> 📩 Open to exciting opportunities! If you're looking for a developer who loves building impactful digital experiences, let's connect!</li><ul>`,
      Job: [
        {
          color: "yellow ",
          icon: "mdi-laptop",
          title: "My Journey",
          description: `My passion for coding began during my computer science studies, where I discovered the power of creating solutions through programming. What started as curiosity evolved into a career building applications that solve real-world problems. I'm constantly learning new technologies and methodologies to enhance my skills and deliver better results.`,
        },
        {
          color: "blue ",
          icon: "mdi-code-braces",
          title: "Work Philosophy",
          description: `I believe in writing clean, maintainable code that stands the test of time. My development approach emphasizes performance, security, and user experience. I enjoy collaborating with cross-functional teams and value open communication throughout the development process. Every project is an opportunity to create something meaningful and impactful.`,
        },
        {
          color: "purple ",
          icon: "mdi-school",
          title: "Education & Learning",
          description: `I hold a Bachelor's degree in Information Techonology from Meenakshi Engineering College. Beyond formal education, I'm committed to continuous learning through online courses, technical documentation, and hands-on projects. I regularly sharpen my skills and stay current with industry trends.`,
        },
        {
          color: "green ",
          icon: "mdi-tea",
          title: "Beyond Coding",
          description: `When I'm not coding, you'll find me exploring new technologies, reading tech blogs, or experimenting with new recipes. I also enjoy mentoring junior developers and participating in local tech meetups to give back to the community that has supported my growth.`,
        },
      ],
    },
    projects: {
      title: "Featured Projects",
      header:
        "Explore my portfolio of full-stack applications built with Vue.js, Nuxt.js, Golang, HTML,CSS, JS and MariDB. Each project demonstrates my approach to solving real-world problems.",
      Projects: [
        {
          title: "Flight App UI",
          description:
            "FLIGHTMS is a fully responsive flight management system built with Vue.js and Vuetify. It features a modern dashboard for managing flights, bookings, schedules, and analytics. The UI includes real-time flight tracking, booking statuses and performance charts — optimized for desktop and mobile views.",
          image: "/Projects/flight.png",
          github: "https://github.com/Vijayramesh26/flightApp",
          demo: "https://flightapp-by-vijay.web.app/",
          language: ["Vue.js", "Vuetify"],
        },
        {
          title: "Host Vue.js Project on Firebase",
          description:
            "An interactive, animated web tutorial that guides users step-by-step through creating, building, and hosting a Vue.js project on Firebase. Built with pure HTML, CSS, and JavaScript. Clean, responsive, and beginner-friendly.",
          image: "/Projects/firebase.png",
          github: "https://github.com/Vijayramesh26/vuehosting",
          demo: "https://vijayramesh26.github.io/vuehosting/",
          language: ["HTML", "CSS", "Javascript"],
        },
        {
          title: "PORTFOLIO",
          description:
            "A customizable, interactive portfolio template built with Vue.js, Vuetify. Lightweight, animated, and easy to personalize for showcasing your skills and projects. Clean, modern, and developer-friendly.With simple edits in index.js (store) like content, anyone can easily personalize this design to showcase their work, skills, and projects.",
          image: "/Projects/portfolio.png",
          github: "https://github.com/Vijayramesh26/portfolio",
          demo: "https://vijayramesh-portfolio.web.app/",
          language: ["Vue.js", "Vuetify"],
        },
        {
          title: "IFSC LOCATOR",
          description: `IFSC Locator is a simple and powerful tool where you can paste any IFSC code and instantly retrieve complete bank details — including the Bank Name, Branch, Address, State, Contact, City, District, MICR Code, and transaction facilities like IMPS, NEFT, RTGS, SWIFT, and UPI availability.Designed for speed and accuracy.`,
          image: "/Projects/ifsc.png",
          github: "",
          demo: "https://ifsc-locator-by-vijay.web.app/#/",
          language: ["Vue.js", "Vuetify"],
        },
        {
          title: "MEDAPP",
          description:
            "MedApp is a simplified medical billing software prototype designed for hospitals and clinics. It features four main roles: Biller (handles patient billing), Manager (oversees operations and reporting), System Admin (manages users and settings), and Inventory (tracks medical supplies). Ideal for healthcare startups, it streamlines billing and inventory management",
          image: "/Projects/medApp.png",
          github: "",
          demo: "https://medapp-by-vijay.web.app",
          language: ["Vue.js", "Vuetify"],
        },
        {
          title: "SPOTIFY",
          description:
            "Spotify Sign-Up Page Clone is a responsive and visually accurate replica of Spotify's official sign-up page, built purely with HTML and CSS.It recreates the original layout, styling, and user interface design — including responsive elements, form fields, and buttons — to deliver a smooth user experience across devices.",
          image: "/Projects/spotify.png",
          github: "https://github.com/Vijayramesh26/spotify",
          demo: "https://vijayramesh26.github.io/spotify/",
          language: ["HTML", "CSS"],
        },
        {
          title: "INSTAGRAM & FACEBOOK CLONE",
          description:
            "A simple website featuring responsive clones of Instagram and Facebook sign-up and login pages, built with pure HTML and CSS. No JavaScript or frameworks are used, focusing on front-end design and responsiveness",
          image: "/Projects/instagram.png",
          github: "https://github.com/Vijayramesh26/Facebook",
          demo: "https://vijayramesh26.github.io/Facebook/",
          language: ["HTML", "CSS"],
        },
      ],
    },
    experience: {
      title: "Work Experience",
      header:
        "My professional journey showcasing my experience working with Vue.js, Golang, and MariaDB in various roles and companies.",
      Experiences: [
        {
          role: "Software Developer Associate",
          company: "Flattrade Broking Pvt Ltd",
          period: "2024 - Present",
          description: `<ol style="  line-height:30px;">
  <li><strong>Developed & Deployed Applications:</strong> Led the development of a mutual fund application, providing users with real-time tracking, analytics, and up-to-date investment information.</li>
  <li><strong>Integrated Trading Features:</strong> Added support for IPOs, Sovereign Gold Bonds (SGBs), Government Securities (GSecs), and Mutual Funds (MFs), empowering users with more investment options.</li>
  <li><strong>Cart & Payment Gateway Integration:</strong> Successfully integrated cart functionalities and a secure payment gateway to streamline user transactions.</li>
</ol>`,
          technologies: [
            "Nuxt.js",
            "Vue.js",
            "Golang",
            "GORM",
            "MariaDB",
            "Gin",
            "RESTful APIs",
          ],
          icon: "mdi-briefcase-outline",
          color: "teal",
        },
        {
          role: "Full-Stack Developer",
          company: "Flattrade Broking Pvt Ltd",
          period: "2023 - 2024",
          description: `<ol style="  line-height:30px;">
  <li><strong>Optimized Internal Applications:</strong> Enhanced the performance of internal applications by optimizing code, improving load times, and refining user interfaces.</li>
  <li><strong>Mentorship:</strong> Provided mentorship and technical guidance to junior developers, fostering a culture of learning and collaboration within the team.</li>
  <li><strong>Developed Internal Tools:</strong> Built tools for brokerage savings, P&L tracking, pledge management, and real-time trading dashboards, enhancing the decision-making process for internal teams and clients.</li>
</ol>`,
          technologies: ["Vue.js", "Golang", "MariaDB", "RESTful APIs"],
          icon: "mdi-briefcase-outline",
          color: "teal",
        },
        {
          role: "Software Testing (Manual) - Trainee",
          company: "ASK Technology",
          period: "2022",
          description: `<ol style="  line-height:30px;">
  <li><strong>Worked as a Manual Tester Intern:</strong> Gained hands-on experience during a 3-month internship, contributing to testing processes.</li>
  <li><strong>Performed Testing:</strong> Conducted functional, regression, and UI testing to ensure quality and performance standards were met.</li>
  <li><strong>Assisted in UAT:</strong> Supported User Acceptance Testing (UAT) to validate business requirements and ensure product quality before release.</li>
</ol>`,
          technologies: [],
          icon: "mdi-briefcase-outline",
          color: "teal",
        },
      ],
    },
    contact: {
      title: "Get In Touch",
      header:
        "Have a project in mind or want to discuss potential opportunities? Feel free to reach out by submitting the form below and I'll get back to you as soon as possible.",
      form: {
        name: "",
        email: "",
        message: "",
        subject: "",
        access_key: "ac796f25-f385-4fa6-8c62-c026a39cadbc",
        formUrl: "https://api.web3forms.com/submit",
        methodType: "POST",
      },
      ContactInfo: [
        {
          icon: "mdi-email",
          title: "Email",
          description: `vijayramesh26301@gmail.com`,
        },
        {
          icon: "mdi-phone",
          title: "Phone",
          description: `+91 7092755010`,
        },
        {
          icon: "mdi-map-marker-radius",
          title: "Location",
          description: `Chennai, TN, India`,
        },
      ],
    },
    footer: {
      socialLinks: [
        {
          icon: "mdi-linkedin",
          link: "https://www.linkedin.com/in/vijay-ramesh-7ab042212/",
        },
        { icon: "mdi-github", link: "https://github.com/vijayramesh26" },
        { icon: "mdi-twitter", link: "/" },
        { icon: "mdi-youtube", link: "/" },
      ],
    },
    appbar: {
      menu: [
        { icon: "mdi-account", title: "Profile", to: "profileSection" },
        { icon: "mdi-information", title: "About Me", to: "aboutSection" },
        { icon: "mdi-folder", title: "Project", to: "projectSection" },
        { icon: "mdi-briefcase", title: "Experience", to: "experienceSection" },
        { icon: "mdi-phone", title: "Contact Us", to: "contactSection" },
      ],
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
