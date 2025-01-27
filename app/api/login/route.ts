import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // TODO: Add your actual authentication logic here
    // This is just a mock response
    if (email === 'test@example.com' && password === 'password') {
      return NextResponse.json({
        token: 'mock_jwt_token',
        user: {
          id: 1,
          email: email,
        }
      });
    }

    return NextResponse.json(
      { message: 'Email ou mot de passe incorrect' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}
