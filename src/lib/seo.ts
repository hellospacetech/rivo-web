const BASE_URL = "https://hellorivo.com";

export function getAlternates(path: string) {
  const cleanPath = path === "/" ? "" : path;
  return {
    canonical: `${BASE_URL}${cleanPath}`,
    languages: {
      "x-default": `${BASE_URL}${cleanPath}`,
      en: `${BASE_URL}${cleanPath}`,
      tr: `${BASE_URL}/tr${cleanPath}`,
    },
  };
}
