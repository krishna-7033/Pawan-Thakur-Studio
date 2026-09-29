import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Aperture,
  Camera,
  ChevronDown,
  Heart,
  MapPin,
  Menu,
  MessageCircle,
  Play,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { siteData } from "./data/siteData";
import "./App.css";

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
const reveal = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.15 },
  variants: fade,
};
function Logo({ light = false }) {
  return (
    <Link className={`logo ${light ? "logo-light" : ""}`} to="/">
      <span>PT</span>
      <strong>
        Pawan Thakur
        <br />
        <i>Photography</i>
      </strong>
    </Link>
  );
}
function SectionHeading({ script, title, dark = false }) {
  return (
    <motion.div className={`section-heading ${dark ? "dark" : ""}`} {...reveal}>
      <span>{script}</span>
      <h2>{title}</h2>
      <div className="flourish">
        <b></b>
        <i></i>
        <b></b>
      </div>
    </motion.div>
  );
}
function Button({ children, to, onClick, light = false }) {
  const props = { className: `pill ${light ? "pill-light" : ""}`, onClick };
  return to ? (
    <Link {...props} to={to}>
      {children}
    </Link>
  ) : (
    <button {...props}>{children}</button>
  );
}
function Image({ data, className = "", ...props }) {
  return (
    <img
      className={className}
      src={data.src}
      alt={data.alt}
      loading="lazy"
      style={{ backgroundColor: data.fallback }}
      {...props}
    />
  );
}
function Icon({ name }) {
  const icons = {
    heart: Heart,
    aperture: Aperture,
    sparkles: Sparkles,
    camera: Camera,
  };
  const Component = icons[name] || Camera;
  return <Component size={26} strokeWidth={1.5} />;
}
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["ABOUT US", "/about"],
    ["POPULAR LOCATIONS", "/locations"],
    ["SERVICES", "/services"],
    ["FILMS", "/films"],
    ["GALLERY", "/gallery"],
    ["CONTACT US", "/contact"],
  ];
  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <Logo light={!scrolled} />
      <nav>
        <Link to="/">HOME</Link>
        {links.map(([label, to], i) => (
          <Link key={label} to={to}>
            {label}
            {(i === 1 || i === 2) && <ChevronDown size={13} />}
          </Link>
        ))}
      </nav>
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Open navigation"
      >
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <div className="mobile-menu">
          {links.map(([label, to]) => (
            <Link key={label} to={to} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
function Hero() {
  const [active, setActive] = useState(0);
  const current = siteData.hero[active];
  useEffect(() => {
    const timer = setInterval(
      () => setActive((v) => (v + 1) % siteData.hero.length),
      6000,
    );
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="hero">
      <AnimatePresence mode="sync">
        {siteData.hero.map(
          (slide, index) =>
            index === active && (
              <motion.div
                key={slide.src}
                className="hero-slide"
                style={{ backgroundImage: `url(${slide.src})` }}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4 }}
              />
            ),
        )}
      </AnimatePresence>
      <div className="hero-shade"></div>
      <button
        className="hero-arrow left"
        aria-label="Previous slide"
        onClick={() =>
          setActive((active - 1 + siteData.hero.length) % siteData.hero.length)
        }
      >
        <ArrowLeft />
      </button>
      <button
        className="hero-arrow right"
        aria-label="Next slide"
        onClick={() => setActive((active + 1) % siteData.hero.length)}
      >
        <ArrowRight />
      </button>
      <motion.div
        className="hero-copy"
        key={current.src}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Logo light />
        <p>{current.eyebrow}</p>
        <h1>“{current.accent}”</h1>
        <small>{current.subline}</small>
      </motion.div>
      <div className="hero-pagination">
        {siteData.hero.map((_, i) => (
          <button
            key={i}
            className={i === active ? "active" : ""}
            onClick={() => setActive(i)}
          >
            <em>{String(i + 1).padStart(2, "0")}</em>
          </button>
        ))}
      </div>
      <a className="scroll-cue" href="#locations">
        <ArrowDown size={15} /> Scroll to explore
      </a>
    </section>
  );
}
function Locations() {
  const names = ["Shimla", "Manali", "Kasauli", "Chail"];
  return (
    <section className="section locations" id="locations">
      <SectionHeading
        script="Prime Locations"
        title="Where your story unfolds"
      />
      <div className="location-grid">
        {siteData.locations.map((item, index) => (
          <motion.div
            className="location-card"
            key={item.src}
            {...reveal}
            whileHover={{ y: -10 }}
          >
            <Image data={item} />
            <div className="location-label">
              <small>Popular Destinations</small>
              <h3>{names[index]}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
function FilmsIntro() {
  return (
    <section className="section intro">
      <div className="intro-images">
        {siteData.studioImages.slice(0, 2).map((item) => (
          <Image key={item.src} data={item} />
        ))}
      </div>
      <motion.div className="intro-copy" {...reveal}>
        <span className="eyebrow">Photo Studio</span>
        <h2>
          Crafted with
          <br />
          <i>timeless emotion</i>
        </h2>
        <p>
          We photograph the kind of moments that do not need an audience: a hand
          finding yours, a breath before the music begins, a parent trying not
          to cry.
        </p>
        <p>
          Based in Shimla, Pawan Thakur Photography brings a quiet, observant
          eye to love stories across Himachal and wherever your celebration
          takes you.
        </p>
        <Button to="/about">
          Meet the studio <ArrowRight size={15} />
        </Button>
      </motion.div>
      <div className="intro-images">
        {siteData.studioImages.slice(2).map((item) => (
          <Image key={item.src} data={item} />
        ))}
      </div>
    </section>
  );
}
function ServicesBand({ second = false }) {
  return (
    <section
      className="services-band"
      style={{
        backgroundImage: `url(${second ? siteData.events[1].src : "https://pawanphotography.co.in/images/Wedding%20pic.jpeg"})`,
      }}
    >
      <div className="band-overlay"></div>
      <div className="service-grid">
        {siteData.services.map((service) => (
          <motion.div className="service" {...reveal} key={service.title}>
            <div className="service-icon">
              <Icon name={service.icon} />
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
function Story() {
  return (
    <section className="section story">
      <SectionHeading script="Lens Legacy" title="A way of seeing" />
      <div className="story-grid">
        {siteData.story.map((item) => (
          <motion.article className="story-card" {...reveal} key={item.label}>
            <Image data={item} />
            <span>{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
function Cta() {
  return (
    <section
      className="cta"
      style={{ backgroundImage: `url(${siteData.hero[2].src})` }}
    >
      <div className="cta-overlay"></div>
      <motion.div {...reveal}>
        <span>Timeless Wedding Tales</span>
        <h2>
          Celebrating love
          <br />
          through lens
        </h2>
        <p>
          For the moments you will remember and the ones you forgot happened.
        </p>
        <div>
          <Button light to="/gallery">
            Our Gallery
          </Button>
          <Button light to="/contact">
            Contact Us
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
function Timeline() {
  return (
    <section className="section timeline">
      <SectionHeading script="Forever Us" title="Our story" />
      <div className="timeline-list">
        {siteData.timeline.map((item, index) => (
          <motion.article
            className={`timeline-row ${index % 2 ? "reverse" : ""}`}
            {...reveal}
            key={item.title}
          >
            <div className="timeline-copy">
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Button to="/contact">
                Read More <ArrowRight size={15} />
              </Button>
            </div>
            <Image data={item} />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
function Events() {
  const [active, setActive] = useState(0);
  const item = siteData.events[active];
  return (
    <section className="section events">
      <SectionHeading script="Event Info" title="When & where" />
      <div className="event-tabs">
        {["Ceremony", "Party", "Dinner", "Reception"].map((label, i) => (
          <button
            className={active === i ? "active" : ""}
            key={label}
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            {label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          className="event-panel"
          key={item.title}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Image data={item} />
          <div>
            <span className="eyebrow">Chapter 0{active + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <Button to="/contact">
              Discover More <ArrowRight size={15} />
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
function Films() {
  const [video, setVideo] = useState(null);
  return (
    <section className="section films">
      <SectionHeading
        script="Cinematic Stories"
        title="Our photography films"
      />
      <div className="film-grid">
        {siteData.films.map((item, i) => (
          <button
            className="film-card"
            key={`${item.src}-${i}`}
            onClick={() => setVideo(item.src)}
          >
            <video
              src={item.src}
              muted
              autoPlay
              loop
              playsInline
              preload="none"
            />
            <span>
              <Play fill="white" size={20} />
            </span>
            <small>Film 0{i + 1}</small>
          </button>
        ))}
      </div>
      {video && (
        <div className="modal" onClick={() => setVideo(null)}>
          <button aria-label="Close film">
            <X />
          </button>
          <video
            src={video}
            controls
            autoPlay
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
function Moments() {
  const [active, setActive] = useState(0);
  return (
    <section className="section moments">
      <SectionHeading
        script="Cinematic Moments"
        title="The feeling in between"
      />
      <motion.div className="moment-frame" {...reveal}>
        <Image data={siteData.moments[active]} />
        <button
          onClick={() =>
            setActive(
              (active - 1 + siteData.moments.length) % siteData.moments.length,
            )
          }
          aria-label="Previous moment"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={() => setActive((active + 1) % siteData.moments.length)}
          aria-label="Next moment"
        >
          <ArrowRight />
        </button>
        <span>A celebration of love</span>
      </motion.div>
      <div className="dots">
        {siteData.moments.map((_, i) => (
          <button
            key={i}
            className={active === i ? "active" : ""}
            onClick={() => setActive(i)}
            aria-label={`Show moment ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const groups = ["All", "Pre Wedding", "Wedding", "Event", "Outdoor"];
  const filtered = siteData.gallery.filter(
    (item, i) =>
      filter === "All" ||
      (filter === "Pre Wedding" && i < 7) ||
      (filter === "Wedding" && i >= 7 && i < 12) ||
      (filter === "Event" && i >= 12 && i < 16) ||
      (filter === "Outdoor" && i >= 16),
  );
  return (
    <section className="section gallery">
      <SectionHeading script="Photo Collection" title="Our gallery" />
      <div className="filter-row">
        {groups.map((item) => (
          <button
            className={filter === item ? "active" : ""}
            key={item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <motion.div className="gallery-grid" layout>
        {filtered.map((item) => (
          <motion.button
            className="gallery-item"
            layout
            key={item.src}
            onClick={() => setLightbox(item)}
          >
            <Image data={item} />
          </motion.button>
        ))}
      </motion.div>
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button aria-label="Close image">
            <X />
          </button>
          <Image data={lightbox} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
function Booking() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({});
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <section
      className="booking"
      style={{ backgroundImage: `url(${siteData.hero[5].src})` }}
    >
      <div className="booking-overlay"></div>
      <motion.form
        className="booking-card"
        {...reveal}
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <span>Book your photoshoot</span>
        <h2>
          Let’s make room
          <br />
          for the good stuff.
        </h2>
        <p>
          Tell us a little about what you are planning. We will be in touch with
          a thoughtful next step.
        </p>
        {sent ? (
          <div className="success">
            <Heart /> Thank you. Your story is already on our radar.
          </div>
        ) : (
          <>
            <div className="form-grid">
              {[
                ["Full Name*", "name", "text"],
                ["Email*", "email", "email"],
                ["Phone*", "phone", "tel"],
                ["Preferred Date*", "date", "date"],
                ["Type of Photoshoot*", "type", "select"],
                ["Preferred Location*", "location", "text"],
                ["Number of People", "people", "number"],
                ["Estimated Budget*", "budget", "select"],
              ].map(([label, name, type]) => (
                <label key={name}>
                  {label}
                  {type === "select" ? (
                    <select
                      name={name}
                      required={label.includes("*")}
                      onChange={update}
                    >
                      <option value="">Choose</option>
                      <option>Wedding</option>
                      <option>Pre-Wedding</option>
                      <option>Engagement</option>
                      <option>Portrait</option>
                      <option>Event</option>
                      <option>Fashion</option>
                    </select>
                  ) : (
                    <input
                      name={name}
                      type={type}
                      required={label.includes("*")}
                      onChange={update}
                    />
                  )}
                </label>
              ))}
            </div>
            <label>
              Additional Details
              <textarea name="details" rows="4" onChange={update} />
            </label>
            <button className="submit" type="submit">
              Send Inquiry <Send size={16} />
            </button>
          </>
        )}
      </motion.form>
    </section>
  );
}
function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer>
      <div className="newsletter">
        <div>
          <span>Stay close</span>
          <h2>Get updated with our latest news</h2>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            placeholder="Your email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button>
            Subscribe Now <Send size={15} />
          </button>
        </form>
      </div>
      <div className="footer-grid">
        <div>
          <Logo light />
          <p>
            Honest, atmospheric photography for people who care deeply about the
            way it felt.
          </p>
          <div className="socials">
            <b>f</b>
            <b>𝕏</b>
            <b>in</b>
            <MessageCircle />
            <b>◎</b>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <Link to="/about">About us</Link>
          <Link to="/services">Services</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact us</Link>
        </div>
        <div>
          <h4>Find us</h4>
          <p>
            <MapPin /> Studio 26, C/O Kali 1, Middle Bazar, Gunj Bazar, Shimla,
            Himachal Pradesh 171001
          </p>
          <p>
            <MessageCircle /> +91 XXXXXXX-XXXX 
          </p>
          <p>
            <Send /> hello@pawanphotography.co.in 
          </p>
        </div>
        <div>
          <h4>Instagram Posts</h4>
          <div className="footer-images">
            {siteData.footerImages.map((item) => (
              <Image key={item.src} data={item} />
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Pawan Thakur Photography. All rights reserved.</span>
        <span>We accept · Visa · Mastercard · UPI</span>
      </div>
    </footer>
  );
}
function Placeholder({ title }) {
  return (
    <>
      <Navbar />
      <main className="placeholder">
        <span>PAWAN THAKUR PHOTOGRAPHY</span>
        <h1>{title}</h1>
        <Button to="/">
          Return home <ArrowUp size={15} />
        </Button>
      </main>
      <Footer />
    </>
  );
}
function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Locations />
        <FilmsIntro />
        <ServicesBand />
        <Story />
        <Cta />
        <Timeline />
        <ServicesBand second />
        <Events />
        <Films />
        <Moments />
        <Gallery />
        <Booking />
      </main>
      <Footer />
      <button
        className="top-button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={<Placeholder title="A studio built around feeling" />}
        />
        <Route
          path="/locations"
          element={<Placeholder title="Stories from the hills" />}
        />
        <Route
          path="/services"
          element={<Placeholder title="Photography with intention" />}
        />
        <Route
          path="/films"
          element={<Placeholder title="Stories in motion" />}
        />
        <Route
          path="/gallery"
          element={<Placeholder title="A collection of moments" />}
        />
        <Route
          path="/contact"
          element={<Placeholder title="Let’s make something lasting" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
