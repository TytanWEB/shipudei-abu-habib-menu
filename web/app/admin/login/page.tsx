import { login } from "../actions";

export default async function LoginPage(props: PageProps<"/admin/login">) {
  const { error } = await props.searchParams;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-page)",
        color: "var(--color-text)",
        fontFamily: "var(--font-heebo), system-ui, sans-serif",
      }}
    >
      <form
        action={login}
        style={{
          width: "100%",
          maxWidth: 360,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          padding: 24,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Admin login</h1>
        {error && (
          <p style={{ margin: 0, color: "var(--color-price)", fontSize: 14 }}>Wrong password.</p>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoFocus
          required
          style={{
            padding: "12px 14px",
            borderRadius: 10,
            border: "1px solid rgba(246,241,236,.18)",
            background: "rgba(246,241,236,.05)",
            color: "var(--color-text)",
            fontSize: 15,
          }}
        />
        <button
          type="submit"
          className="cta-button"
          style={{
            border: 0,
            borderRadius: 999,
            padding: 14,
            color: "#fff",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          Log in
        </button>
      </form>
    </div>
  );
}
