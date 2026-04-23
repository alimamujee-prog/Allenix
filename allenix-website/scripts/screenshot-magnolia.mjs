import puppeteer from 'puppeteer'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const htmlPath = path.resolve(__dirname, '../public/magnolia-os-demo.html')
const outDir = path.resolve(__dirname, '../public/magnolia-os-screenshots')

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })

await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 30000 })
// Wait for the bundled app to fully render
await new Promise(r => setTimeout(r, 4000))

// Screenshot 1: initial/default state
await page.screenshot({ path: `${outDir}/screen-1.png`, type: 'png' })
console.log('screen-1 done')

// Helper: click element containing exact text
async function clickText(text) {
  await page.evaluate((t) => {
    const all = document.querySelectorAll('*')
    for (const el of all) {
      if (el.children.length === 0 && el.textContent.trim() === t) {
        el.click()
        return true
      }
    }
    return false
  }, text)
  await new Promise(r => setTimeout(r, 2000))
}

// Screenshot 2: One-Page Strategy view
await clickText('One-Page Strategy')
await page.screenshot({ path: `${outDir}/screen-2.png`, type: 'png' })
console.log('screen-2 done')

// Screenshot 3: Annual Goals view
await clickText('Annual Goals')
await page.screenshot({ path: `${outDir}/screen-3.png`, type: 'png' })
console.log('screen-3 done')

// Screenshot 4: Monthly Metrics view
await clickText('Monthly Metrics')
await page.screenshot({ path: `${outDir}/screen-4.png`, type: 'png' })
console.log('screen-4 done')

await browser.close()
console.log('All screenshots saved.')
