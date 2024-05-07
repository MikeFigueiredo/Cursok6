import {browser} from 'k6/experimental/browser'
import {sleep, check} from 'k6'

export const options = {
    scenarios: {
        ui: {
            executor: 'constant-vus',
            vus: 3,
            duration: '10s',
            options: {
                browser: {
                    type: 'chrome'
                }
            }
        }
    },
    thresholds: {
        checks: ['rate == 1.0']
    }
}

export default async function(){
    const page = browser.newPage()

    try {
        await page.goto('http://diesel-test.cargozilla.com.br/login')
        page.locator('input[name=username]').type('calog')
        page.locator('input[name=password]').type('803Q#dC!')

        const submitbutton = page.locator('.w-100')

        await Promise.all([submitbutton.click(), page.waitForNavigation()])

        check(page, {
            header: (p) => p.locator('.header-greetings').textContent == 'Bem vindo, Calog'
        })
    } finally {
        page.close()
    }
}