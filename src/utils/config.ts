import dotenv from "dotenv";
dotenv.config();

interface ConfigValues {
  env: string;
  port: number;
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

class Config implements ConfigValues {
  env = process.env.NODE_ENV ?? "development";
  port = parseInt(process.env.PORT || "8000", 10);
  projectId = process.env.FIREBASE_PROJECT_ID || "wata-bet88-471cd";
  clientEmail =
    process.env.FIREBASE_CLIENT_EMAIL ||
    "firebase-adminsdk-hphgd@wata-bet88-471cd.iam.gserviceaccount.com";
  privateKey =
    process.env.FIREBASE_PRIVATE_KEY ||
    "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC1GGMXOxezZDnY\n3qIOXglVqI/zYo1sqM1IDHKSt1ChvcLWxw2uYt/RIbJy7AXeTRG8xFIq9f19wXAx\n43mNDBDr1GdOCF4nwF+mJZVX5gzWmkhFQK03NhPbqPTPZ7x0DxUgiOZdwnxzmb1D\nBvzJ7TNrXwmo2kvRqI+UvVG3nHelS8DrAONjpA5rix6/X7Ih28FWDdKqQGeHWMiS\nghr1oqU+p79tXhSP+vweQjDkHfkYnKE8MWWefBS2rQu937d9AOQzkl2qRf2UNxoh\nkX3+Dy6k+cQIqdia4YI9usN7Tpy8iYvd+8ursMA2HAhYUhRN3Or+MKDvd+GFHX8d\nbAlZx2VzAgMBAAECggEACCJT88DWvAWzciHwhilZIqd97RZZzdijJ9T59yG+wGpl\nQapn2z5brpQPOjQ5wJYWRt6hO4bDCmP8OxwW40FN0pnpbfWC7SbUj6zpJq08RGNi\nUvdTEG4gZDcUOpX+k/lIH1Gm2e1DaRnYXhYGmAyhyPUthOUROhXnz8F/1c8fB1CV\nP8GU5DkIDco47t61SuMVx9baglhrbgEivLIeK4XOO7MIc/YEzfjXtNGwmZmUIwxo\nJQ9F9H3IvlzwwZdcPLBQxwQSYg0y9CRZh/3Hzkdtr5q5n+RRyE+n4Ouyyj1hSNlY\nQlcPn13dISh79r9VtCT1uHQ5zSGXCNlGLhVx26HxyQKBgQD0+VlWahpdRJDse+3c\nRMVrJnjQzxTOABAzC3of5fN2cTzK3qn1LGo4NXjvrFuY11MHUzXLyLVi6QRQvhyQ\ntsWrL8S06D2v8jrZy2chBazJ/Ggl68UjYpPwx9G53KgdFBLQFbcq7psC42kqrU1a\nU2N6kwxTLdDU4HzBmINclPmr7QKBgQC9PwLlYOsoQPTMrb+vZtaPrV4Dotntyn0E\nr2VsWgrssWujRfzYzVF7UmMIZ1B5Eqe9cFL4yzfJ0n+sBgrxUJNlIs40TJswYeTM\nfyhSlkt+vtq8hsPrwEBVM2OKVdhBfHZKDsUcBQz/7/estv5s+LTR5pwXmnRkPO/n\n/FE+FTTq3wKBgQCHKRhofEwlj5IiWFIpiOwfrW9VThwdeJ13fGqaNOZ6QAoZqHa/\nZg0JDD+4hTFYh90wmnGBCTFC7GvMHMhn89/mDooKgmSeshhUWEyDRL1MCG5yFb6E\nQnx7idQmJx++Q3gJxSF1l4aBNnWs7UdTgdTOKVnQfuPMwDs1GW/I4g1LFQKBgQCF\nHFocH0Sopq/Je/jVFh+bJdV390cUZBX1gq1zPg5rGAxe5q6HjDtg4702vvyyfHWx\n4NzrlH0kH0SgKgvuWr+iJo4l6TBLIsA9Or+Q/5gQiYvviVcrbqmRhDjip6kZvsKx\nKpxoLgFL0G1Edd6VpYYCEhP+4iw2CUqxwR8f7OiwvwKBgQDnNDWJdyVztP3ZM+L/\n6oG3dTk5wrqe9GxQlSLdPWKmBs52XMHq0tiKF6K2Zk498ZlqYSKlv/cf/o4ie1AJ\nn4MbieAPz72lgmsZrj4C2nJJM805eaajIQKTN1LDfHBrGRfHpTbfkkPQlmmRx2Q5\nka/Uw0JWDK/BW0m5izwY4iB2Rw==\n-----END PRIVATE KEY-----\n";
}

export default new Config();
