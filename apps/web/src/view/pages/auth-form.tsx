import { useState } from 'react';

import jungleGamingLogo from '../../assets/images/logo.svg';

import { Register } from '@/view/components/register-form';
import { Login } from '@/view/components/login-form';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

export function AuthForm() {
  const [showForm, setShowForm] = useState<'register' | 'login'>('login');

  return (
    <div className="flex h-screen items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center p-4">
      <div className="bg-muted/10 h-full w-full rounded-4xl shadow-2xl transition-all md:p-4 lg:max-w-[80%]">
        <div className="bg-muted/10 h-full w-full rounded-3xl shadow-2xl backdrop-blur-xs transition-all lg:p-4">
          <div className="flex h-full w-full gap-4">
            <Card className="card-background flex h-full w-full flex-col items-center justify-center rounded-4xl px-6 transition-all lg:w-1/2 lg:rounded-2xl">
              <div className={'w-full max-w-lg transition-all'}>
                <CardHeader className="mb-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <img src={jungleGamingLogo} alt="" className="h-10 w-10" />
                    <CardTitle className="text-card-foreground text-lg font-medium transition-all lg:text-xl xl:text-2xl">
                      JungleOps
                    </CardTitle>
                  </div>

                  <CardDescription>
                    <p className="text-card-foreground text-sm transition-all xl:text-lg">
                      {showForm === 'register'
                        ? 'Pronto(a) para entrar na selva?'
                        : 'Bem-vindo(a) à selva das operações!'}
                    </p>
                    <p className="text-xs transition-all xl:text-[1rem]">
                      {showForm === 'register'
                        ? 'Cadastre-se e desbloqueie seu território de operações.'
                        : 'Preparado(a) para dominar suas tarefas?'}
                    </p>
                  </CardDescription>
                </CardHeader>

                {showForm === 'register' ? (
                  <Register onChangeToLogin={() => setShowForm('login')} />
                ) : (
                  <Login onChangeToRegister={() => setShowForm('register')} />
                )}
              </div>
            </Card>

            <Card className="bg-card-foreground/40 hidden h-full w-1/2 items-center justify-center rounded-2xl lg:flex lg:rounded-2xl">
              <p className="text-muted max-w-[300px] text-center text-3xl leading-10 font-bold transition-all xl:max-w-[400px] xl:text-4xl xl:leading-14">
                {showForm === 'register' ? (
                  <span key="register" className="animate-fade-in">
                    Gerencie suas tarefas, acompanhe prazos, envolva sua equipe
                    e mantenha o fluxo de trabalho sob controle com o{' '}
                    <span className="text-primary">JungleOps</span>.
                  </span>
                ) : (
                  <span key="login" className="animate-fade-in">
                    Pronto para continuar avançando? Retorne ao{' '}
                    <span className="text-primary">JungleOps</span> e continue
                    gerenciando tarefas, prazos e equipes com eficiência.
                  </span>
                )}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
