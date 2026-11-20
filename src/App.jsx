
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence ,useInView} from "framer-motion";
import {
  ArrowUpRight, ArrowDown, Menu, X, Code2, Terminal,
  GraduationCap, Briefcase, Award, Mail,
  ExternalLink, Sun, Moon, Sparkles
} from "lucide-react";
import "./App.css";

const projects = [
  {
    number: "01",
    name: "CampusConnect AI",
    type: "FULL-STACK APPLICATION",
    description: "A smart campus platform designed to connect students and simplify campus activities with an AI-ready architecture.",
    stack: ["React", "FastAPI", "Python", "SQLite"],
    link: "https://github.com/shashanksingh09865-ai/campusconnect-ai"
  },
  {
    number: "02",
    name: "Developer Portfolio",
    type: "PERSONAL WEBSITE",
    description: "An interactive portfolio showcasing my technical skills, projects, education and developer journey.",
    stack: ["React", "JavaScript", "CSS", "Framer Motion"],
    link: "https://github.com/shashanksingh09865-ai"
  }
];


const skillGroups = [
  {
    number: "01",
    category: "Programming Languages",
    skills: ["Java", "Python", "C++", "C"]
  },
  {
    number: "02",
    category: "Frontend Development",
    skills: ["JavaScript", "React", "HTML", "CSS"]
  },
  {
    number: "03",
    category: "Backend & Database",
    skills: ["FastAPI", "SQL"]
  },
  {
    number: "04",
    category: "Tools & Core Skills",
    skills: ["Git & GitHub", "Problem Solving"]
  }
];

 const certifications = [
  "IoT Webinar — Mining Big Data for IoT: Challenges, Architecture, and Applications (IoT Society of India)",
  "Introduction to Modern AI — Cisco Networking Academy",

"AI and Cybersecurity Awareness — MPIT – CoE / TCS Foundation",
  "Roadmap to Become a Data Scientist at Amazon — Coding Ninjas (Certificate of Participation)",
  "Gemini Certified Student — Google for Education (Google AI)",
  "Introduction to Internet of Things — NPTEL Elite, 85%",
  "Introduction to Industry 4.0 and Industrial IoT — NPTEL, 78%",
  "TCS MDM & Cybersecurity",
  "Fortinet NSE 1 & 2",
  "GitHub Foundations",
  "Core Java & Collection Framework — 60 Hours"
];


const roles = [
  "Full Stack Developer",
  "Java Programmer",
  "Problem Solver",
  "Tech Enthusiast"
];


function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];

    let speed = deleting ? 45 : 90;

    if (!deleting && text.length === current.length) {
      speed = 1400;
    }

    if (deleting && text.length === 0) {
      speed = 350;
    }

    const timer = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.substring(0, text.length + 1));
        } else {
          setDeleting(true);
        }
      } else {
        if (text.length > 0) {
          setText(current.substring(0, text.length - 1));
        } else {
          setDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, roleIndex]);

  return (
    <span className="typing-text">
      {text}
      <span className="typing-cursor">|</span>
    </span>
  );
}


const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 }
};

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
function Counter({ value, suffix = "", label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1600;
    const steps = 50;
    const increment = value / steps;
    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div className="counter-item" ref={ref}>
      <h3>{count}{suffix}</h3>
      <p>{label}</p>
    </div>
  );
}
function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleHover = (e) => {
      const interactive = e.target.closest(
        "a, button, .project-card, input, textarea"
      );

      cursorRef.current?.classList.toggle("cursor-hover", !!interactive);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
function FloatingParticles() {
  return (
    <div className="particles-background">
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDelay: `${(i % 6) * 0.7}s`,
            animationDuration: `${5 + (i % 5)}s`,
          }}
        />
      ))}
    </div>
  );
}
export default function App() {
  const [loading, setLoading] = useState(true);
const [progress, setProgress] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setProgress((prev) => {
      if (prev >= 100) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 400);
        return 100;
      }
      return prev + 2;
    });
  }, 25);

  return () => clearInterval(interval);
}, []);
const [scrollProgress, setScrollProgress] = useState(0);

