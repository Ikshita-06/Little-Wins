function DashboardCard({
  title,
  value,
  subtitle,
  height = "180px",
}) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "24px",
        padding: "24px",
        minHeight: height,
        boxShadow: "0 4px 15px rgba(0,0,0,0.04)",
      }}
    >
      <h3
        style={{
          fontSize: "14px",
          color: "#8A817A",
          marginBottom: "15px",
          fontWeight: "500",
        }}
      >
        {title}
      </h3>

      <h2
        style={{
          fontFamily: "Playfair Display",
          fontSize: "30px",
          marginBottom: "10px",
        }}
      >
        {value}
      </h2>

      {subtitle && (
        <p
          style={{
            color: "#8A817A",
            lineHeight: "1.5",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default DashboardCard;