"use client";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import AddNewBlogModal from "./AddNewBlogModal";
import Link from "next/link";
import { toast } from "react-toastify";
import { mutate } from "swr";
interface IProps {
  blogs: IBlog[];
}
const Tables = (props: IProps) => {
  const { blogs } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [action, setAction] = useState<string>("add");
  const [blog, setBlog] = useState<IBlog | null>(null);
  console.log(">>> Check props blogs:", blogs);

  const handleDelete = (id: number) => {
    if (confirm(`Are you sure you want to delete blog id=${id}`) == true) {
      fetch(`http://localhost:8000/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            toast.success("Blog deleted successfully!");
            mutate("http://localhost:8000/blogs");
          } else {
            toast.error("Failed to delete blog!");
          }
        });
    } else {
    }
  };
  return (
    <>
      <div
        className="mt-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>Blogs</h3>
        <Button
          variant="secondary"
          onClick={() => {
            setAction("add");
            setBlog(null);
            setShowModal(true);
          }}
        >
          Add New
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            {/* <th>Content</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.author}</td>
              {/* <td>{blog.content}</td> */}
              <td className="d-flex">
                <Link
                  href={`blogs/${item.id}`}
                  className="mx-1 btn btn-primary"
                >
                  View
                </Link>
                <Button
                  className="mx-1"
                  variant="warning"
                  onClick={() => {
                    setAction("edit");
                    setBlog(item);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  className="mx-1"
                  variant="danger"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddNewBlogModal
        showModal={showModal}
        setShowModal={setShowModal}
        action={action}
        blog={blog}
      />
    </>
  );
};

export default Tables;