useEffect(() => {
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    setScrollProgress(progress);
  };

  window.addEventListener("scroll", updateProgress);
  updateProgress();

  return () => window.removeEventListener("scroll", updateProgress);
}, []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [dark, setDark] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  // Scroll reveal animation
useEffect(() => {
  const sections = document.querySelectorAll(".portfolio section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  sections.forEach((section) => {
    section.classList.add("reveal-section");
    observer.observe(section);
  });

  return () => observer.disconnect();
}, []);

  const navItems = [
  "About",
  "Skills",
  "Experience",
  "Projects",
  "Journey",
  "Contact"
];

useEffect(() => {
  const updateActiveSection = () => {
    const marker = window.scrollY + 150;
    let current = "";

    navItems.forEach((item) => {
      const section = document.getElementById(item.toLowerCase());

      if (
        section &&
        section.getBoundingClientRect().top + window.scrollY <= marker
      ) {
        current = item.toLowerCase();
      }
    });

    setActiveSection(current);
  };

  window.addEventListener("scroll", updateActiveSection, {
    passive: true
  });
  window.addEventListener("resize", updateActiveSection);

  updateActiveSection();

  return () => {
    window.removeEventListener("scroll", updateActiveSection);
    window.removeEventListener("resize", updateActiveSection);
  };
}, []);


  return (
    <main className={dark ? "portfolio dark" : "portfolio"}>
      <FloatingParticles />
      <CustomCursor />
      <button
  className="back-to-top"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  aria-label="Back to top"
>
  <ArrowUpRight size={22} />
</button>
      <div className="scroll-progress">
  <div
    className="scroll-progress-fill"
    style={{ width: `${scrollProgress}%` }}
  />
</div>
      <AnimatePresence>
  {loading && (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.7 }}
    >
      <div className="loading-content">
        <span className="loading-label">PORTFOLIO / 2026</span>
        <h1>SHASHANK<span>.</span></h1>
        <p>BUILDING DIGITAL EXPERIENCES</p>
        <div className="loading-track">
          <motion.div
            className="loading-progress"
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="loading-footer">
          <span>WELCOME TO MY WORLD</span>
          <span>{progress}%</span>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
      <div className="grain" />

      <header className="navbar">
        <a href="#home" className="logo">SS<span>.</span></a>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
         
{navItems.map((item) => (
  <a
    className={
      activeSection === item.toLowerCase()
        ? "nav-link active"
        : "nav-link"
    }
    key={item}
    href={`#${item.toLowerCase()}`}
    aria-current={
      activeSection === item.toLowerCase() ? "location" : undefined
    }
    onClick={() => {
      setMenuOpen(false);
      setActiveSection(item.toLowerCase());
    }}
  >
    {item}
    <span className="nav-underline"></span>
  </a>
))}

<a
  className="nav-contact"
  href="#contact"
  onClick={() => {
    setMenuOpen(false);
    setActiveSection("contact");
  }}
>
  Let's talk <ArrowUpRight size={15}/>
</a>

        </nav>

        <div className="nav-actions">
          <button className="icon-button" onClick={() => setDark(!dark)} aria-label="Toggle theme">
            {dark ? <Sun size={19}/> : <Moon size={19}/>}
          </button>
          <button className="icon-button mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X/> : <Menu/>}
          </button>
        </div>
      </header>

      
<section className="hero" id="home">
  <div className="hero-topline">
    <span>
      <span className="status-dot" />
      AVAILABLE FOR OPPORTUNITIES
    </span>
    <span>PRAYAGRAJ, INDIA · 2026</span>
  </div>

  <Reveal className="hero-content">
    <p className="eyebrow">HELLO, I'M SHASHANK SINGH</p>

    <p className="hero-role">
      <TypingText />
    </p>

    <motion.h1
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.22,
            delayChildren: 0.25,
          },
        },
      }}
    >
      <motion.span
        className="hero-title-line"
        variants={{
          hidden: { opacity: 0, y: 55 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
          },
        }}
      >
        BUILDING
      </motion.span>

      <motion.span
        className="hero-title-line"
        variants={{
          hidden: { opacity: 0, y: 55 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
          },
        }}
      >
        THE <span className="outlined">DIGITAL</span>
      </motion.span>

      <motion.span
        className="hero-title-line"
        variants={{
          hidden: { opacity: 0, y: 55 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
          },
        }}
      >
        FUTURE<span className="lime-dot">.</span>
      </motion.span>
    </motion.h1>

    
