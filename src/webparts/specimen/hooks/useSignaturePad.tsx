// hooks/useSignaturePad.ts
import { useRef, useEffect, useState } from "react";
import SignaturePad from "signature_pad";

export const useSignaturePad = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    const pad = new SignaturePad(canvasRef.current, {
      penColor: "blue",
      minWidth: 1,
      maxWidth: 2.5,
    });

    signaturePadRef.current = pad;

    // Listen to drawing complete
    (signaturePadRef.current as any).onEnd = () => {
      setIsEmpty(signaturePadRef.current?.isEmpty() ?? true);
    };

    return () => {
      signaturePadRef.current = null;
    };
  }, [signaturePadRef, canvasRef]);

  const clear = () => {
    signaturePadRef.current?.clear();
    setIsEmpty(true);
  };

  const getDataURL = (): string | null => {
    return signaturePadRef.current?.toDataURL("image/png") ?? null;
  };

  const loadFromDataURL = (url: string) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const ctx = canvasRef.current?.getContext("2d");
      signaturePadRef.current?.clear();
      if (ctx) ctx.drawImage(img, 0, 0);
    };
  };

  return {
    canvasRef,
    isEmpty,
    clear,
    getDataURL,
    loadFromDataURL,
  };
};
