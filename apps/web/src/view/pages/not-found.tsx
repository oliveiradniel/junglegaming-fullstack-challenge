import { useAuth } from '@/app/hooks/use-auth';

import pageNotFound from '../../assets/images/page-not-found.svg';

import { Separator } from '@radix-ui/react-separator';
import { Button } from '../components/ui/button';
import { Link } from '@tanstack/react-router';

export function NotFound() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="text-muted-foreground text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Página não encontrada
        </span>

        <img src={pageNotFound} alt="" />

        <Separator />

        <div className="flex flex-col items-center gap-4">
          <span className="text-muted-foreground">Tente essas:</span>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Button>
                <Link to="/tasks" replace>
                  Tarefas
                </Link>
              </Button>
              {/* <Button>Minhas tarefas</Button>
              <Button>Histórico de alterações</Button> */}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild>
                <Link to="/login" replace>
                  Fazer login
                </Link>
              </Button>
              <Button asChild>
                <Link to="/register" replace>
                  Criar conta
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
