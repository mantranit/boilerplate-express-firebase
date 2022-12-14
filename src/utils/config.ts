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
  projectId = process.env.FIREBASE_PROJECT_ID || "com-mantran-homework";
  clientEmail = process.env.FIREBASE_CLIENT_EMAIL || "firebase-adminsdk-5st1i@com-mantran-homework.iam.gserviceaccount.com";
  privateKey = process.env.FIREBASE_PRIVATE_KEY || "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCYb5+narF+PYep\nJ8pt9+onEjHPJUh8SuGusllm/UynzwPr1YVgellTExUkTM9Vq23ifRDjNCND21qG\nyS56Pl/nzeNweUGwj8ARo5yJ8rnFgMy72moiBiSR6zXeoxg6KsdE5UiczUtGACOV\niZIhiknH6NdEc4P9AYKU9ydhZY6GWHKcjKZiV3+h2UnBAR1PgUzdSXA6A7fn0cSN\nnO8t7qWFliS6plqTZXnSr5TbLFLTWQAjC2kUyh23aXgDppiyypRVS+8Nh69SG8df\ntPcr83lvJbiXoMuPUV3VRJ4gixk8OGXma3iZUpLv6XvgCLKz0n+wfFBt8zXhKmnD\nTO+Ud/kxAgMBAAECggEACsD2LQYBfUfLNB9g4CLpF4ZIsgW98DnKo8vEc5frQlvf\n+ZFTwleDSXFrUIckKdWpD/01dafaFImLIH7dGuXfV2+ui8LcI9/yQ3RMwO0ZFrI0\nT0zUZ6/SAOLMZzdPiFv3+JfpyFkRxj+QgxZEUz4poBMgq50wGqdSfl6UvkHfPQIw\ntRBFAIBoAAyoSBdkCF0WkEFhozp+VdKkXNm5UaEckgmXPRUUDxjUMquzmcMwoBJe\n/aZBIxgyJuweXCmG1PFu9iodei2IcGDGQfEy19VSPpJrBjoMuSIMsOQVWDFMfwxG\ndHuPVcHGWys6odFPIaXSPtpkzdT9wTXYze/ILLRDWQKBgQDPUenDZlM/jJuFD5hy\nNS8PTKrApR7synq0pVPAIKpizPu5Cj0DvkFHbxjKiRt0zt/84yb9YJOrQ8Enehkn\np4xAnGMbb2WK7JnbJ6vKnAM416gDq6mV8R8CMiB1pdDvNWj8drimuKHW0aql+ajb\nhrGtEzr5ddgACh1+WoXiQ/T32QKBgQC8Op1YkCxWtFOkaXHojqfR8lMf3hYwBG5w\naYQ7+2uat8OC4wYLai2Zt8drJaY6s1yRxBcf4AUuXCM43xtPD8+K0VgyePHDK5k9\ne/wzle4hTKCsy4OnQaSlaIenQaADAzP3D4E3uoUcN6DVBnVFmFCbUR6dECJ8nRCP\nM4GMbsvNGQKBgQCnGBk1wQI1xQkPrKss2YqtZRh2nl8XcHaHpHyk7G8HpLj5wbO9\nkZkhjvxHOUxkz9weAaLKMw2xyrEiNTmTCWp0JNeIJDeOSfYTeZzvduDt7nrfQnsz\ne5yHc4lP6S5FriGI4dMfpM3jyyckEN202ZHYshglOYK3PW/aB/HClQ0auQKBgDIp\nSK9GVJqSmcux0gpQogaAFojijXUkaS4J4JR/jxB/MloaGA1IsXhKkplKQj9Ydy3d\nXPBAqgDNyxEn28Y5B20OFvv0YTFK2B6bgP1aUkiLfDIwVhhnlPIDpkr7YSIMY3fO\nqPfp+/kmFfVPMEdorOqHNqpSl24wCS6wYjDDggpZAoGAPE60KsEFovT2ql4fCr1I\nTME4u7MFIzpTxHpzAutGXx6PEZ8gYAy6XQOulvuj9stkvN6GnIECCkO5cKAEyXAH\nCdhsSzR1sQlTJpc7srVhS9n8OCAVqPt3Ly7iQettxhVYVF9Ki+rOa5DliZv4rv5U\ngfpfPF/S36bnzlBWz2vYPiw=\n-----END PRIVATE KEY-----\n";
}

export default new Config();
