const isProd = process.env.NODE_ENV === "production";

const site = isProd ? "https://pipelight.dev" : "http://localhost:5000";

export const metaData = {
  title: "Pipelight",
  description: "Automation pipelines but easier.",
  site,
  image: `${site}/images/pipelight.png`
};
