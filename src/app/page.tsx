
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the dashboard page as the main entry point after login/setup
  redirect('/dashboard');
}