<div className="hero-bottom">
  <div className="hero-bottom-content">
    <p className="hero-description">
      Computer Science student, developer and curious problem solver.
      I turn ideas into meaningful digital experiences.
    </p>

    <div className="hero-actions">
      <a href="#projects" className="hero-primary-btn">
        EXPLORE MY WORK <ArrowUpRight size={19} />
      </a>

      <a
        href="/Shashank_Singh_Resume.pdf"
        className="hero-secondary-btn"
        target="_blank"
        rel="noreferrer"
      >
        DOWNLOAD RESUME <ArrowDown size={18} />
      </a>
    </div>
  </div>

  <a href="#about" className="round-link" aria-label="Scroll to About">
    <ArrowDown size={22} />
  </a>
</div>

  </Reveal>

  <div className="hero-stamp">
    <span>DESIGN</span>
    <span>·</span>
    <span>DEVELOP</span>
    <span>·</span>
    <span>INNOVATE</span>
  </div>

  <div className="hero-index">01 / 05</div>
</section>


      <div className="marquee">
        <div className="marquee-track">
          {Array.from({length: 4}).map((_, i) => (
            <span key={i}>CREATIVE DEVELOPER <b>✳</b> SOFTWARE ENGINEER <b>✳</b> TECH ENTHUSIAST <b>✳</b></span>
          ))}
        </div>
      </div>

      <section className="section about-section" id="about">
        <Reveal className="section-heading">
          <span className="section-number">01 — ABOUT ME</span>
          <h2>Curiosity drives.<br/><em>Code creates.</em></h2>
                </Reveal>

        {/* Animated Statistics */}
        <div className="about-stats">
          <Counter value={8.35} label="CGPA" />
          <Counter value={2} suffix="+" label="NPTEL COURSES" />
          <Counter value={2028} label="GRADUATION YEAR" />
        </div>

        <div className="about-grid">
          <Reveal className="about-visual">
            <div className="orbit orbit-one"/>
            <div className="orbit orbit-two"/>
            <div className="orbit-center profile-photo">
  <img src="/profile.jpg" alt="Shashank Singh" />
</div>
            <span className="orbit-label label-one">JAVA</span>
            <span className="orbit-label label-two">REACT</span>
            <span className="orbit-label label-three">PYTHON</span>
            <span className="visual-caption">MY WORLD / 2026</span>
          </Reveal>
          <Reveal className="about-copy" delay={0.15}>
            <p className="eyebrow">A LITTLE INTRODUCTION</p>
            <h3>
  Passion for technology.<br />
  <em>Purpose through code.</em>
</h3>
            <p>
  I'm a B.Tech Computer Science student at United College of
  Engineering & Research, affiliated with AKTU. I enjoy developing
  practical applications, exploring emerging technologies and
  transforming ideas into meaningful digital solutions.
</p>

<p>
  My current journey focuses on Java development, full-stack
  engineering, Data Structures & Algorithms, and building projects
  that solve real-world problems. I'm always eager to learn,
  collaborate and grow as a developer.
</p>
            <div className="about-facts">
              <div><strong>8.35</strong><span>CGPA</span></div>
              <div><strong>2028</strong><span>GRADUATION</span></div>
              <div><strong>12+</strong><span>TECH SKILLS</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <Reveal className="section-heading">
          <span className="section-number">02 — MY TOOLKIT</span>
          <h2>Tools of my<br/><em>trade.</em></h2>
        </Reveal>
        <Reveal className="skills-intro">
          <p>Technologies I use to transform ideas into working products.</p>
          <span>CONTINUOUSLY LEARNING <Sparkles size={16}/></span>
        </Reveal>
        
<div className="skills-grid">
  {skillGroups.map((group) => (
    <Reveal key={group.number}>
      <div className="skill-category">
        <div className="skill-category-heading">
          <span>{group.number} / 04</span>
          <h3>{group.category}</h3>
        </div>

        
<div className="skill-items">
  {group.skills.map((skill, i) => (
    <motion.div
      className="skill-card"
      key={skill}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.08 }}
    >
      <span className="skill-index">
        {String(i + 1).padStart(2, "0")}
      </span>

      <span className="skill-name">{skill}</span>

      <ArrowUpRight size={17} className="skill-arrow" />
    </motion.div>
  ))}
</div>

      </div>
    </Reveal>
  ))}
