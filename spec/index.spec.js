const jest = require('jest');
const puppeteer = require('puppeteer');
const url = 'http://localhost:3001/listing?id=9873027'

let page;
let browser;
const width = 1024;
const height = 512;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto(url, { waitFor: 'networkidle2' });
});

afterAll(() => {
  browser.close();
});


describe('search functionality', () => {
  test('initial title is rendered', async () => {
    const div = '.section-title'
    const title = await page.$eval(div, (el) => el.textContent)
    expect(title).toEqual('The neighborhood')
  })
})