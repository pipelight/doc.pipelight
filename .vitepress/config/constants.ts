const isProd = process.env.NODE_ENV === "production";

const site = isProd ? "https://simp.areskul.com" : "http://localhost:3001";

export const metaData = {
  title: "Simp CICD",
  description: "Even the smallest projects need their CICD tools",
  site,
  image: `${site}/images/simp_light.png`
};
