import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Check } from 'lucide-react';

export default function Pricing() {
    const plans = [
        {
            name: 'Starter',
            description: 'Perfect for small teams and individuals.',
            price: '$0',
            duration: '/month',
            features: ['3 Projects', 'AI Applicant Screening', 'AI Recruiter'],
            current: true,
            action: 'Current Plan',
        },
        {
            name: 'Professional',
            description: 'For growing teams requiring more power.',
            price: '$99',
            duration: '/month',
            features: ['Unlimited Projects', 'AI Applicant Screening', 'AI Recruiter', 'Risk-Free Guarantee'],
            current: false,
            action: 'Upgrade',
            href: 'https://sandbox.polar.sh/checkout/123456', // Placeholder Polar Sandbox URL
        },
        {
            name: 'Enterprise',
            description: 'Custom solutions for large organizations.',
            price: 'Custom',
            duration: '',
            features: ['Unlimited Projects', 'AI Applicant Screening', 'Custom Skill Assessments', 'Custom AI Recruiter'],
            current: false,
            action: 'Contact Sales',
        },
    ];

    return (
        <AppLayout breadcrumbs={[{ title: 'Pricing', href: '/pricing' }]}>
            <Head title="Pricing" />
            <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h1>
                    <p className="text-xl text-muted-foreground">Choose the plan that's right for you.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <Card key={plan.name} className={`flex flex-col ${plan.current ? 'border-primary ring-1 ring-primary' : ''}`}>
                            <CardHeader>
                                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="mb-6">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    {plan.duration && <span className="text-muted-foreground">{plan.duration}</span>}
                                </div>
                                <ul className="space-y-3">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <Check className="h-5 w-5 text-green-500" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" variant={plan.current ? 'outline' : 'default'} asChild={!plan.current}>
                                    {plan.current ? (
                                        <button disabled>{plan.action}</button>
                                    ) : (
                                        <a href={plan.href || '#'}>{plan.action}</a>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
