//Performance test - Load test

import { check, sleep } from "k6"; //O sleep define quanto tempo demorará para cada VU realizar a requisição
import http from 'k6/http';
import { SharedArray } from "k6/data"; //Consegue ler dados em um json de fonte externa e transformar em um array ou objeto

export const options = {
    stages: [
        { duration: '1s', target: 10 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0 }
    ],
    thresholds: {
        checks: ['rate > 95'],
        http_req_duration: ['p(95) < 200']
    }
}

const data = new SharedArray('Leitura do JSON', function(){ //Invoca o SharedArray
    return JSON.parse(open('dados.json')).crocodilos //Leitura do JSON, transformando em array
})

export default function(){
    const crocodilo = data[Math.floor(Math.random() * data.length)].id

    const BASE_URL = `https://test-api.k6.io/public/crocodiles/${crocodilo}`
    const res = http.get(BASE_URL)

    check(res, {
        'status code 200': (r) => r.status === 200
    })

    sleep(1)
}
