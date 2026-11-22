// 요정 버전 표시: GitHub 최신 릴리스 태그를 읽어 data-release 요소에 넣는다.
// 가져오기에 실패하면 HTML에 적힌 기본 버전을 그대로 둔다.
(function () {
  const cache = new Map();

  function latestVersion(repo) {
    if (!cache.has(repo)) {
      cache.set(repo, fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
        headers: { Accept: 'application/vnd.github+json' }
      })
        .then((res) => {
          if (!res.ok) throw new Error(String(res.status));
          return res.json();
        })
        .then((data) => (data.tag_name || '').replace(/^v/, '') || null)
        .catch(() => null));
    }
    return cache.get(repo);
  }

  document.querySelectorAll('[data-release]').forEach((el) => {
    latestVersion(el.dataset.release).then((version) => {
      if (version) el.textContent = (el.dataset.prefix || '') + version;
    });
  });
})();
