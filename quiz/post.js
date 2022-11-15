import http from 'k6/http'
import { expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js'
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'

export const options = {
    vus: 10,
    duration: '3s'
}

export default function() {
    const randomID = randomString(2, '0123456789')
    const randomUsername = randomString(5)
    const randomFirstname = randomString(5)
    const randomLastname = randomString(5)
    const randomEmail = randomString(5)+'@mail.com'
    const randomPassword = randomString(6)
    const randomPhone = randomString(12, '0123456789')

    const url = 'https://petstore.swagger.io/v2/user'
    const payload = JSON.stringify({
        id: randomID,
        username: randomUsername,
        firstname: randomFirstname,
        lastname: randomLastname,
        email: randomEmail,
        password: randomPassword,
        phone: randomPhone,
    })
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = http.post(url, payload, params)
    console.log(response.body)
    expect(response.status, 'Respone Status').to.equal(200)
    expect(response).to.have.validJsonBody()
}