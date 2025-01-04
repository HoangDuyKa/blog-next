"use client";

import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
const Facebook = () => {
  const router = useRouter();

  const handleBtn = () => {
    router.push("/");
  };

  return (
    <>
      <div>Facebook</div>
      <Button variant="success" onClick={() => handleBtn()}>
        DuyKa
      </Button>
      <button onClick={() => handleBtn()}>Back Home</button>
    </>
  );
};

export default Facebook;
