export default function FloatingNav({ links, activeSection }) {
  return (
    <nav className="floating-nav" aria-label="Pindah bagian undangan">
      {links.map(({ id, label, icon }) => (
        <a
          className={`floating-nav-link${activeSection === id ? ' is-active' : ''}`}
          href={`#${id}`}
          key={id}
          aria-label={`Ke bagian ${label.toLowerCase()}`}
          aria-current={activeSection === id ? 'location' : undefined}
        >
          <span className={`floating-nav-icon${id === 'details' ? ' floating-nav-icon-details' : ''}`} aria-hidden="true">{icon}</span>
          <span className="floating-nav-label">{label}</span>
        </a>
      ))}
    </nav>
  );
}
