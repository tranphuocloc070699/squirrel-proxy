import express from "express";
import cors from "cors";
import {
  createProxyMiddleware,
  Filter,
  Options,
  RequestHandler,
  fixRequestBody,
} from "http-proxy-middleware";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:8080",
    changeOrigin: true,
    pathRewrite: (path, req) => {
      console.log(path + " -" + req.method + " - " + req.body);
  
      return path.replace("/api", "");
    },
    onProxyReq:fixRequestBody
  })
);
app.listen(3000, () => console.log("Example app listening on port 3000!"));
