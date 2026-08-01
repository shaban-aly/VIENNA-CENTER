"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ar" dir="rtl">
      <body
        style={{
          background: "#090909",
          color: "#ffffff",
          margin: 0,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "1rem",
          }}
        >
          <p style={{ fontSize: "1.125rem", fontWeight: 700 }}>
            عذراً، حدث خطأ غير متوقع
          </p>
          <p
            style={{
              color: "#b8b8b8",
              fontSize: "0.875rem",
              marginTop: "0.5rem",
            }}
          >
            حاول مرة أخرى، وإن تكررت المشكلة تواصل معنا.
          </p>
          <button
            type="button"
            onClick={unstable_retry}
            style={{
              marginTop: "1.5rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "1rem",
              border: "none",
              background: "#d4a017",
              color: "#090909",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            إعادة المحاولة
          </button>
        </div>
      </body>
    </html>
  );
}
