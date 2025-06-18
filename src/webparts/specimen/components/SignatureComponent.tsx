import * as React from "react";

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isEmpty: boolean;
}

const SignatureComponent: React.FC<Props> = ({ canvasRef, isEmpty }) => {
  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={200}
      className={`border rounded border-${isEmpty ? "danger" : "primary"}`}
    />
  );
};

export default SignatureComponent;
