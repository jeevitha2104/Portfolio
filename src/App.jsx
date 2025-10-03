import React, { useEffect, useRef } from "react";
import badge1 from "./assets/50days.jpg";
import badge2 from "./assets/aug.jpg";
import badge3 from "./assets/sep.jpg";
/*
  Complete professional portfolio website.
  - Dark theme.
  - Hero, About, Achievements, Skills, Projects, Contact, Footer.
  - Subtle reveal animations.
*/

const DARK = {
  bg: "#0f0f17",
  card: "#111",
  text: "#e6eef8",
  accent: "#08fdd8",
  red: "#ff4d6d",
};

function useReveal(selector = ".reveal") {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = document.querySelectorAll(selector);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("show");
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
}

function Navbar({ sections }) {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto w-[94%] max-w-6xl rounded-xl backdrop-blur-md border border-gray-800 px-4 py-2 flex items-center justify-between bg-black/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white bg-pink-500">JV</div>
          <div>
            <div className="text-sm font-semibold text-white">Jeevitha V</div>
            <div className="text-xs text-gray-400">Developer • ACM Secretary</div>
          </div>
        </div>
        <nav className="flex items-center gap-3">
          {sections.map((s) => (
            <a key={s} href={`#${s}`} className="px-3 py-1 rounded text-sm hover:underline text-gray-200">{s}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function CSSCube({ color = DARK.accent }) {
  const ref = useRef(null);
  useEffect(() => {
    let raf = null;
    let angle = 0;
    const el = ref.current;
    const tick = () => {
      angle += 0.4;
      if (el) el.style.transform = `rotateX(${angle}deg) rotateY(${angle * 0.6}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const faceStyle = {
    position: 'absolute', width: 220, height: 220, left: '50%', top: '50%',
    marginLeft: -110, marginTop: -110, borderRadius: 16,
    background: 'rgba(8,253,216,0.04)', border: `1px solid ${color}`,
    boxShadow: `0 0 6px ${color}, inset 0 0 8px rgba(8,253,216,0.06)`,
    backdropFilter: 'blur(3px)',
  };

  return (
    <div style={{ width: 300, height: 300, perspective: 1000 }}>
      <div ref={ref} style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}>
        <div style={{ ...faceStyle, transform: 'translateZ(110px)' }} />
        <div style={{ ...faceStyle, transform: 'rotateY(180deg) translateZ(110px)' }} />
        <div style={{ ...faceStyle, transform: 'rotateY(90deg) translateZ(110px)' }} />
        <div style={{ ...faceStyle, transform: 'rotateY(-90deg) translateZ(110px)' }} />
        <div style={{ ...faceStyle, transform: 'rotateX(90deg) translateZ(110px)' }} />
        <div style={{ ...faceStyle, transform: 'rotateX(-90deg) translateZ(110px)' }} />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="Home" className="min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="reveal opacity-0 translate-y-6 transition-all duration-700">
          <h1 className="text-6xl font-extrabold text-white">Jeevitha V</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-xl">I design and build scalable web applications, AR experiences and developer tools. I focus on clean architecture, performance and polished UX.</p>
          <div className="mt-6 flex gap-4">
            <a href="#projects" className="px-5 py-3 rounded-md font-semibold bg-[#ff4d6d] text-white">See Projects</a>
            <a href="#contact" className="px-5 py-3 rounded-md border border-gray-700 text-gray-200">Contact</a>
          </div>
        </div>
        <div className="flex justify-center reveal opacity-0 translate-y-6 transition-all duration-700 delay-150">
          <div className="p-6 rounded-2xl shadow-xl">
            <CSSCube />
          </div>
        </div>
      </div>
    </section>
  );
}




function About() {
  return (
    <section id="About" className="py-20 bg-[#111] reveal opacity-0 translate-y-6 transition-all duration-700">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <div className="w-56 h-56 rounded-full overflow-hidden shadow-lg relative" style={{ boxShadow: '0 12px 40px rgba(8,223,216,0.20)' }}>
            <img src="src/assets/photo.jpg" alt="Jeevitha" className="w-full h-full object-fit" />
            <div className="absolute inset-0 rounded-full"  />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">About</h2>
          <p className="mt-4 text-gray-400">Passionate developer focused on creating impactful digital solutions. Experienced in web technologies, systems and AR, I merge design with engineering for professional-grade results.</p>
          <div className="mt-6">
            <a href="/resume.pdf" className="px-5 py-3 rounded-md font-semibold bg-[#ff4d6d] text-white">Download Resume</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  const badges = [badge1, badge2, badge3];
  return (
    <section id="Achievements" className="py-20 bg-[#0f0f17] reveal opacity-0 translate-y-6 transition-all duration-700">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white">Achievements</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {badges.map((b,i)=> (
            <div key={i} className="rounded-xl bg-[#111] border border-gray-800 shadow flex items-center justify-center p-6">
              <img src={b} alt={`badge-${i}`} className=" object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection({ skills }) {
  return (
    <section id="Skills" className="py-20 bg-[#111] reveal opacity-0 translate-y-6 transition-all duration-700">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-8">Skills</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((c, idx)=>(
            <div key={idx} className="p-6 rounded-xl bg-[#0f0f17] border border-gray-800 shadow">
              <div className="font-semibold mb-3 text-gray-200">{c.category}</div>
              <ul className="space-y-3">
                {c.items.map((it,i)=>(
                  <li key={i} className="flex items-center justify-between">
                    <span className="text-gray-400">{it.name}</span>
                    <div className="w-32 bg-gray-700 rounded-full h-2 ml-2 overflow-hidden">
                      <div style={{width:`${it.level}%`}} className="h-full bg-[#08fdd8]" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const list = [
    { title: "Portfolio Website", tech: "React • Tailwind", desc: "Responsive professional portfolio with animations and 3D elements." },
    { title: "Satellite Orbit AR", tech: "Unity • ARCore", desc: "Interactive AR visualization of orbits." },
    { title: "E-Commerce App", tech: "React • Firebase", desc: "Full-stack commerce app with secure payments." },
  ];
  return (
    <section id="Projects" className="py-20 bg-[#0f0f17] reveal opacity-0 translate-y-6 transition-all duration-700">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white">Projects</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {list.map((p,i)=>(
            <article key={i} className="p-6 rounded-xl bg-[#111] border border-gray-800 shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-gray-200">{p.title}</h3>
              <div className="text-sm text-gray-400 mt-1">{p.tech}</div>
              <p className="mt-3 text-sm text-gray-400">{p.desc}</p>
              <div className="mt-4 flex gap-3">
                <a href="#" className="text-sm text-[#08fdd8] underline">View</a>
                <a href="#" className="text-sm text-gray-500">Source</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="Contact" className="py-20 bg-[#111] reveal opacity-0 translate-y-6 transition-all duration-700">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-6">Contact</h2>
        <p className="text-gray-400 mb-4">Email: <a href="mailto:jeevanjeevi1974@gmail.com" className="underline text-[#08fdd8]">jeevanjeevi1974@gmail.com</a></p>
        <form onSubmit={(e)=>{e.preventDefault(); alert('Demo submit');}} className="grid gap-4 p-6 rounded-xl bg-[#0f0f17] border border-gray-800">
          <input placeholder="Name" className="p-3 rounded bg-transparent border border-gray-700 text-gray-200" />
          <input type="email" placeholder="Email" className="p-3 rounded bg-transparent border border-gray-700 text-gray-200" />
          <textarea placeholder="Message" rows={6} className="p-3 rounded bg-transparent border border-gray-700 text-gray-200" />
          <button className="px-5 py-3 rounded-md font-semibold bg-[#ff4d6d] text-white">Send</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-gray-500">© {new Date().getFullYear()} Jeevitha V </footer>
  );
}

export default function App() {
  useReveal();
  const skills = [
    { category: "Programming", items: [ { name: "Java", level: 85 }, { name: "Python", level: 80 }, { name: "C++", level: 70 } ] },
    { category: "Web", items: [ { name: "React", level: 88 }, { name: "Tailwind", level: 82 }, { name: "Node.js", level: 72 } ] },
    { category: "Systems", items: [ { name: "OS", level: 75 }, { name: "DBMS", level: 70 }, { name: "Networks", level: 65 } ] }
  ];
  const sections = ["Home","About","Achievements","Skills","Projects","Contact"];
  return (
    <div className="relative min-h-screen font-sans bg-[#0f0f17] text-white">
      <Navbar sections={sections} />
      <main className="relative z-10 pt-28">
        <Hero />
        <About />
        <Achievements />
        <SkillsSection skills={skills} />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <style>{`
        .reveal { transform: translateY(16px); opacity: 0; }
        .reveal.show { transform: translateY(0); opacity: 1; }
      `}</style>
    </div>
  );
}
