
export default {
  url: "fixtures/user.json",
  transformer(d) {
    return d || { name: "" };
  }
};