</div>

      </section>

<section className="section experience-section" id="experience">
  <Reveal className="section-heading">
    <span className="section-number">03 — PROFESSIONAL EXPERIENCE</span>
    <h2>Learning through<br/><em>experience.</em></h2>
  </Reveal>

  <Reveal className="experience-card">
    <div className="experience-top">
      <div>
        <span className="eyebrow">INTERNSHIP EXPERIENCE · 2026</span>
        <h3>Python with AI Intern</h3>
        <h4>EWB Edutech Private Limited</h4>
      </div>

      <span className="experience-status">
        COMPLETED
      </span>
    </div>

    <div className="experience-meta">
      <span>21 SEPTEMBER – 2 NOVEMBER 2026</span>
      <span>6 WEEKS</span>
      <span>VIRTUAL / PAN INDIA</span>
      <span>UNPAID</span>
    </div>

    <p className="experience-description">
      Selected through the AICTE National Internship Portal for
      a six-week Python with Artificial Intelligence internship
      programme. Successfully completed the internship assignments,
      project work and final evaluation.
    </p>

    <div className="experience-tags">
      <span>PYTHON</span>
      <span>ARTIFICIAL INTELLIGENCE</span>
      <span>AICTE INTERNSHIP PORTAL</span>
    </div>
    <a
  className="experience-proof-link"
  href="/internships/ewb-python-ai.pdf"
  target="_blank"
  rel="noreferrer"
>
  VIEW INTERNSHIP PROOF <ArrowUpRight size={17} />
</a>
  </Reveal>

<Reveal className="experience-card">
  <div className="experience-top">
    <div>
      <span className="eyebrow">INTERNSHIP EXPERIENCE · 2026</span>
      <h3>HTML & CSS Web Development Intern</h3>
      <h4>EWB Edutech Private Limited</h4>
    </div>
    <span className="experience-status">COMPLETED</span>
  </div>

  <div className="experience-meta">
    <span>22 SEPTEMBER 2026</span>
    <span>1 MONTH</span>
    <span>VIRTUAL / PAN INDIA</span>
    <span>UNPAID</span>
  </div>

  <p className="experience-description">
    Selected through the AICTE National Internship Portal for a
    one-month HTML & CSS Web Development internship. Successfully
    completed the internship programme, including its assigned
    assessments and final mini project.
  </p>

  <div className="experience-tags">
    <span>HTML</span>
    <span>CSS</span>
    <span>WEB DEVELOPMENT</span>
    <span>AICTE INTERNSHIP PORTAL</span>
  </div>
  <a className="experience-proof-link"
   href="/internships/ewb-html-css.pdf"
   target="_blank" rel="noreferrer">
  VIEW INTERNSHIP PROOF <ArrowUpRight size={17} />
</a>
</Reveal>

<Reveal className="experience-card">
  <div className="experience-top">
    <div>
      <span className="eyebrow">INTERNSHIP SELECTION · 2025</span>
      <h3>Swaraj Fellowship & Social Entrepreneurship</h3>
      <h4>Hamari Pahchan NGO</h4>
      <p className="experience-description">
        Selected through Internshala for the Swaraj Fellowship
        & Social Entrepreneurship internship programme,
        representing United College of Engineering and Research,
        Allahabad.
      </p>
    </div>
    <span className="experience-status">SELECTED</span>
  </div>

  <div className="experience-meta">
    <span>31 JULY 2025</span>
    <span>INTERNshALA SELECTION</span>
    <span>HAMARI PAHCHAN NGO</span>
  </div>

  <div className="experience-tags">
    <span>SOCIAL ENTREPRENEURSHIP</span>
    <span>SWARAJ FELLOWSHIP</span>
    <span>INTERNSHALA</span>
  </div>

  <p className="experience-description">
    Certificate No: d2nhoh7hrym
  </p>

  <a
    href="https://internshala.com/verify_certificate"
    target="_blank"
    rel="noreferrer"
  >
    Verify Certificate ↗
  </a>
  <a className="experience-proof-link"
   href="/internships/swaraj-fellowship.jpg"
   target="_blank" rel="noreferrer">
  VIEW SELECTION PROOF <ArrowUpRight size={17} />
