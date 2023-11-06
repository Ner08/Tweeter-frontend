type User = {
  id?: number;
  name?: string;
  username?: string;
  email: string;
  password?: string;
  password_confirmation?: string
  accessToken?: string;
  exists?: boolean
}

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