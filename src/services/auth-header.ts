type User = {
  id?: number;
  name: string;
  username: string;
  email: string;
  password?: string;
  password_confirmation?: string
  accessToken?: string;
  exists?:boolean
}

export default function authHeader(multiForm: boolean) {
  const user: User = JSON.parse(localStorage.getItem('user') || '{}');

  if (multiForm) {
    if (user && user.accessToken) {
      return {
        Authorization: 'Bearer ' + user.accessToken,
        'Content-Type': 'multipart/form-data'
      };
    } else {
      return {};
    }
  }
  else {
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  }

}