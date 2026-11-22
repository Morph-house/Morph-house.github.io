// 요정 버전 표시와 내려받기 링크: GitHub 최신 릴리스 정보를 한 번만 읽어서 쓴다.
// 가져오기에 실패하면 HTML에 적힌 기본 값(버전, 링크)을 그대로 둔다.
(function () {
  const cache = new Map();

  function latestRelease(repo) {
    if (!cache.has(repo)) {
      cache.set(repo, fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
        headers: { Accept: 'application/vnd.github+json' }
      })
        .then((res) => {
          if (!res.ok) throw new Error(String(res.status));
          return res.json();
        })
        .catch(() => null));
    }
    return cache.get(repo);
  }

  // 버전 표시: data-release="owner/repo", 선택 속성 data-prefix="v"
  document.querySelectorAll('[data-release]').forEach((el) => {
    latestRelease(el.dataset.release).then((data) => {
      const version = data && (data.tag_name || '').replace(/^v/, '');
      if (version) el.textContent = (el.dataset.prefix || '') + version;
    });
  });

  // 내려받기 링크: data-apk="owner/repo" 이면 최신 릴리스의 APK 파일 주소로 바꾼다
  document.querySelectorAll('[data-apk]').forEach((el) => {
    latestRelease(el.dataset.apk).then((data) => {
      const apk = data && (data.assets || []).find((a) => a.name.endsWith('.apk'));
      if (apk) el.href = apk.browser_download_url;
    });
  });
})();
