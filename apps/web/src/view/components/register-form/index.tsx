import { Label } from '@/view/components/ui/label';
import { Input } from '@/view/components/ui/input';
import { CardContent, CardFooter } from '@/view/components/ui/card';
import { Button } from '@/view/components/ui/button';
import { InputPassword } from '@/view/components/ui/input-password';
import { FormGroup } from '@/view/components/ui/form-group';

import { useRegisterController } from './use-register-form-controller';

export function Register({ onChangeToLogin }: { onChangeToLogin: () => void }) {
  const {
    register,
    handleSubmit,
    emailErrorMessage,
    usernameErrorMessage,
    passwordErrorMessage,
    isFormInvalid,
    isRegisterLoading,
  } = useRegisterController();

  return (
    <>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormGroup error={emailErrorMessage}>
            <Label htmlFor="email">E-mail</Label>
            <Input
              aria-invalid={!!emailErrorMessage}
              id="email"
              type="email"
              placeholder="lorem@email.com"
              {...register('email')}
              required
            />
          </FormGroup>

          <FormGroup error={usernameErrorMessage}>
            <Label htmlFor="username">Nome de usuário</Label>
            <Input
              aria-invalid={!!usernameErrorMessage}
              id="username"
              placeholder="lorem"
              {...register('username')}
              required
            />
          </FormGroup>

          <FormGroup error={passwordErrorMessage}>
            <Label htmlFor="password">Senha</Label>
            <InputPassword
              aria-invalid={!!passwordErrorMessage}
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              required
            />
          </FormGroup>

          <Button
            type="submit"
            disabled={isFormInvalid || isRegisterLoading}
            isLoading={isRegisterLoading}
            className="w-full"
          >
            Criar conta
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col items-start">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">
            Já tem uma conta?
          </span>

          <Button
            size="sm"
            variant="link"
            disabled={isRegisterLoading}
            onClick={onChangeToLogin}
            className="p-0"
          >
            Entre aqui
          </Button>
        </div>
      </CardFooter>
    </>
  );
}
