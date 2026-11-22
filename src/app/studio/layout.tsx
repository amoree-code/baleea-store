// Separate root layout: the Studio is an LTR app and must not inherit the site's RTL shell or styles.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
