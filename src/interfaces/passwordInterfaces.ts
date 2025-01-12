interface passwordInterface {
  id: number;
  category: string;
  username: string | null;
  email: string | null;
  password: string;
  pin: string | null;
  delete_at: string | null;
}

export default passwordInterface;
