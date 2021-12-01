import { useState } from "react";
import { AuthInput } from "../components/auth/AuthInput";
import { IconWarning } from "../components/icons";
import useAuth from "../data/hook/useAuth";

export default function Authentication() {
  const { login, registry, loginGoogle } = useAuth();

  const [mode, setMode] = useState<'login' | 'registry'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function submit() {
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await registry(email, password);
      }
    } catch (e: any) {
      showError(e?.message ?? 'Erro inesperado')
    }
  }

  function showError(msg: string, timeInSeconds = 5) {
    setError(msg);
    setTimeout(() => setError(''), timeInSeconds * 1000)
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="hidden md:block md:w-1/2 lg:w-2/3">
        <img
          src="https://source.unsplash.com/random"
          alt="Imagem da tela de autenticação"
          className={`h-screen w-full object-cover`}
        />
      </div>
      <div className={`m-10 w-full md:w-1/2 lg:w-1/3`}>
        <h1 className={`
          text-3xl font-bold mb-5
        `}>
          {mode === 'login' ? 'Entre com a sua conta' : 'Cadastre-se na plataforma'}
        </h1>

        {error !== '' && (
          <div className={`
          flex items-center
        bg-red-400 text-white py-3 px-5 my-2
          border border-red-700 rounded-lg
        `}>
            {IconWarning()}
            <span className="ml-3">{error}</span>
          </div>
        )}

        <AuthInput
          label="Email"
          value={email}
          onChange={setEmail}
          type="email"
          required
        />
        <AuthInput
          label="Senha"
          value={password}
          onChange={setPassword}
          type="password"
          required
        />

        <button
          onClick={submit}
          className={`
          w-full bg-indigo-500 hover:bg-indigo-400
          text-white rounded-lg px-4 py-3 mt-6
        `}
        >
          {mode === 'login' ? 'Entrar' : 'Cadastrar'}
        </button>

        <hr className="my-6 border-gray-300 w-full" />

        <button
          onClick={loginGoogle}
          className={`
          w-full bg-red-500 hover:bg-red-400
          text-white rounded-lg px-4 py-3
        `}
        >
          Entrar com Google
        </button>

        {mode === 'login' ? (
          <p className="mt-8">
            Novo por aqui?
            <a
              onClick={() => setMode('registry')}
              className={`
                text-blue-500 hover:text-blue-700
                font-semibold cursor-pointer
              `}
            > Criar uma conta gratuitamente</a>
          </p>
        ) : (
          <p className="mt-8">
            Já faz parte da nossa comunidade?
            <a
              onClick={() => setMode('login')}
              className={`
                text-blue-500 hover:text-blue-700
                font-semibold cursor-pointer
              `}
            > Entre com as suas credenciais</a>
          </p>
        )}
      </div>
    </div>
  )
}