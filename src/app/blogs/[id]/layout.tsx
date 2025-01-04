export const metadata = {
  title: "Blog view detail",
  description: "Welcome to our blog",
};

export default function ViewDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
