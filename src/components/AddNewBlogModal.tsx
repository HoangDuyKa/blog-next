"use client";

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { mutate } from "swr";
interface IProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  action: string;
  blog: IBlog | null;
}

function AddNewBlogModal(props: IProps) {
  const { showModal, setShowModal, action, blog } = props;
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setAuthor(blog.author);
      setContent(blog.content);
    }
    // else {
    //   setTitle("");
    //   setAuthor("");
    //   setContent("");
    // }
  }, [blog]);
  const handleCloseModal = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    setShowModal(false);
  };
  const handleSubmit = () => {
    if (!title) {
      toast.error("Title is required!");
      return;
    }
    if (!author) {
      toast.error("Author is required!");
      return;
    }
    if (!content) {
      toast.error("Content is required!");
      return;
    }
    if (action === "add") {
      fetch("http://localhost:8000/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          content,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            toast.success("Blog added successfully!");
            handleCloseModal();
            mutate("http://localhost:8000/blogs");
          } else {
            toast.error("Failed to add blog!");
          }
        });
    } else {
      fetch(`http://localhost:8000/blogs/${blog?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          content,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            toast.warning("Blog updated successfully!");
            handleCloseModal();
            mutate("http://localhost:8000/blogs");
          } else {
            toast.error("Failed to update blog!");
          }
        });
    }
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="title..."
                value={title ? title : blog?.title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="author..."
                value={author ? author : blog?.author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content ? content : blog?.content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewBlogModal;
