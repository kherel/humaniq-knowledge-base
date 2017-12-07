// export const HOST = __DEVELOPMENT__ ? 'http://localhost:8080' : ''

export const DOMAIN_NAME = __DEVELOPMENT__ ? 'localhost:8080' : process.env.DOMEN_URL

export const POSTMAN_ENDPOINT = `http://${DOMAIN_NAME}/postman-api`
