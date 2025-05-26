export const MYSQL_CONFIG = {
  mysql_server_host: 'localhost',
  mysql_server_port: 3306,
  mysql_server_username: 'root',
  mysql_server_password: '123456',
  mysql_server_database: 'chapanda-website-database',
  mysql_server_synchronize: true,
};

export const APP_CONFIG = {
  app_port: 8084,
};

export const REDIS_CONFIG = {
  redis_server_host: 'localhost',
  redis_server_port: 6379,
};

export const MINIO_CONFIG = {
  minio_server_host: 'localhost',
  minio_server_port: 9000,
  // minio_server_access: 'pTevMzMunZvIg8ZTH9mX',
  // minio_server_secret: 'J9NMsvSAiVz4pH2IqKLrCdC2LZEzNDG7dyDiRYpo',
  //minio_server_access: 'wzRox2WqHuWH3yRmaPtQ',
  //minio_server_secret: 'QsQLWO3TKANEwimddYBGq42Ac1eOYMX2U4yNJKoa',
  minio_server_access: 'tc50B1jylj6CrzWdbslT',
  minio_server_secret: 'q4KLNrFAQT1KCWWoEVjcK47HNuQ3C08F80Ip4dA7',
  minio_server_ssl: false,
  minio_server_bucket: 'chapanda-pdf',
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
