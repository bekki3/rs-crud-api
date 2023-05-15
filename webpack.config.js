import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    mode: "production",
    entry: "./app.js",
    target: 'node',
    output: {
        filename: "bundle.cjs",
        path: path.resolve(__dirname, "dist"),
        publicPath: '/',
        clean: true
    },
};
