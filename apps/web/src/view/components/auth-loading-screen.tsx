import jungleGamingLogo from '../../assets/images/logo.svg';

export function AuthLoadingScreen() {
  return (
    <div className="animate-fade-in flex h-screen w-screen flex-col items-center justify-center gap-4">
      <img src={jungleGamingLogo} alt="" className="h-30 w-30" />

      <p className="text-muted-foreground">Sincronizando dados de acesso...</p>

      <div className="border-primary h-10 w-10 animate-spin rounded-full border-l-3" />
    </div>
  );
}
