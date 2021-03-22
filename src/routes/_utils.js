import basicConfiguration from '../../config/basic-configuration.yml';

export function makeTitle(title) {
  return `${title} · ${basicConfiguration.blogName}`;
}

export function concatPageUrl(pathName) {
  const url = new URL(basicConfiguration.url);
  url.pathname = pathName;
  return url.href;
}
