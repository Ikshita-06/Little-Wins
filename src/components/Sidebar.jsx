function Sidebar() {
  return (
    <div
      style={{
        width: "290px",
        background: "#E8DDD0",
        padding: "35px 25px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          fontFamily: "Playfair Display",
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "8px",
          color: "#3B3836",
        }}
      >
        ✨ Little Wins
      </h1>

      <p
        style={{
          fontSize: "13px",
          color: "#5f5b57",
          marginBottom: "45px",
        }}
      >
        One Percent Better, Every Day.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "22px",
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        <p>🏠 Dashboard</p>

        <p>🫶 Daily Check-In</p>

        <p>🏋 Workouts</p>

        <p>🍽 Nutrition</p>

        <p>📈 Progress</p>
      </div>
    </div>
  );
}

export default Sidebar;