export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005/api/v1';
}

export function getStaticBaseUrl(): string {
  return process.env.NEXT_PUBLIC_STATIC_URL || 'http://localhost:5005';
}

export const API_BASE_URL = getApiBaseUrl();
export const STATIC_BASE_URL = getStaticBaseUrl();

export function getFullImageUrl(path?: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${getStaticBaseUrl()}${clean}`;
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('agzamov_admin_token');
}

export function setAuthToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('agzamov_admin_token', token);
  }
}

export function removeAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('agzamov_admin_token');
    localStorage.removeItem('agzamov_admin_user');
  }
}

export function getAdminUser(): any | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('agzamov_admin_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setAdminUser(user: any) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('agzamov_admin_user', JSON.stringify(user));
  }
}

export async function adminFetch<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<{ success: boolean; data: T; meta?: any; message?: string }> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  // If not FormData, set Content-Type JSON
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${getApiBaseUrl()}${cleanEndpoint}`;

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (res.status === 401 && typeof window !== 'undefined') {
    removeAuthToken();
    if (!window.location.pathname.includes('/admin/login')) {
      window.location.href = '/admin/login';
    }
  }

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errorMsg = json.error || json.message || `Server xatosi (${res.status})`;
    throw new Error(Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg);
  }

  return json;
}

// Upload file helper
export async function adminUploadFile(file: File, folder = 'team') {
  const formData = new FormData();
  formData.append('file', file);

  const res = await adminFetch(`/uploads?folder=${folder}`, {
    method: 'POST',
    body: formData,
  });

  return res.data; // { url, filename, size, mimetype }
}
