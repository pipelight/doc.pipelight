const isProd = process.env.NODE_ENV === "production";

const site = isProd ? "https://pipelight.dev" : "http://localhost:5000";

export const metaData = {
  title: "Pipelight",
  description:
    "Self hosted automation pipelines! \
    From bash scripts to pipelines!",
  site,
  image: `${site}/images/pipelight.png`
};
