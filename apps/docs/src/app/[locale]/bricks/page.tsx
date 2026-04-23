import { Route } from 'next';
import { redirect } from 'next/navigation';

export default async function BricksPage() {
  redirect('/bricks/login' as Route);
}
