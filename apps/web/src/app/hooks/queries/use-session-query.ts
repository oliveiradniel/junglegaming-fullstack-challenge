import { makeAuthService } from '@/app/factories/make-auth-service';
import { useQuery } from '@tanstack/react-query';

export function useSessionQuery({ enabled }: { enabled: boolean }) {
  const authService = makeAuthService();

  const { data, isLoading } = useQuery({
    enabled,
    queryKey: ['session'],
    queryFn: () => authService.session(),
  });

  return {
    user: data?.user,
    accessToken: data?.accessToken,
    isSessionLoading: isLoading,
  };
}
