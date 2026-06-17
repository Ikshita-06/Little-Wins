function Topbar() {
  return (
    <div
      style={{
        paddingBottom: "25px",
      }}
    >
      <h1
        style={{
          fontFamily: "Playfair Display",
          fontSize: "42px",
          fontWeight: "600",
          marginBottom: "10px",
        }}
      >
        Welcome Back 🤍
      </h1>

      <p
        style={{
          fontSize: "18px",
          color: "#7B746D",
        }}
      >
      </p>

      <p
        style={{
          marginTop: "10px",
          color: "#9A9189",
          fontSize: "15px",
        }}
      >
        You completed 0 small wins today 🫶
      </p>
    </div>
  );
}

export default Topbar;