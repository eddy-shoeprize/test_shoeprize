const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

// 로봇 규칙 생성: 함수는 rules 배열을 반환하는데, 여기서는 모든 사용자 에이전트(User-Agent: *)에 대해 특별한 제한이나 지침을 설정하지 않고 있습니다. 즉, 모든 검색 엔진 로봇이 사이트의 모든 부분을 크롤링할 수 있음을 의미합니다.

// 사이트맵 및 호스트 설정: sitemap 및 host 키는 검색 엔진 로봇에게 사이트맵의 위치와 호스트의 기본 URL을 알려줍니다. 여기서 사이트맵은 sitemap.xml 파일을 가리키며, 이 파일은 웹사이트의 모든 페이지를 나열하여 검색 엔진이 사이트를 보다 효과적으로 크롤링하고 인덱싱할 수 있도록 도와줍니다.

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
