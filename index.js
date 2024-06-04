const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.ifsc-climbing.org/rankings/index');

  await page.screenshot({ path: 'example.png', fullPage: true });

  const html = await page.content();
  console.log(html);

  const name = await page.evaluate(
    () => document.querySelector('h2').innerText
  );
  const age = await page.evaluate(() => document.querySelector('').innerText);

  console.log(name);

  await browser.close();
}

run();
