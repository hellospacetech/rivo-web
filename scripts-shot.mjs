import puppeteer from "puppeteer";

const url = process.argv[2] || "http://localhost:3000/";
const out = process.argv[3] || "/tmp/rivo_shot.png";
const w = parseInt(process.argv[4] || "1440", 10);
const h = parseInt(process.argv[5] || "1100", 10);
const fullPage = process.argv[6] === "full";

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
// Force reduced motion so the useReducedMotion hook returns true
// after hydration and renders all animation start states as visible.
// This makes screenshots deterministic regardless of stagger delays.
await page.emulateMediaFeatures([
  { name: "prefers-reduced-motion", value: "reduce" },
]);
await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
// Brief wait for hydration + repaint
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: out, fullPage });
await browser.close();
console.log("ok:", out);
