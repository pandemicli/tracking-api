declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string

    MONGO_URI: string
    NEW_RELIC_LICENSE_KEY: string

    TOKEN_SECRET: string
  }
}
