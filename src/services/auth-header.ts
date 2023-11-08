import type { User } from '@/composables/custom-types';


export default function authHeader(multiForm: boolean) {
  const user: User = JSON.parse(localStorage.getItem('user') || '{"exists":false}');
  const accessToken: string | null = localStorage.getItem('token')
  if (multiForm) {
    if (user.exists && accessToken !== null) {
      return {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      };
    } else {
      return {};
    }
  }
  else {
    if (user.exists && accessToken !== null) {
      return { Authorization: `Bearer ${accessToken}` };
    } else {
      return {};
    }
  }

}