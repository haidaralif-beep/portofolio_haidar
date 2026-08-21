'use client'
import { useEffect, useState } from 'react'
import ShaderCanvas from './ShaderCanvas.jsx'
import BorderGlow from './BorderGlow.jsx'
import ProfileCard from './ProfileCard.jsx'
import ScrollReveal from './ScrollReveal.jsx'
import ShinyText from './ShinyText.jsx'
import DecryptedText from './DecryptedText.jsx'
import BlurText from './BlurText.jsx'
import ScrambledText from './ScrambledText.jsx'
import GooeyNav from './GooeyNav.jsx'
import { GithubIcon, LinkedinIcon, InstagramIcon, MailIcon, YoutubeIcon } from './SocialIcons.jsx'

// ponytail: shared BorderGlow tuning for all cards; tweak colors/radius here if the look changes.
const borderGlowProps = {
  glowColor: '81 88 62',
  backgroundColor: '#101711',
  borderRadius: 20,
  glowRadius: 40,
  glowIntensity: 1,
  coneSpread: 25,
  edgeSensitivity: 30,
  colors: ['#b7f34a', '#a2d665', '#6f9f35'],
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const SKILL_GROUPS = [
  {
    icon: 'code',
    number: '01',
    title: 'Frontend',
    items: ['HTML & CSS', 'JavaScript / TypeScript', 'React.js', 'Tailwind CSS'],
  },
  {
    icon: 'dns',
    number: '02',
    title: 'Backend',
    items: ['Node.js', 'Express', 'RESTful API', 'Python', 'PHP'],
  },
  {
    icon: 'database',
    number: '03',
    title: 'Database',
    items: ['PostgreSQL', 'MySQL'],
  },
  {
    icon: 'build',
    number: '04',
    title: 'Tools',
    items: ['Git & GitHub', 'Postman', 'Figma'],
  },
]

const JOURNEY_STEPS = [
  {
    year: '2026',
    title: 'Real Projects',
    text: 'Berhasil menghubungkan fondasi dasar dengan pengembangan web modern. Meskipun telah memahami alur fullstack, saya tetap konsisten belajar dan mengeksplorasi teknologi baru.',
  },
  {
    year: '2025',
    title: 'Building Core Skills',
    text: 'Melangkah ke kelas 11, saya memperdalam kemampuan pemrograman menggunakan Python. Saya aktif berlatih membuat aplikasi berbasis CRUD untuk memperkuat logika backend dan manajemen data.',
  },
  {
    year: '2024',
    title: 'Starting the Journey',
    text: 'Memulai pendidikan di SMKN 2 jurusan RPL. Di tahun pertama ini, saya berfokus memahami logika pemrograman dasar, mengasah berpikir algoritmik, dan mendesain alur sistem menggunakan Flowgorithm.',
  },
]

const PROJECTS = [
  {
    tag: 'WEB APP',
    title: 'Pemesanan Makanan Online',
    text: 'Aplikasi pemesanan makanan online yang memudahkan pengguna memesan hidangan favorit secara praktis dengan antarmuka yang intuitif.',
    stack: ['Html & CSS', 'Python', 'mysql'],
    image: '/Capture.PNG',
    demoUrl: 'https://youtu.be/SoY89UYryJo?si=jfR-NNWF1JHppaYR',
    githubUrl: 'https://github.com/haidaralif-beep/TA-idarlicious-food.git',
    reversed: false,
  },
  {
    tag: 'PORTFOLIO',
    title: 'Personal Digital Ecosystem',
    text: "The current website you are viewing. A bespoke portfolio designed to reflect a 'Technology × Nature' aesthetic, built with raw performance and clean architecture.",
    stack: ['HTML/CSS', 'JavaScript', 'Tailwind', 'WebGL'],
    demoUrl: '#',
    githubUrl: '#',
    reversed: true,
  },
]

const SERVICES = [
  {
    icon: 'web',
    title: 'Web Development',
    text: 'Pembuatan aplikasi web modern yang responsif, rapi, dan mudah digunakan, disesuaikan dengan kebutuhan dan ide yang ingin kamu wujudkan.',
  },
  {
    icon: 'design_services',
    title: 'Frontend Engineering',
    text: 'Merancang tampilan antarmuka web yang menarik, interaktif, dan responsif di berbagai perangkat menggunakan framework web modern.',
  },
  {
    icon: 'settings_system_daydream',
    title: 'Backend Systems',
    text: 'Membangun logika server-side dan integrasi API yang stabil untuk memastikan alur data dan fungsi aplikasi berjalan dengan lancar.',
  },
  {
    icon: 'storage',
    title: 'Database Architecture',
    text: 'Mendesain dan mengelola struktur basis data (CRUD) yang teratur dan aman untuk mendukung kebutuhan penyimpanan data aplikasi.',
  },
]

const CONTACT_LINKS = [
  { icon: 'mail', label: 'haidaralif875@gmail.com', href: 'mailto:haidaralif875@gmail.com', external: false },
  { icon: 'code', label: 'haidaralif-beep', href: 'https://github.com/haidaralif-beep', external: true },
  { icon: 'link', label: 'linkedin.com/in/haidar', href: 'https://www.linkedin.com/in/haidar-alif-fajar-maulana/', external: true },
  { icon: 'photo_camera', label: '@haidarafm_', href: 'https://instagram.com/haidarafm_', external: true },
]


function useActiveSection() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      let current = ''
      const sections = document.querySelectorAll('section[id]')
      sections.forEach((section) => {
        if (pageYOffset >= section.offsetTop - 150) {
          current = section.id
        }
      })
      if (current) setActive(current)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return active
}

function useScrollReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal:not(.active)')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function Navbar({ active }) {
  const activeIndex = NAV_LINKS.findIndex((link) => link.href.slice(1) === active)

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/30 transition-all duration-300"
      id="navbar"
    >
      <div className="flex justify-between items-center max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-sm w-full">
        <a className="font-display text-headline-md tracking-tighter text-on-background hover:text-primary-container transition-colors" href="#home">
          HAIDAR.
        </a>
        <div className="hidden md:block">
          <GooeyNav
            items={NAV_LINKS}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={activeIndex >= 0 ? activeIndex : 0}
            activeIndex={activeIndex >= 0 ? activeIndex : 0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>
        <a
          className="hidden md:inline-flex items-center justify-center px-6 py-2 btn-primary rounded-sm font-label-mono text-label-mono tracking-widest font-bold"
          href="#contact"
        >
          Let&apos;s Talk
        </a>
        <div className="md:hidden flex items-center">
          <GooeyNav
            items={NAV_LINKS}
            particleCount={10}
            particleDistances={[60, 5]}
            particleR={80}
            initialActiveIndex={activeIndex >= 0 ? activeIndex : 0}
            activeIndex={activeIndex >= 0 ? activeIndex : 0}
            animationTime={500}
            timeVariance={200}
            colors={[1, 2, 3, 4]}
          />
        </div>
      </div>
    </nav>
  )
}

function SectionHeading({ number, title }) {
  return (
    <div className="mb-16 reveal">
      <h2 className="font-display text-headline-md md:text-headline-lg text-on-background flex items-center gap-4">
        <span className="text-primary-container font-label-mono text-sm tracking-widest opacity-60">{number}.</span>
        {title}
      </h2>
      <div className="h-px w-full max-w-[200px] bg-outline-variant/30 mt-4" />
    </div>
  )
}

