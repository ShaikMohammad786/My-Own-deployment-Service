import { exec } from "child_process";
import path from "path";
import fs from "fs";

export function runDockerBuild(jobId) {
  return new Promise((resolve, reject) => {
     const WORKSPACE = path.join(process.cwd(), "workspace");

    const sourcePath = path.join(WORKSPACE, "output", jobId);
    const hostDistPath = path.join(WORKSPACE, "dist", jobId);

    fs.mkdirSync(hostDistPath, { recursive: true });

    console.log("building", jobId);
const cmd =
      `docker run --rm ` +
      `-v "${sourcePath}:/app" ` +
      `-v "${hostDistPath}:/out" ` +
      `-w /app ` +
      `node:20-alpine ` +
      `sh -c "node -v && npm install && npm run build && ls -la dist && cp -r dist/* /out"`;


    exec(cmd, { shell: true }, (err, stdout, stderr) => {
      if (err) {
        console.error(stderr);
        return reject(err);
      }
      console.log(stdout);
      resolve();
    });
  });
}
