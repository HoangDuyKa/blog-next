"use client";
import Link from "next/link";
import { Button, Card } from "react-bootstrap";
import useSWR, { Fetcher } from "swr";

const BlogDetail = ({ params }: { params: { id: number } }) => {
  const fetcher: Fetcher<IBlog, string> = (url: string) =>
    fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${params.id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <div className="my-3">
        <Link href={"/blogs"}>Go Back</Link>
      </div>

      <Card className="text-center">
        <Card.Header>Title: {data?.title}</Card.Header>
        <Card.Body>
          {/* <Card.Title>Special title treatment</Card.Title> */}
          <Card.Text>Content: {data?.content}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">Author: {data?.author}</Card.Footer>
      </Card>
    </>
  );
};

export default BlogDetail;
