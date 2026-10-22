import type { CSSProperties } from "react";

export const page: CSSProperties = {
  minHeight: "100vh",
  background: "#0d0b0a",
  color: "#f6f1ec",
  fontFamily: "system-ui, sans-serif",
  padding: "20px 16px 80px",
  maxWidth: 720,
  margin: "0 auto",
};

export const headerBar: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 20,
};

export const card: CSSProperties = {
  background: "#1c1817",
  border: "1px solid rgba(246,241,236,.09)",
  borderRadius: 16,
  padding: 16,
  marginBottom: 16,
};

export const sectionTitle: CSSProperties = { margin: 0, fontSize: 17, fontWeight: 700 };

export const formCol: CSSProperties = { display: "flex", flexDirection: "column", gap: 10, marginTop: 10 };

export const fieldsetStyle: CSSProperties = {
  border: "1px solid rgba(246,241,236,.14)",
  borderRadius: 10,
  padding: 10,
};

export const legendStyle: CSSProperties = { fontSize: 12, color: "#a2968e", padding: "0 4px" };

export const inputStyle: CSSProperties = {
  width: "100%",
  padding: "9px 11px",
  borderRadius: 8,
  border: "1px solid rgba(246,241,236,.16)",
  background: "rgba(246,241,236,.05)",
  color: "#f6f1ec",
  fontSize: 14,
  boxSizing: "border-box",
};

export const textareaStyle: CSSProperties = { ...inputStyle, resize: "vertical", minHeight: 60 };

export const primaryButton: CSSProperties = {
  border: 0,
  borderRadius: 999,
  padding: "10px 18px",
  background: "#ec3013",
  color: "#fff",
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  alignSelf: "flex-start",
};

export const ghostButton: CSSProperties = {
  border: "1px solid rgba(246,241,236,.18)",
  borderRadius: 999,
  padding: "8px 14px",
  background: "transparent",
  color: "#f6f1ec",
  fontSize: 13,
  cursor: "pointer",
};

export const iconButton: CSSProperties = {
  border: "1px solid rgba(246,241,236,.18)",
  borderRadius: 8,
  width: 30,
  height: 30,
  background: "transparent",
  color: "#f6f1ec",
  fontSize: 14,
  cursor: "pointer",
};

export const dangerButtonSmall: CSSProperties = {
  border: "1px solid rgba(236,48,19,.4)",
  borderRadius: 8,
  padding: "6px 10px",
  background: "transparent",
  color: "#ff8a70",
  fontSize: 12,
  cursor: "pointer",
};

export const summaryStyle: CSSProperties = {
  cursor: "pointer",
  fontSize: 13,
  color: "#a2968e",
  padding: "6px 0",
};

export const LANG_LABELS: Record<"he" | "en" | "ar", string> = { he: "HE", en: "EN", ar: "AR" };
