import cron from "node-cron";

cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Running daily blog post job...");
    const response = await fetch("http://localhost:3000/api/generate-blog", {
      method: "GET",
    });

    const data = await response.json();

    console.log("Blog post result:", data);

  } catch (error) {

    console.error("Error running cron job:", error);
  }
});

console.log("Cron job scheduled for daily execution.");