</a>
</Reveal>

<Reveal className="experience-card">
  <div className="experience-top">
    <div>
      <span className="eyebrow">INTERNSHIP EXPERIENCE · 2025</span>
      <h3>Python or Java Programming Intern</h3>
      <h4>VaultofCodes</h4>
    </div>
    <span className="experience-status">COMPLETED</span>
  </div>

  <div className="experience-meta">
    <span>2025</span>
    <span>NATIONAL INTERNSHIP PORTAL</span>
    <span>PYTHON / JAVA</span>
  </div>

  <p className="experience-description">
    Completed a Python or Java Programming internship opportunity
    at VaultofCodes after being shortlisted through the National
    Internship Portal.
  </p>

  <div className="experience-tags">
    <span>PYTHON</span>
    <span>JAVA</span>
    <span>PROGRAMMING</span>
    <span>VAULTOFCODES</span>
  </div>
  <a className="experience-proof-link"
   href="/internships/vaultofcodes.jpg"
   target="_blank" rel="noreferrer">
  VIEW INTERNSHIP PROOF <ArrowUpRight size={17} />
</a>
</Reveal>

<Reveal className="experience-card">
  <div className="experience-top">
    <div>
      <span className="eyebrow">EXPERIENTIAL LEARNING · 2025</span>
      <h3>Project-Based Experiential Learning (PBEL)</h3>
      <h4>IBM Career Education & NASSCOM</h4>
    </div>
    <span className="experience-status">PARTICIPATED</span>
  </div>

  <div className="experience-meta">
    <span>VIRTUAL PROGRAMME</span>
    <span>60 HOURS</span>
    <span>IBM & NASSCOM</span>
  </div>

  <p className="experience-description">
    Participated in the IBM–NASSCOM Project-Based Experiential
    Learning programme, a virtual learning initiative featuring
    instructor-led training and project-based experiential learning.
  </p>

  <div className="experience-tags">
    <span>INDUSTRY-ORIENTED LEARNING</span>
    <span>PROJECT-BASED LEARNING</span>
    <span>IBM</span>
    <span>NASSCOM</span>
  </div>
  <a className="experience-proof-link"
   href="/internships/ibm-nasscom.jpg"
   target="_blank" rel="noreferrer">
  VIEW PARTICIPATION PROOF <ArrowUpRight size={17} />
</a>
</Reveal>

