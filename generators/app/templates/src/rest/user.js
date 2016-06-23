
export default {
  url: "/user.json",
  transformer(d) {
    return d || { name: "" };
  }
};
