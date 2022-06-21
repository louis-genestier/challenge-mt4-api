import 'dotenv/config'

const loadEnvVariable = (name: string): string => {
  const envVariable = process.env[name]

  if (!envVariable) {
    throw new Error(`Env var ${name} is not found`)
  }

  return envVariable
}

export const config = {
  api: {
    port: parseInt(loadEnvVariable('API_PORT')),
  },
  jwt: {
    accessToken: {
      secret: loadEnvVariable('ACCESS_TOKEN_SECRET'),
      exp: loadEnvVariable('ACCESS_TOKEN_EXP'),
    },
    refreshToken: {
      secret: loadEnvVariable('REFRESH_TOKEN_SECRET'),
      exp: loadEnvVariable('REFRESH_TOKEN_EXP'),
    },
  },
}
