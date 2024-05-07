export const options = {
    vus: 1,
    duration: '3s'
}

//3. Execução - Implementação do teste que será realizado
export default function(){
    const res = http.get('http://test.k6.io')
    check(res, {
        'status code é 200': (r) => r.status === 200
    })
}