function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-24 pb-xl px-margin-mobile md:px-margin-desktop overflow-hidden"
      id="home"
    >
      <div className="absolute inset-0 w-full h-full z-0 opacity-40">
        <ShaderCanvas variant="home" className="block h-full w-full" />
      </div>
      <div className="radial-glow w-[800px] h-[800px] top-[-200px] left-[-200px]" />
      <div className="max-w-[1440px] w-full mx-auto grid grid-cols-4 md:grid-cols-12 gap-gutter relative z-10">
        <div className="col-span-4 md:col-span-7 flex flex-col justify-center reveal active">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_rgba(183,243,74,0.8)]" />
            <span className="font-label-mono text-label-mono text-primary-container tracking-widest uppercase">
              Technology × Nature
            </span>
          </div>
                    <div className="mb-6">
            <ShinyText
              text="HELLO, I&apos;M HAIDAR."
              speed={6}
              className="font-display text-headline-lg-mobile md:text-display leading-tight"
              color="#8a8f88"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
            />
            <br />
            <ShinyText
              text="FULLSTACK DEVELOPER"
              speed={6}
              className="font-display text-headline-lg-mobile md:text-display leading-tight"
              color="#8a8f88"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
            />
          </div>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8">
            <DecryptedText
              text="Saya membangun portofolio ini sebagai ruang belajar, bereksperimen, dan menciptakan solusi digital yang bermanfaat."
              animateOn="view"
              sequential={true}
              revealDirection="start"
              speed={30}
            />
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              className="btn-primary px-8 py-4 rounded-sm font-label-mono text-label-mono tracking-widest font-bold text-center inline-flex justify-center items-center gap-2"
              href="#projects"
            >
              VIEW MY WORK
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
            <a
              className="btn-ghost px-8 py-4 rounded-sm font-label-mono text-label-mono tracking-widest font-bold text-center"
              href="#about"
            >
              ABOUT ME
            </a>
          </div>
        </div>
        <div className="col-span-4 md:col-span-5 flex items-center justify-center reveal delay-100 z-10 mt-12 md:mt-0">
          <ProfileCard
            name="HAIDAR."
            handle="haidarafm_"
            avatarUrl="/e846b2d0-4c0a-415a-8fbc-49b11ebe1485.jpg"
            enableTilt={true}
            behindGlowEnabled
            innerGradient="linear-gradient(145deg, rgba(16, 23, 17, 0.95) 0%, rgba(16, 23, 17, 0.85) 50%, rgba(16, 23, 17, 0.95) 100%)"
          />
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="py-xl px-margin-mobile md:px-margin-desktop relative" id="about">
      <div className="max-w-[1440px] w-full mx-auto">
        <SectionHeading number="01" title="ABOUT ME" />
        <div className="grid grid-cols-4 md:grid-cols-12 gap-gutter">
          <div className="col-span-4 md:col-span-6 reveal delay-100">
            <ScrambledText
              radius={100}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:"
              className="font-body-lg text-body-lg text-on-surface-variant mb-6"
            >
              Halo! Saya Haidar, siswa SMKN 2 CIMAHI jurusan RPL yang sedang aktif dan antusias mendalami dunia Fullstack Web Development. Saya orangnya punya rasa penasaran yang tinggi dan suka ketagihan kalau lagi nyari solusi dari masalah kodingan (debugging).
            </ScrambledText>
            <ScrambledText
              radius={100}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:"
              className="font-body-md text-body-md text-on-surface-variant opacity-80"
            >
              Saat ini saya terus fokus membangun proyek-proyek kecil sambil memperkuat fondasi fullstack development agar siap menghadapi tantangan di dunia kerja nanti.
            </ScrambledText>
          </div>
          <div className="col-span-4 md:col-span-5 md:col-start-8 grid gap-4 reveal delay-200">
            <BorderGlow {...borderGlowProps} className="h-full">
              <div className="glass-panel p-6 h-full">
                <span className="font-label-mono text-label-mono text-primary-container tracking-widest mb-2 block">
                  ROLE
                </span>
                <h3 className="font-headline-md text-headline-md text-on-background">FULLSTACK DEVELOPER</h3>
              </div>
            </BorderGlow>
            <BorderGlow {...borderGlowProps} className="h-full">
              <div className="glass-panel p-6 h-full">
                <span className="font-label-mono text-label-mono text-primary-container tracking-widest mb-2 block">
                  FOCUS
                </span>
                <h3 className="font-headline-md text-headline-md text-on-background">
                  Modern Web Experiences
                </h3>
              </div>
            </BorderGlow>
            <BorderGlow {...borderGlowProps} className="h-full">
              <div className="glass-panel p-6 border-l-2 border-l-primary-container h-full">
                <span className="font-label-mono text-label-mono text-primary-container tracking-widest mb-2 block">
                  CURRENTLY
                </span>
                <h3 className="font-headline-md text-headline-md text-on-background">
                  Building &amp; Learning
                </h3>
              </div>
            </BorderGlow>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="py-xl px-margin-mobile md:px-margin-desktop relative bg-surface/50" id="skills">
      <div className="max-w-[1440px] w-full mx-auto">
        <SectionHeading number="02" title="SKILLS" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_GROUPS.map((group, i) => (
            <BorderGlow
              key={group.number}
              {...borderGlowProps}
              className={`reveal delay-${(i + 1) * 100} h-full`}
            >
              <div className="glass-panel p-8 h-full">
                <div className="flex justify-between items-start mb-8">
                  <span className="material-symbols-outlined text-primary-container text-4xl">{group.icon}</span>
                  <span className="font-label-mono text-label-mono text-on-surface-variant opacity-50">
                    {group.number}
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-background mb-4">{group.title}</h3>
                <ul className="space-y-3 font-body-md text-on-surface-variant">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  )
}

