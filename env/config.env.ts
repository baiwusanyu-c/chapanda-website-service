import { config } from 'dotenv';
import * as path from 'path';
// TODO: github 配置环境变量（还差MINIO_SERVER_ACCESS， MINIO_SERVER_SECRET）
console.log(path.join(process.cwd(), './env/.env'));
config({ path: path.join(process.cwd(), './env/.env') });

export const MYSQL_CONFIG = {
  mysql_server_host: `${process.env.MYSQL_SERVER_HOST}`,
  mysql_server_port: 3306,
  mysql_server_username: `${process.env.MYSQL_ROOT_USER}`,
  mysql_server_password: `${process.env.MYSQL_ROOT_PASSWORD}`,
  mysql_server_database: 'chapanda-website-database',
  mysql_server_synchronize: true,
};

export const APP_CONFIG = {
  app_port: 8084,
};

export const REDIS_CONFIG = {
  redis_server_host: `${process.env.REDIS_SERVER_HOST}`,
  redis_root_password: `${process.env.REDIS_ROOT_PASSWORD}`,
  redis_server_port: 6379,
};

export const MINIO_CONFIG = {
  minio_server_host: `${process.env.MINIO_SERVER_HOST}`,
  minio_server_port: 9000,
  // minio_server_access: 'pTevMzMunZvIg8ZTH9mX',
  // minio_server_secret: 'J9NMsvSAiVz4pH2IqKLrCdC2LZEzNDG7dyDiRYpo',
  minio_server_access: `${process.env.MINIO_SERVER_ACCESS}`,
  minio_server_secret: `${process.env.MINIO_SERVER_SECRET}`,
  // minio_server_access: 'tc50B1jylj6CrzWdbslT',
  // minio_server_secret: 'q4KLNrFAQT1KCWWoEVjcK47HNuQ3C08F80Ip4dA7',
  minio_server_ssl: false,
  minio_server_bucket: `${process.env.MINIO_SERVER_BUKET}`,
};

export const JWT_CONFIG = {
  jwt_secret: 'chapanda',
};

export const I18N_CONFIG = {
  i18n_fallback: 'zh',
  // 语言文件相当于根目录加载目录
  i18n_path: '/i18n/',
  i18n_query_resolver: ['lang', 'l'],
  i18n_header_resolver: ['x-custom-lang'],
  i18n_cookie_resolver: ['lang'],
};

export const LOG_CONFIG = {
  request: {
    filename: 'request.%DATE%.log',
    dirname: 'log',
    max_size: '1k',
    max_files: '30d',
    audit_file: 'log/.audit.json',
  },
  exception: {
    filename: 'error.exception.%DATE%.log',
    dirname: 'log',
    max_size: '1k',
    max_files: '30d',
    audit_file: 'log/.audit.exception.json',
  },
  rejection: {
    filename: 'error.rejection.%DATE%.log',
    dirname: 'log',
    max_size: '1k',
    max_files: '30d',
    audit_file: 'log/.audit.rejection.json',
  },
};
export const ENV_CONFIG = {
  MYSQL_CONFIG,
  APP_CONFIG,
  REDIS_CONFIG,
  MINIO_CONFIG,
  JWT_CONFIG,
  I18N_CONFIG,
  LOG_CONFIG,
};

export default () => {
  return ENV_CONFIG;
};
