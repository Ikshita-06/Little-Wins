import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: "22px",
          marginTop: "15px",
        }}
      >
        <DashboardCard
          title="🌷 Weight Journey"
          value="40kg → 45kg"
          subtitle="5kg remaining until your goal."
          height="230px"
        />

        <DashboardCard
          title="🔥 Workout Streak"
          value="0 Days"
          subtitle="Consistency starts today."
        />

        <DashboardCard
          title="🫧 Hydration"
          value="0 / 5 L"
          subtitle="Small sips count too."
        />

        <DashboardCard
          title="✨ Current Phase"
          value="Phase 1"
          subtitle="Building foundations."
        />
      </div>

      <div
        style={{
          marginTop: "25px",
        }}
      >
        <DashboardCard
          title="🌸 Small Wins Count"
          value="Keep Going"
          subtitle="♡ Progress Over Perfection"
          height="140px"
        />
      </div>
    </>
  );
}

export default Dashboard;