declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string

    MONGO_URI: string

    TOKEN_SECRET: string
  }
}
