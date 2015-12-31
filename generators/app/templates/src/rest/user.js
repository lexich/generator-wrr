
export default {
  url: "/user.json",
  transformer(d) {
    return d ? d : { name: "" };
  }
};
