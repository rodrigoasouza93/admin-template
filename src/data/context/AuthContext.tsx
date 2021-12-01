import route from 'next/router';
import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import firebase from '../../firebase/config';
import { User } from '../../model/User';

interface AuthContextProps {
  user?: User;
  loading?: boolean;
  loginGoogle?: () => Promise<void>;
  login?: (email: string, password: string) => Promise<void>;
  registry?: (email: string, password: string) => Promise<void>;
  logout?: () => Promise<void>;
}

interface AuthProviderProps {
  children: any;
}

const AuthContext = createContext<AuthContextProps>({});

async function normalizedUser(firebaseUser: firebase.User): Promise<User> {
  const token = await firebaseUser.getIdToken();

  return {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName ?? '',
    email: firebaseUser.email ?? '',
    token,
    provider: firebaseUser.providerData[0]?.providerId ?? '',
    imageUrl: firebaseUser.photoURL ?? ''
  }
}

function manageCookie(signed: boolean) {
  if (signed) {
    Cookies.set('admin-template-auth', signed, {
      expires: 7
    })
  } else {
    Cookies.remove('admin-template-auth')
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();

  async function configSession(firebaseUser: any) {
    if (firebaseUser?.email) {
      const user = await normalizedUser(firebaseUser);
      setUser(user);
      manageCookie(true);
      setLoading(false);
      return user.email;
    } else {
      setUser({} as User)
      manageCookie(false);
      setLoading(false);
      return false;
    }
  }

  async function loginGoogle() {
    try {
      setLoading(true);
      const response = await firebase.auth().signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );

      if (response.user?.email) {
        configSession(response.user)
        await route.push('/')
      }
    } finally {
      setLoading(false);
    }
  }

  async function registry(email: string, password: string) {
    try {
      setLoading(true);
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await configSession(response.user)
      route.push('/')
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      await configSession(response.user)
      route.push('/')

    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      await firebase.auth().signOut();
      await configSession(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (Cookies.get('admin-template-auth')) {
      const cancelObserver = firebase.auth().onIdTokenChanged(configSession);
      return () => cancelObserver();
    } else {
      setLoading(false);
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      loginGoogle,
      login,
      registry,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext