const puppeteer = require('puppeteer')

async function inviteEmail (email) {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	try {
		await page.goto('http://nat3.reconv.pl:5831')

		await page.waitForSelector('text/Sign in')
		await page.type('input[name=username]', 'puppeteer@automation.com')
		await page.type('input[name=password]', 'puppeteer@automation.com')
		await page.click('button[type=submit]')

		const workspaceMenuSelector = 'div[data-testid="t--left-panel"] >>> ::-p-text(Timesheet Resource)'
		await page.waitForSelector(workspaceMenuSelector)
		await page.click(workspaceMenuSelector)

		await page.waitForSelector('div.Timesheet.Resource')
		await page.click('button >>> ::-p-text(Share)')

		await page.type('input[type=email]', email)
		await page.click('div[data-testid="t--invite-role-input"]')
		await page.waitForSelector('div.rc-select-dropdown ::-p-text(App Viewer)')
		await page.click('div.rc-select-dropdown ::-p-text(App Viewer)')

		await page.click('button.t--invite-user-btn')
		await page.waitForSelector('text/The user has been invited successfully')

		await page.screenshot({ path: 'example.png' })
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