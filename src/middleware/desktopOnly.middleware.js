export default function DesktopOnlyMiddleware({ next }) {
  const isMobile = window.innerWidth <= 1024;

  if (isMobile) {
    alert('Halaman ini hanya dapat diakses melalui perangkat desktop.');
    return;
  }

  return next();
}