</section>

      <section className="section projects-section" id="projects">
        <Reveal className="section-heading">
          <span className="section-number">03 — SELECTED WORK</span>
          <h2>Ideas into<br/><em>reality.</em></h2>
        </Reveal>
        <div className="projects-list">
          {projects.map((project, i) => (
            <Reveal key={project.number} delay={i * 0.12}>
             <button
  type="button"
  className="project-card"
  onClick={() => {
    console.log("Project clicked:", project.name);
    setSelectedProject(project);
  }}
  onMouseMove={(event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 10;
    const rotateX = (0.5 - y) * 10;

    card.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  }}
  onMouseLeave={(event) => {
    event.currentTarget.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  }}
>
                <span className="project-number">{project.number}</span>
                <div className="project-main">
                  <span className="eyebrow">{project.type}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.stack.map(tag => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
                <span className="project-arrow"><ArrowUpRight size={25}/></span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section journey-section" id="journey">
        <Reveal className="section-heading">
          <span className="section-number">04 — THE JOURNEY</span>
          <h2>Growing with<br/><em>purpose.</em></h2>
        </Reveal>
        <div className="journey-grid">
          <Reveal className="journey-card">
            <GraduationCap size={28}/>
            <span className="eyebrow">EDUCATION · 2024–2028</span>
            <h3>B.Tech Computer Science</h3>
            <p>United College of Engineering & Research, Prayagraj</p>
            <strong>CGPA: 8.35</strong>
          </Reveal>
          <Reveal className="journey-card" delay={0.12}>
            <Briefcase size={28}/>
            <span className="eyebrow">EXPERIENCE & TRAINING</span>
            <h3>IBM–NASSCOM</h3>
            <p>Internship experience and exposure to industry-oriented learning.</p>
            <strong>TECHNICAL LEARNING</strong>
          </Reveal>
        </div>

        <Reveal className="certifications">
          <div className="cert-heading"><Award size={24}/><h3>Certifications & Recognition</h3></div>
          



{certifications.map((cert, i) => (
  <motion.div
    className="cert-row"
    key={cert}
    initial={{ opacity: 0, x: -25 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: i * 0.08 }}
  >
    <span>{String(i + 1).padStart(2, "0")}</span>

    <div className="cert-content">
      <p>{cert}</p>

      {cert.includes("Gemini Certified Student") && (
        <div className="cert-details">
          <span>Issued: 06 March 2026</span>
          <span>Valid through: 06 March 2029</span>
          <span>Issued by: Google for Education</span>
        </div>
      )}

      {cert.includes("Roadmap to Become a Data Scientist at Amazon") && (
        <div className="cert-details">
          <span>Issued by: Coding Ninjas</span>
          <span>Certificate type: Participation</span>
          <span>Certificate No: 57426</span>
        </div>
      )}

      {cert.includes("Introduction to Modern AI") && (
        <div className="cert-details">
          <span>Issued by: Cisco Networking Academy</span>
          <span>Completion Date: 22 August 2026</span>
          <span>Certificate ID: 0a43907a-7f03-422e-b2ca-5aad885</span>
          <span>Signed by: Lynn Bloomer, Director</span>
        </div>
      )}

      {cert.includes("AI and Cybersecurity Awareness") && (
        <div className="cert-details">
          <span>Program: AI for All</span>
          <span>Offered by: MPIT – CoE in partnership with TCS Foundation</span>
          <span>Completion Date: April 2026</span>
          <span>Issue Date: 18 April 2026</span>
          <span>Certificate ID: 277082-30923965-1016</span>
          <span>Signatories: Sudhir Agrawal (MPIT) and Mehul Mehta (TCS iON)</span>
        </div>
      )}
    

{cert.includes("IoT Webinar") && (
  <div className="cert-details">
    <span>Issued by: IoT Society of India</span>
    <span>Certificate Type: Participation</span>
    <span>Webinar Date: 12 December 2025</span>
    <span>Topic: Mining Big Data for IoT: Challenges, Architecture, and Applications</span>
    <span>Hon. Secretary: Rakesh Puri</span>
    <span>President: Dr Dheeraj Mehrotra</span>
  </div>
)}

{cert.includes("Introduction to Internet of Things") && (
  <div className="cert-details">
    <span>Issued by: NPTEL — IIT Kharagpur</span>
    <span>Certification: Elite</span>
    <span>Score: 85%</span>
    <span>Course: Introduction to Internet of Things</span>
    <span>Year: 2026</span>
  </div>
)}

{cert.includes("Introduction to Industry 4.0") && (
  <div className="cert-details">
    <span>Issued by: NPTEL — IIT Kharagpur</span>
    <span>Score: 78%</span>
    <span>Course: Industry 4.0 and Industrial IoT</span>
  
  <span>Year: 2026</span>
  </div>
)}

{cert.includes("TCS MDM") && (
  <div className="cert-details">
    <span>Issued by: Tata Consultancy Services</span>
    <span>Certification areas: Master Data Management and Cybersecurity</span>
  
  <span>Year: 2026</span>
  </div>
)}

{cert.includes("Fortinet NSE") && (
  <div className="cert-details">
    <span>Issued by: Fortinet</span>
    <span>Certifications: NSE 1 and NSE 2</span>
    <span>Domain: Network Security and Cybersecurity</span>
  <span>Year: 2026</span>
  </div>
)}

{cert.includes("GitHub Foundations") && (
  <div className="cert-details">
    <span>Issued by: GitHub</span>
    <span>Certification: GitHub Foundations</span>
    <span>Domain: GitHub, repositories and collaboration workflows</span>
 <span>Year: 2026</span>
  </div>
)}

{cert.includes("Core Java") && (
  <div className="cert-details">
    <span>Training: Core Java and Collection Framework</span>
    <span>Duration: 60 Hours</span>
    <span>Domain: Java Programming</span>
    <span>Year: 2026</span>
  </div>
)}

{cert.includes("Guinness World Record Participant") && (
  <div className="cert-details">
    <span>Recognition: Guinness World Record Participant</span>
    <span>Achievement: Participation in a record-setting event</span>
    <span>Year: 2026</span>
  </div>
)}

</div>


    <ArrowUpRight size={19}/>
  </motion.div>
))}



<motion.div
  className="cert-row"
  initial={{ opacity: 0, x: -25 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  <span>{String(certifications.length + 1).padStart(2, "0")}</span>

  <div className="cert-content">
    <p>Guinness World Record Participant</p>

    <div className="cert-details">
      <span>Recognition: Guinness World Records</span>
      <span>Achievement: Participant in a world record attempt</span>
      <span>Year: 2026</span>
    </div>
  </div>

  <ArrowUpRight size={19} />
</motion.div>
        </Reveal>
      </section>

      <section className="coding-strip">
        <p className="eyebrow">FIND ME ON THE INTERNET</p>
        <div className="coding-links">
          <a href="https://github.com/shashanksingh09865-ai" target="_blank" rel="noreferrer"><Code2/> GitHub <ArrowUpRight/></a>
          <a href="https://leetcode.com/u/ShashankSingh09865/" target="_blank" rel="noreferrer"><Terminal/> LeetCode <ArrowUpRight/></a>
          <a href="https://www.linkedin.com/in/shashank-singh-73920b328/" target="_blank" rel="noreferrer"><Briefcase/> LinkedIn <ArrowUpRight/></a>
        </div>
      </section>

      
<section className="contact-section" id="contact">
  <Reveal>
    <span className="section-number">05 — WHAT'S NEXT?</span>

    <h2>
      Have an idea?
      <br />
      <em>Let's make it happen.</em>
    </h2>

    <p className="contact-description">
      I'm open to internship opportunities, collaborations,
      and exciting projects. Let's connect and build something meaningful.
    </p>

    <div className="contact-actions">
      <a
        className="contact-button"
        href="mailto:shashanksingh09865@gmail.com"
      >
        LET'S TALK <ArrowUpRight size={20}/>
      </a>

      <a
        className="contact-secondary"
        href="https://www.linkedin.com/in/shashank-singh-73920b328/"
        target="_blank"
        rel="noreferrer"
      >
        CONNECT ON LINKEDIN <ExternalLink size={17}/>
      </a>
    </div>

    <p className="contact-email">
      <Mail size={17}/>
      shashanksingh09865@gmail.com
    </p>
  </Reveal>
</section>


      
<footer className="footer">
  <div className="footer-top">
    <div className="footer-brand">
      <a href="#home" className="logo">SS<span>.</span></a>
      <p>Building ideas into digital experiences.</p>
      <span className="footer-degree">B.TECH COMPUTER SCIENCE · 2028</span>
    </div>

    <div className="footer-socials">
      <span className="eyebrow">CONNECT WITH ME</span>
      <a href="https://github.com/shashanksingh09865-ai"
        target="_blank" rel="noreferrer">
        GITHUB <ArrowUpRight size={15}/>
      </a>
      <a href="https://www.linkedin.com/in/shashank-singh-73920b328/"
        target="_blank" rel="noreferrer">
        LINKEDIN <ArrowUpRight size={15}/>
      </a>
      <a href="https://leetcode.com/u/ShashankSingh09865/"
        target="_blank" rel="noreferrer">
        LEETCODE <ArrowUpRight size={15}/>
      </a>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© 2026 SHASHANK SINGH. ALL RIGHTS RESERVED.</p>
    <a href="#home" className="back-to-top">
      BACK TO TOP ↑
    </a>
  </div>
</footer>


      <AnimatePresence>
        {selectedProject && (
          <motion.div className="modal-backdrop"
            initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
            onClick={() => setSelectedProject(null)}>
            <motion.div className="project-modal"
              initial={{opacity: 0, y: 35, scale: 0.96}}
              animate={{opacity: 1, y: 0, scale: 1}}
              exit={{opacity: 0, y: 20, scale: 0.96}}
              onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close popup"><X/></button>
              <span className="eyebrow">PROJECT DETAILS / {selectedProject.number}</span>
              <h2>{selectedProject.name}</h2>
              <p>{selectedProject.description}</p>
              <div className="project-tags">
                {selectedProject.stack.map(tag => <span key={tag}>{tag}</span>)}
              </div>
              <a href={selectedProject.link} target="_blank" rel="noreferrer" className="modal-link">
                VIEW PROJECT <ExternalLink size={18}/>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
