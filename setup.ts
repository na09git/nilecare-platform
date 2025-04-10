import { exec, ChildProcess } from "child_process";
import open from "open";

console.log("Starting Next.js development server...");

const devServer: ChildProcess = exec("next dev", (error) => {
  if (error) {
    console.error(`Error starting Next.js server: ${error}`);
    return;
  }
});

devServer.stdout?.on("data", (data: string) => {
  console.log(data);
});

devServer.stderr?.on("data", (data: string) => {
  console.error(`Error: ${data}`);
});

// Set a timeout to open the browser after 5 seconds
setTimeout(() => {
  console.log("Opening wizard in your default browser...");
  open("http://localhost:3000/setup");
}, 5000);
