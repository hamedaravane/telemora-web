import AppLayout from '@/components/app-layout';

export default function Home() {
  return (
    <AppLayout>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome to Telemart</h1>
        <p>Your marketplace for buying and selling with TON cryptocurrency</p>
      </div>
    </AppLayout>
  );
}
