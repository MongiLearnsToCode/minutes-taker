import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head, useForm } from '@inertiajs/react'; // Import useForm if needed, or stick to Inertia Form helper if preferred. However, original used <Form>.

// The existing implementation used <Form {...store.form()} ...>. 
// We will adapt that to the new layout.

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}) {
    return (
        <>
            <Head title="Log in" />
            <div className="bg-background-main font-display text-text-main antialiased h-screen flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-[440px] animate-in fade-in duration-500 slide-in-from-bottom-5">
                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-black text-white p-3 rounded-2xl shadow-lg shadow-black/20 mb-4 transform hover:scale-105 transition-transform duration-300">
                            <span className="material-symbols-outlined text-[32px] leading-none">graphic_eq</span>
                        </div>
                        <h1 className="text-2xl font-bold text-text-main tracking-tight">AI Notes</h1>
                    </div>

                    <div className="bg-surface-card rounded-3xl shadow-soft p-8 md:p-10 border border-white/60 backdrop-blur-sm">
                        <div className="text-center mb-8">
                            <h2 className="text-xl font-bold text-text-main mb-1">Welcome back</h2>
                            <p className="text-sm text-text-sub font-medium">Please enter your details to sign in.</p>
                        </div>

                        {status && (
                            <div className="mb-4 text-center text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="space-y-5"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="email" className="block text-xs font-bold text-text-main uppercase tracking-wider ml-1">Email Address</Label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <span className="material-symbols-outlined text-text-sub/60 group-focus-within:text-black transition-colors text-[20px]">mail</span>
                                            </div>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                autoComplete="email"
                                                placeholder="name@company.com"
                                                className="block w-full pl-11 pr-4 py-6 bg-background-main/50 border border-transparent focus:bg-white text-text-main placeholder:text-text-sub/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/10 transition-all font-medium sm:text-sm shadow-none"
                                            />
                                        </div>
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between ml-1">
                                            <Label htmlFor="password" className="block text-xs font-bold text-text-main uppercase tracking-wider">Password</Label>
                                            {canResetPassword && (
                                                <TextLink href={request()} className="text-xs font-semibold text-accent-custom hover:text-blue-700 transition-colors">
                                                    Forgot Password?
                                                </TextLink>
                                            )}
                                        </div>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <span className="material-symbols-outlined text-text-sub/60 group-focus-within:text-black transition-colors text-[20px]">lock</span>
                                            </div>
                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                required
                                                autoComplete="current-password"
                                                placeholder="••••••••"
                                                className="block w-full pl-11 pr-4 py-6 bg-background-main/50 border border-transparent focus:bg-white text-text-main placeholder:text-text-sub/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/10 transition-all font-medium sm:text-sm shadow-none"
                                            />
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="flex items-center space-x-3 ml-1">
                                        <Checkbox id="remember" name="remember" className="border-border-subtle text-black focus:ring-black/20" />
                                        <Label htmlFor="remember" className="text-sm font-medium text-text-sub">Remember me</Label>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold py-6 rounded-xl shadow-lg shadow-black/20 hover:shadow-black/30 transition-all transform active:scale-[0.98] mt-2 text-base"
                                        disabled={processing}
                                    >
                                        {processing ? <Spinner className="text-white" /> : (
                                            <>
                                                <span>Log In</span>
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </>
                                        )}
                                    </Button>
                                </>
                            )}
                        </Form>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase tracking-wider">
                                <span className="px-3 bg-surface-card text-text-sub font-semibold">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-2.5 px-4 py-3 bg-white border border-border-subtle rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold text-text-main text-sm shadow-sm hover:shadow group h-12">
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"></path><path d="M12.24 24.0008C15.4766 24.0008 18.2059 22.9382 20.19 21.1039L16.323 18.1056C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.24 24.0008Z" fill="#34A853"></path><path d="M5.50253 14.3003C4.99987 12.8099 4.99987 11.1961 5.50253 9.70575V6.61481H1.5166C-0.18551 10.0056 -0.18551 14.0004 1.5166 17.3912L5.50253 14.3003Z" fill="#FBBC05"></path><path d="M12.24 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.24 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50253 9.70575C6.45064 6.86173 9.10947 4.74966 12.24 4.74966Z" fill="#EA4335"></path></svg>
                                <span>Google</span>
                            </button>
                            <button className="flex items-center justify-center gap-2.5 px-4 py-3 bg-white border border-border-subtle rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold text-text-main text-sm shadow-sm hover:shadow group h-12">
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H10.9092V10.9092H0V0Z" fill="#F25022"></path><path d="M12.0908 0H23V10.9092H12.0908V0Z" fill="#7FBA00"></path><path d="M0 12.0908H10.9092V23H0V12.0908Z" fill="#00A4EF"></path><path d="M12.0908 12.0908H23V23H12.0908V12.0908Z" fill="#FFB900"></path></svg>
                                <span>Microsoft</span>
                            </button>
                        </div>

                        <p className="mt-8 text-center text-sm text-text-sub font-medium">
                            {canRegister && (
                                <>
                                    Don't have an account?{' '}
                                    <TextLink href={register()} className="font-bold text-text-main hover:text-accent-custom transition-colors">
                                        Sign up for free
                                    </TextLink>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
