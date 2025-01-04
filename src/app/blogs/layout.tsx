export const metadata = {
  title: "Blog lists",
  description: "Welcome to our blog",
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
