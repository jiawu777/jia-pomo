import { t } from 'i18next';

/**
 * 設定網頁標題
 */
function setDocumentTitle(pageTitle?: string) {
  const siteName = t('common:document.title');
  const mode = import.meta.env.DEV ? '[dev] ' : '';

  if (typeof pageTitle === 'undefined') {
    document.title = `${mode}${siteName}`;
    return;
  }

  document.title = `${mode}${pageTitle} | ${siteName}`;
}

export { setDocumentTitle };
