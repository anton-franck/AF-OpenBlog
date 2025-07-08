import favicon from "@/extensions/favicon.ico";

export default {
  config: {
    auth: {
      logo: favicon,
    },
    locales: ["de", "en"],
    menu: {
      logo: favicon,
    },
    tutorials: false,
    notifications: { release: false },
  },
};
