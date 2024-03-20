const puppeteer = require('puppeteer')
const { log } = require('./utils')


async function inviteEmail (email) {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	try {
		await page.goto('http://nat3.reconv.pl:5831')
		log('p: visited target web')
		log('p: ')

		await page.waitForSelector('text/Sign in')
		await page.type('input[name=username]', 'puppeteer@automation.com')
		await page.type('input[name=password]', 'puppeteer@automation.com')
		await page.click('button[type=submit]')
		log('p: login success')

		const workspaceMenuSelector = 'div[data-testid="t--left-panel"] >>> ::-p-text(Timesheet Resource)'
		await page.waitForSelector(workspaceMenuSelector)
		await page.click(workspaceMenuSelector)
		log('p: workspace visited')

		await page.waitForSelector('div.Timesheet.Resource')
		await page.click('button >>> ::-p-text(Share)')
		log('p: share button clicked')

		await page.type('input[type=email]', email)
		await page.click('div[data-testid="t--invite-role-input"]')
		await page.waitForSelector('div.rc-select-dropdown ::-p-text(App Viewer)')
		await page.click('div.rc-select-dropdown ::-p-text(App Viewer)')
		log('p: share form filled')

		await page.click('button.t--invite-user-btn')
		await page.waitForSelector('text/The user has been invited successfully')
		log('p: user invited')

		// await page.screenshot({ path: 'example.png' })
	}
	catch (err) {
		console.log(err)
	}
	finally {
		// await new Promise(r => setTimeout(r, 1000))
		await browser.close()
	}
}

module.exports = inviteEmail