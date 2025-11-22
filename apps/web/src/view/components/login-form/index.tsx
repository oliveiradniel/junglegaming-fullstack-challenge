import { Label } from '@/view/components/ui/label';
import { Input } from '@/view/components/ui/input';
import { CardContent, CardFooter } from '@/view/components/ui/card';
import { Button } from '@/view/components/ui/button';
import { InputPassword } from '@/view/components/ui/input-password';
import { FormGroup } from '@/view/components/ui/form-group';

import { useLoginController } from './use-login-form-controller';

export function Login({
  onChangeToRegister,
}: {
  onChangeToRegister: () => void;
}) {
  const {
    register,
    handleSubmit,
    emailErrorMessage,
    passwordErrorMessage,
    isFormInvalid,
    isLoginLoading,
  } = useLoginController();

  return (
    <>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            disabled={isFormInvalid || isLoginLoading}
            isLoading={isLoginLoading}
            className="w-full"
          >
            Entrar
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
            disabled={isLoginLoading}
            onClick={onChangeToRegister}
            className="p-0"
          >
            Crie uma conta
          </Button>
        </div>
      </CardFooter>
    </>
  );
}
