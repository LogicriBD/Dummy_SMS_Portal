'use client';
import PrimaryActionButton from '@/components/shared/buttons/PrimaryActionButton';
import { Card, CardContent } from '@/components/ui/card';
import { useJWTAuthContext } from '@/config/auth/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';

const HomePage = () =>
{
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useJWTAuthContext();

  useEffect(() =>
  {
    if (isLoggedIn)
    {
      router.push('/dashboard');
    }
    else
    {
      setLoading(false);
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="w-fit my-12">
        <h1 className="text-4xl font-bold text-white type-welcome"></h1>
      </div>
      <Card className='w-1/2 h-fit flex flex-col justify-center items-center p-4'>
        <CardContent className='flex flex-col justify-center items-center p-4'>
          <div className="w-fit h-fit flex justify-center items-center">
            <div className="m-4 p-4 bg-white rounded-full">
              <Image src="/logo.svg" alt="Logo" className="w-16 h-16" width={1000} height={1000} />
            </div>
            <div className='pb-2'>
              <h1 className="text-2xl font-bold">Dummy SMS Manager</h1>
            </div>
          </div>
          Dummy SMS Manager is a dummy SMS tracker application where you can register different mobile numbers and use our dummy bulk SMS API to send SMS to the respective numbers. This helps in testing the various applications that require an SMS Gateway.
        </CardContent>
        <div className="w-64 my-12">
          <PrimaryActionButton label="Get Started" onClick={() =>
          {
            setLoading(true);
            router.push('/login');
          }} className='w-full'
            isLoading={loading}
            iconRight={<FiArrowRight className="w-6 h-6" />}
          ></PrimaryActionButton>
        </div>
      </Card>

    </div>
  );
}

export default HomePage;