/**
 * 图片工具类
 * 用于验证图片是否可访问，如果不可访问则使用随机图片API
 */

/**
 * 验证图片是否可访问
 * @param {string} url 图片URL
 * @returns {Promise<boolean>} 是否可访问
 */
export const isImageAccessible = async (url) => {
  try {
    // 移除可能存在的引号
    const cleanUrl = url.replace(/[`'"]/g, '');
    
    // 创建一个AbortController，用于在超时时中断请求
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时
    
    const response = await fetch(cleanUrl, {
      method: 'HEAD', // 只获取头信息，不下载图片内容
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) return false;
    
    // 检查Content-Type是否为图片类型
    const contentType = response.headers.get('Content-Type');
    return contentType && contentType.startsWith('image/');
  } catch (error) {
    console.error('图片验证失败:', error);
    return false;
  }
};

/**
 * 获取随机图片URL
 * @returns {Promise<string>} 随机图片URL
 */
export const getRandomImage = async () => {
  try {
    const response = await fetch('https://img.hlds.fun/random');
    if (!response.ok) throw new Error('获取随机图片失败');
    
    const data = await response.json();
    return `https://img.hlds.fun${data.url}`;
  } catch (error) {
    console.error('获取随机图片失败:', error);
    // 返回一个默认图片URL
    return 'https://img.hlds.fun/random';
  }
};

/**
 * 获取有效的图片URL
 * 如果原图片可访问则返回原图片URL，否则返回随机图片URL
 * @param {string} url 原图片URL
 * @returns {Promise<string>} 有效的图片URL
 */
export const getValidImageUrl = async (url) => {
  if (!url) return await getRandomImage();
  
  const isAccessible = await isImageAccessible(url);
  if (isAccessible) return url.replace(/[`'"]/g, '');
  
  return await getRandomImage();
};