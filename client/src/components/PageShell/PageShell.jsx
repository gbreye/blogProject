function PageShell({ className = '', children }) {
  return (
    <section className={`page-shell ${className}`.trim()}>
      {children}
    </section>
  );
}

export default PageShell;