function Journey() {
  return (
    <section className="py-xl px-margin-mobile md:px-margin-desktop relative" id="journey">
      <div className="max-w-[1440px] w-full mx-auto">
        <SectionHeading number="03" title="JOURNEY" />
        <div className="max-w-3xl mx-auto">
          <div className="timeline-container">
            {JOURNEY_STEPS.map((step, i) => (
              <div key={step.year} className={`timeline-node reveal ${i > 0 ? `delay-${i * 100}` : ''}`}>
                <div className="timeline-dot" />
                <div className="pl-6">
                  <span className="font-label-mono text-label-mono text-primary-container tracking-widest mb-2 block">
                    {step.year}
                  </span>
                  <h3 className="font-headline-md text-headline-md text-on-background mb-2">{step.title}</h3>
                  <p className="font-body-md text-on-surface-variant">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectRow({ project }) {
  const textCol = `lg:col-span-5 ${project.reversed ? 'lg:order-1 order-2 lg:pr-8 lg:text-right' : 'lg:pl-8'}`
  const mockupCol = `lg:col-span-7 ${project.reversed ? 'lg:order-2 order-1' : ''}`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center reveal">
      <div className={mockupCol}>
        <div className="project-mockup">
          {project.image ? (
            <img src={project.image} alt={project.title} />
          ) : (
            <div className="project-mockup-inner">
              <span className="material-symbols-outlined text-6xl opacity-20">image</span>
            </div>
          )}
        </div>
      </div>
      <div className={textCol}>
        <span className="font-label-mono text-label-mono text-primary-container tracking-widest mb-4 block">
          {project.tag}
        </span>
        <h3 className="font-display text-headline-md text-on-background mb-4">{project.title}</h3>
        <div
          className={`glass-panel p-6 rounded-sm mb-6 relative z-10 ${project.reversed ? 'lg:-mr-12' : 'lg:-ml-12'}`}
        >
          <p className="font-body-md text-on-surface-variant">{project.text}</p>
        </div>
        <ul className={`flex flex-wrap gap-3 font-label-mono text-xs text-secondary opacity-80 mb-6 ${project.reversed ? 'lg:justify-end' : ''}`}>
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className={`flex gap-4 ${project.reversed ? 'lg:justify-end' : ''}`}>
          {project.demoUrl && project.demoUrl !== '#' && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-container transition-colors"
              title="View Demo"
            >
              {project.demoUrl.includes('youtube.com') || project.demoUrl.includes('youtu.be') ? (
                <YoutubeIcon className="w-6 h-6" />
              ) : (
                <span className="material-symbols-outlined">link</span>
              )}
            </a>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-container transition-colors"
              title="View Code"
            >
              <GithubIcon className="w-6 h-6" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function Projects() {
  return (
    <section className="py-xl px-margin-mobile md:px-margin-desktop relative bg-surface/50" id="projects">
      <div className="max-w-[1440px] w-full mx-auto">
        <SectionHeading number="04" title="PROJECTS" />
        <div className="space-y-16">
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.title + i} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="py-xl px-margin-mobile md:px-margin-desktop relative" id="services">
      <div className="max-w-[1440px] w-full mx-auto">
        <SectionHeading number="05" title="SERVICES" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => (
            <BorderGlow
              key={service.title}
              {...borderGlowProps}
              className={`reveal ${i > 0 ? `delay-${i * 100}` : ''} h-full`}
            >
              <div className="glass-panel p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <span className="material-symbols-outlined text-primary-container text-4xl">{service.icon}</span>
                  <h3 className="font-headline-md text-headline-md text-on-background">{service.title}</h3>
                </div>
                <p className="font-body-md text-on-surface-variant">{service.text}</p>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="py-xl px-margin-mobile md:px-margin-desktop relative bg-surface/50" id="contact">
      <div className="max-w-[1440px] w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="reveal">
            <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-on-background mb-6 leading-tight">
              LET&apos;S BUILD SOMETHING <span className="text-primary-container">MEANINGFUL</span>
            </h2>
            <ScrambledText
              radius={100}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:"
              className="font-body-lg text-body-lg text-on-surface-variant mb-6"
            >
              Baik kamu punya konsep web yang mau dicoba buat, mau bagi tips belajar, atau sekadar ingin berkenalan pintu saya selalu terbuka.
               Sebagai orang yang sedang aktif mendalami web development, saya senang banget kalau bisa dapet peluang baru atau sekadar diskusi!
            </ScrambledText>
            <div className="space-y-6 font-label-mono text-sm">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  className="flex items-center gap-4 text-on-surface-variant hover:text-primary-container transition-colors break-all"
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  {link.icon === 'mail' && <MailIcon className="w-6 h-6" />}
                  {link.icon === 'code' && <GithubIcon className="w-6 h-6" />}
                  {link.icon === 'link' && <LinkedinIcon className="w-6 h-6" />}
                  {link.icon === 'photo_camera' && <InstagramIcon className="w-6 h-6" />}
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="glass-panel p-8 rounded-sm reveal delay-100">
            <form
              className="space-y-6"
              onSubmit={async (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const data = Object.fromEntries(formData)
                try {
                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    body: JSON.stringify(data),
                  })
                  if (res.ok) alert('Message sent successfully!')
                  else alert('Failed to send message.')
                } catch (err) {
                  alert('An error occurred.')
                }
              }}
            >
              <div>
                <label className="block font-label-mono text-xs text-primary-container tracking-widest mb-2" htmlFor="name">
                  NAME
                </label>
                <input
                  name="name"
                  required
                  className="w-full bg-background border border-outline-variant/50 rounded-sm px-4 py-3 text-on-background focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                  id="name"
                  placeholder="John Doe"
                  type="text"
                />
              </div>
              <div>
                <label className="block font-label-mono text-xs text-primary-container tracking-widest mb-2" htmlFor="email">
                  EMAIL
                </label>
                <input
                  name="email"
                  required
                  className="w-full bg-background border border-outline-variant/50 rounded-sm px-4 py-3 text-on-background focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                  id="email"
                  placeholder="john@example.com"
                  type="email"
                />
              </div>
              <div>
                <label className="block font-label-mono text-xs text-primary-container tracking-widest mb-2" htmlFor="message">
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  required
                  className="w-full bg-background border border-outline-variant/50 rounded-sm px-4 py-3 text-on-background focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all min-h-[150px]"
                  id="message"
                  placeholder="How can we collaborate?"
                />
              </div>
              <button className="w-full btn-primary px-8 py-4 rounded-sm font-label-mono text-label-mono tracking-widest font-bold" type="submit">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="w-full py-lg bg-surface-dim border-t border-outline-variant/20 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto w-full gap-md">
        <div className="font-display text-headline-md text-on-background">HAIDAR.</div>
        <div className="flex gap-6 font-label-mono text-label-mono">
          <a className="text-on-surface-variant hover:text-primary transition-all hover:-translate-y-[2px]" href="#">
            Privacy Policy
          </a>
          <a className="text-on-surface-variant hover:text-primary transition-all hover:-translate-y-[2px]" href="#">
            Terms of Service
          </a>
          <a className="text-on-surface-variant hover:text-primary transition-all hover:-translate-y-[2px]" href="#">
            Source Code
          </a>
        </div>
        <div className="font-body-md text-body-md text-secondary opacity-70 text-center md:text-right">
          <p>© 2026 HAIDAR. ENGINEERED FOR THE DIGITAL ECOSYSTEM.</p>
          <p className="text-xs mt-1 font-label-mono uppercase tracking-widest">TECHNOLOGY × NATURE</p>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const active = useActiveSection()
  useScrollReveal()

  return (
    <>
      <ShaderCanvas />
      <div className="noise-bg" />
      <Navbar active={active} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Journey />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App