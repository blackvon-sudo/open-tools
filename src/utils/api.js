import req from "@/utils/axios.js";

const request = (type, url, param = {}) => {
  switch (type) {
    case "GET":
      return req.get(url, param);
    case "POST":
      return req.post(url, param);
    case "FILE":
      return req.fileUpload(url, param);
    default:
      return req.get(url, param);
  }
};

export default {
  request,
};
