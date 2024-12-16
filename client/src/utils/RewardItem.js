import React from "react";

// Functional component to display a reward item
const RewardItem = ({ reward }) => {
  const getMedalImagePath = (medal) => {
    switch (medal) {
      case "Gold":
        return "/img/gold-medal.png";
        break;
      case "Silver":
        return "/img/silver-medal.png";
        break;
      case "Bronze":
        return "/img/bronze-medal.png";
        break;
    }
  };

  // Return the JSX to render
  return (
    <div className="reward-item">
      <h3>{reward.course_name}</h3>
      <img
        src={getMedalImagePath(reward.medal)}
        alt={`${reward.medal} medal`}
        style={{ maxWidth: "50px", height: "auto" }}
      />
      <p>{new Date(reward.date).toLocaleDateString()}</p>
    </div>
  );
};

export default RewardItem;
